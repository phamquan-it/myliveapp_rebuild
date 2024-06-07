import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import { Button, DatePicker, Form, Input, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const dataSource = [
    {
      key: "1",
      account: "pmquan@gmail.com",
      id: "1",
      paymethod: "Qrcode",
      date: "13/11/2000",
      content: "content",
      status: "ok",
      amountusd: "2",
      amountvnd: "2",
    },
  ];

  const columns = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("account"),
      dataIndex: "account",
      key: "account",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("paymethod"),
      dataIndex: "paymethod",
      key: "paymethod",
    },
    {
      title: t("date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("content"),
      dataIndex: "content",
      key: "content",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("amountusd"),
      dataIndex: "amountUSD",
      key: "amountUSD",
    },
    {
      title: t("rate"),
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: t("amountvnd"),
      dataIndex: "amountvnd",
      key: "amountvnd",
    },

    {
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <TableAction
            openState={openState}
            viewDetail={<>view detail</>}
            syncFunc={() => {
              //synchonized data here
            }}
            deleteForm={
              <DeleteForm
                onCancel={() => {
                  setOpenState(!openState);
                }}
                onDelete={() => {
                  setOpenState(!openState);
                }}
              />
            }
          />
        );
      },
    },
  ];
  const [openState, setOpenState] = useState(false);
  return (
    <>
      <DashBoardLayout>
        <div className="flex gap-1 my-3">
          <Input placeholder="Search..." style={{ width: 200 }} />
          <DatePicker placeholder="Start Date" />
          <DatePicker placeholder="End Date" />
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="border rounded-md"
        />
      </DashBoardLayout>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
