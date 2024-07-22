import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import lodash, { forEach } from "lodash";
import { useTranslations } from "next-intl";
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Layout,
  Modal,
  Select,
  Table,
} from "antd";
import { useRouter } from "next/router";
import axiosClient from "@/apiClient/axiosClient";
import { useEffect, useState } from "react";
import { Footer, Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/LocaleSwitcher";
import {
  ClockCircleOutlined,
  MobileOutlined,
  ShareAltOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import OrderForm from "@/components/client/OrderForm";
import PageLayout from "@/components/PageLayout";
import { platform } from "os";

const Home = ({
  locale,
  serviceData,
  platformdata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const p = useTranslations("Placeholder");
  const [serviceDataTable, setserviceDataTable] = useState(serviceData);
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
              className=" hover:!shadow-md hover:!bg-blue-400 !py-0"
              id="buy"
              onClick={() => {
                // setShowModal(true);
                router.push(`/dashboard/order/new-order?id=${text}`);
              }}
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
  const getObjecFormUrlParameters = () => {
    const queryString = router.asPath.split("?").slice(1).join("?");
    // Extract query parameters using URLSearchParams
    const params: any = new URLSearchParams(queryString);
    // Convert URLSearchParams to object
    const queryObject: any = {};
    for (const [key, value] of params) {
      queryObject[key] = value;
    }
    return queryObject;
  };
  const [platformValue, setPlatformValue] = useState(
    getObjecFormUrlParameters()?.platform
  );

  const [current, setCurrent] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters()?.current))
      ? parseInt(getObjecFormUrlParameters()?.current)
      : 1
  );
  //multiple locale

  const d = useTranslations("PageLayout");
  const handleTable = (pagination: any) => {
    setPageSize(pagination.pageSize);
    // setCurrent(pagination.current);
    router.push(router, {
      query: {
        current: pagination.current,
      },
    });
  };
  useEffect(() => {
    const initialQueryObject = {
      ...serviceDataTable,
      ...router.query,
    };
    // alert(getObjecFormUrlParameters()?.platform != "");

    filter(getObjecFormUrlParameters()?.search, platformValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, platformValue]);
  //profess list
  const professList = [
    {
      key: 1,
      icon: <ClockCircleOutlined width={50} />,
      title: d("easy"),
      description: d("easy_desc"),
    },
    {
      key: 2,
      icon: <TeamOutlined />,
      title: d("stable"),
      description: d("stable_desc"),
    },
    {
      key: 3,
      icon: <ShareAltOutlined />,
      title: d("crossplatform"),
      description: d("crossplatform_desc"),
    },
    {
      icon: <MobileOutlined />,
      title: d("support"),
      description: d("support_desc"),
    },
  ];
  const { platformId, txtsearch } = router.query;
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };

  //reload page and push data to url
  const filter = (keyword: string, platformVal: string) => {
    const queries = isNaN(parseInt(platformVal))
      ? {
          search: keyword,
        }
      : {
          search: keyword,
          platform: platformVal,
        };

    router.push(
      router,
      {
        query: {
          ...queries,
          current: isNaN(parseInt(getObjecFormUrlParameters()?.current))
            ? 1
            : parseInt(getObjecFormUrlParameters()?.current),
        },
      },
      {
        locale: locale,
        shallow: false,
        scroll: true,
      }
    );
  };
  const search = lodash.debounce((e: any) => {
    let txtSearch = e.target.value;
    filter(txtSearch, platformValue);
  }, 300);
  //filter follow condition form url
  const DataHasChange = serviceData.filter((item) => {
    const queryString = router.asPath.split("?").slice(1).join("?");
    // Extract query parameters using URLSearchParams
    const params: any = new URLSearchParams(queryString);
    // Convert URLSearchParams to object
    const queryObject: any = {};
    for (const [key, value] of params) {
      queryObject[key] = value;
    }

    const pid = queryObject.platform ?? 2;
    const txtSearch: string = queryObject.search ?? "";

    return (
      (item.platformId == pid &&
        item?.name_vi
          ?.toLocaleLowerCase()
          ?.includes(txtSearch?.toLocaleLowerCase())) ||
      (item.platformId == pid &&
        item?.name
          ?.toLocaleLowerCase()
          ?.includes(txtSearch?.toLocaleLowerCase()))
    );
  });

  console.log(getObjecFormUrlParameters());

  return (
    <main className="bg-gray-50">
      <Modal
        title={t("buy")}
        open={showModal}
        onCancel={hideModal}
        footer={null}
      >
        <Form name="trigger" layout="vertical" autoComplete="off">
          <Alert message="Use 'max' rule, continue type chars to see it" />
          <OrderForm />
          <Form.Item label="" name="">
            <div className="">
              <Button
                type="default"
                onClick={() => {
                  hideModal();
                }}
              >
                Cancel
              </Button>
              <Button type="primary">Continue</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Layout className="">

        <Content style={{ backgroundColor: "white"}}>
          <div className="flex justify-center">
            <div className="mt-10">
              <Title
                className="!font-medium text-center !text-gray-700 !pb-0 !my-2"
                level={3}
              >
                {d("professtitle")}
              </Title>
              <div className="pb-3 pr_decoration my-3 ms-5"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:flex gap-2 justify-center ">
            {professList.map((item, index) => {
              return (
                <div
                  style={{
                    width: 240,
                  }}
                  key={index}
                  className=" px-4 custom_icon bg-gray-100 py-2 rounded-r-3xl border-r-2 border-r-blue-400 
                        "
                >
                  <h1 className="flex gap-1 justify-center text-xl">
                    <span className="">{item.icon}</span>
                    <span
                      className="text-xl"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(9,121,10,1) 0%, rgba(3,62,182,1) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.title}
                    </span>
                  </h1>
                  <p
                    className="text-sm text-center mt-1"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          <Title level={3} className="!text-gray-700 !text-center mt-7">
            Bảng giá dịch vụ
          </Title>
          <div
            style={{ maxWidth: 1200, margin: "auto" }}
            className="flex gap-2 py-3"
          >
            <Input
              placeholder={p("search")}
              style={{
                width: 200,
                fontSize: 12,
              }}
              onChange={search}
              defaultValue={getObjecFormUrlParameters().search || ""}
            />
            <Select
              value={platformValue}
              options={platformdata.map((item: any, index: number) => ({
                ...item,
                key: index,
                value: `${item.id}`,
                label: (
                  <div className="flex items-center gap-2">
                    <Image src={item.icon} width={20} alt="" preview={false} />
                    {item.name}
                  </div>
                ),
              }))}
              showSearch
              style={{ width: 200 }}
              placeholder="Select platform"
              onChange={(value) => {
                console.log(value);

                setPlatformValue(value);
              }}
            />
          </div>
          <div className="container mx-auto" style={{ maxWidth: 1200 }}>
            <Table
              style={{
                width: "100%",
              }}
              className="customIndexTable !text-sm"
              rowClassName={"custom_row_height"}
              onChange={handleTable}
              dataSource={DataHasChange.map((item, index) => {
                var name;
                if (item?.icon == undefined) {
                  name = locale == "en" ? item.name : item?.name_vi;
                } else {
                  name = item.name;
                }
                const convertedItem = { ...item, name: name, key: index };

                return convertedItem;
              })}
              columns={columns}
              pagination={{
                pageSize: pageSize,
                current: isNaN(parseInt(getObjecFormUrlParameters()?.current))
                  ? 1
                  : parseInt(getObjecFormUrlParameters()?.current),
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
                  if (locale == "en") return record.description_en != undefined;
                  else return record.description_vi != undefined;
                },
              }}
            />
          </div>
        </Content>
        <Footer className="!bg-gray-800 !rounded-t-2xl !text-slate-50">
          <div
            className="container mx-auto grid grid-cols-3 gap-4"
            style={{ maxWidth: 1200 }}
          >
            <div>
              <h2 className="text-lg font-semibold">{d("aboutus")}</h2>
              <p>Learn more about our company and mission.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{d("contact")}</h2>
              <p>Email: info@example.com</p>
              <p>Phone: +1 123-456-7890</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Term</h2>
              <p>Email: info@example.com</p>
              <p>Phone: +1 123-456-7890</p>
            </div>
            <div className="col-span-3 text-center">
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </main>
  );
};
export default Home;
Home.Layout = PageLayout;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let serviceData: any[] = [];
  let platformdata: any = [];
  try {
    const dataResponse = await axiosClient.get(
      `/platform/list?language=${locale}`
    );
    dataResponse.data.data.map((item: any) => {
      platformdata.push(item);
    });
    const response = await axiosClient.get(
      "/service/list-public?language=" + locale
    );
    response.data.data.map((item: any) => {
      serviceData.push(item);
      item.serviceCategories.map((serviceCategory: any) => {
        serviceCategory.service.platformId = item.platformId;
        serviceData.push(serviceCategory.service);
      });
    });
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  return {
    props: {
      platformdata,
      locale,
      serviceData,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
    revalidate: 86400,
  };
}
