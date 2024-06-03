import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { Button, Image, Layout, Menu, Table } from "antd";
import { useRouter } from "next/router";
import axiosClient from "@/apiClient/axiosClient";
import { useEffect, useState } from "react";
import { Footer, Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/components/general/LocaleSwitcher";
import { StarFilled } from "@ant-design/icons";
import { text } from "stream/consumers";
import { Service } from "@/@type/Service";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";

const Home = ({
  locale,
  serviceData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const t = useTranslations("MyLanguage");

  const [pageSize, setPageSize] = useState(20);
  const router = useRouter();
  const columns: any = [
    {
      title: t("service"),
      dataIndex: "name",
      key: "name",

      render: (text: string, record: any) => (
        <div className="flex gap-1 items-center">
          {record.icon != undefined ? (
            <Image src={record.icon} alt="" width={25} />
          ) : (
            ""
          )}
          {text}
        </div>
      ),
    },
    {
      title: t("rate"),
      dataIndex: "level",
      width: "100px",
      key: "level",
      render: (text: string) => (
        <>
          {text != undefined ? (
            <div className="flex gap-1">
              {text}
              <StarFilled className="!text-orange-400" />
            </div>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: t("minorder"),
      dataIndex: "min",
      key: "min",
      align: "right",
      width: "130px",
    },
    {
      title: t("maxorder"),
      dataIndex: "max",
      key: "max",
      align: "right",
      width: "130px",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "40px",

      render: (text: string | number, record: any) => (
        <>
          {record.icon == undefined ? (
            <Button
              size="small"
              type="primary"
              className="!bg-blue-500 hover:!shadow-md hover:!bg-blue-400"
            >
              {t("buy")}
            </Button>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];
  const d = useTranslations("PageLayout");
  const handleTable = (pagination: any) => {
    setPageSize(pagination.pageSize);
  };
  return (
    <main className="bg-gray-50">
      <Layout className="">
        <div className="container m-auto">
          <Header className="!bg-transparent">
            <div className="flex justify-between items-center">
              <Image
                preview={false}
                width={200}
                height={50}
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
                alt=""
              />
              <div className="flex gap-1">
                <LocaleSwitcher
                  onChange={(value: string) => {
                    router.push(router, "", { locale: value });
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {d("login")}
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  {d("register")}
                </Button>
              </div>
            </div>
          </Header>
          <Layout>
            <Content>
              <Table
                rowClassName={"custom_row_height"}
                onChange={handleTable}
                dataSource={serviceData.map((item, index) => {
                  var name;
                  if (item.icon == undefined) {
                    name = locale == "en" ? item.name : item.name_vi;
                  } else {
                    name = item.name;
                  }

                  return { ...item, name: name, key: index };
                })}
                columns={columns}
                pagination={{
                  pageSize: pageSize,
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      <div className="px-5 py-2">
                        <TextArea
                          className="!bg-transparent"
                          value={
                            locale == "en"
                              ? record.description_en
                              : record.description_vi
                          }
                          autoSize
                          readOnly
                        />
                      </div>
                    </>
                  ),
                  rowExpandable: (record) => {
                    if (locale == "en")
                      return record.description_en != undefined;
                    else return record.description_vi != undefined;
                  },
                }}
              />
            </Content>
          </Layout>
        </div>
        <Footer className="!bg-gray-800">footer</Footer>
      </Layout>
    </main>
  );
};
export default Home;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let serviceData: any[] = [];
  try {
    const response = await axiosClient.get(
      "/service/list-public?language=" + locale
    );
    response.data.data.map((item: any) => {
      serviceData.push(item);
      item.serviceCategories.map((serviceCategory: any) => {
        serviceData.push(serviceCategory.service);
      });
    });
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  return {
    props: {
      locale,
      serviceData,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
