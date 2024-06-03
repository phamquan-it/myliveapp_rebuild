import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Table } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { EditOutlined, StarFilled } from "@ant-design/icons";
import { useFormatter, useTranslations } from "next-intl";
import TextArea from "antd/lib/input/TextArea";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { getCookie } from "cookies-next";

export default function Index() {
  const token = getCookie("token")
  const format = useFormatter();
  const [seriveData, setSeriveData] = useState({
    data: [],
    total: 0,
  });
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: (params) =>
      axiosClient.get("/service/list?language=en", {
        params,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: any = [];
      let total = 0;
      data.data.data.map((item: any) => {
        results.push({ service: { name: item.name } });
        item.serviceCategories.map((service: any) => {
          // console.log(service);
          results.push(service);
          setSeriveData({ data: results, total });
        });
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function fetchServiceData(params: any) {
    userMutation.mutate(params);
  }
  useEffect(() => {
    fetchServiceData({
      offset: 0,
      limit: 2,
    });
    console.log(userMutation);
  }, []);
  const t = useTranslations("MyLanguage")
  const [pageIndex, setPageIndex] = useState(1);
  const columns: any[] = [
    {
      title: t('entryno'),
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "service",
      key: "service",
      render: (text: string, record: any) => <>{record.service.name}</>,
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      render: (text: string, record: any) => <>{record.service.rate}</>,
    },
    {
      title: "initial_rate",
      dataIndex: "initial_rate",
      key: "initial_rate",
      render: (text: string, record: any) => <>{record.service.initial_rate}</>,
    },
    {
      title: "min",
      dataIndex: "min",
      key: "min",
      align: "right",
      render: (text: string, record: any) => (
        <>
          {!Number.isNaN(record.service.min)
            ? ""
            : format.number(parseFloat(record.service.min), {
                style: "currency",
                currency: "USD",
              })}
        </>
      ),
    },
    {
      title: "max",
      dataIndex: "max",
      key: "max",
      render: (text: string, record: any) => <>{record.service.max}</>,
      align: "right",
    },
    {
      title: "level",
      dataIndex: "level",
      align: "center",
      key: "level",
      render: (tex: string, record: any) => (
        <>
          {record.service.level}
          {record.service.level != undefined ? (
            <StarFilled className="!text-orange-300" />
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: "rate_config",
      dataIndex: "rate_config",
      key: "rate_config",
      align: "right",
      render: (text: string, record: any) => <>{record.service.rate_config}</>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "Action",
      align: "center",
      render: (text: string, record: any) => (
        <>
          <div className="flex justify-center">
            {record.service.level != undefined ? (
              <></>
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
  ];
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editServideID, setEditServideID] = useState<number>(0);
  return (
    <div className="">
      <Head>
        <title>Service</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <DashBoardLayout>
      <div>
          {userMutation.isPending ? (
            <>Loading...</>
          ) : userMutation.isError ? (
            <>An error occured</>
          ) : (
            <></>
          )}

          <>
            <Modal
              title=""
              open={showPopup}
              footer={null}
              onCancel={() => setShowPopup(false)}
            >
              {editServideID}
             
            </Modal>

            <div className="flex">
              <div className="py-3 w-1/5">
                <Input placeholder="Search..." />
              </div>
              <div className="py-3 w-1/5 ms-3">
                
              </div>
            </div>

            <Table
              dataSource={seriveData?.data.map((item: any, index: number) => ({ ...item, key: pageIndex * 10 + (index + 1) - 10 }))}
              columns={columns}
              expandable={{
                expandedRowRender: (record: any) => (
                  <TextArea
                    value={record.service.description_en}
                    readOnly
                    autoSize
                  />
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              pagination={{
                position: ["bottomCenter"],
                defaultCurrent: 1,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={(pagination: any) => {
                setPageIndex(pagination.current);
              }}
            />
          </>
        </div>
      </DashBoardLayout>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
