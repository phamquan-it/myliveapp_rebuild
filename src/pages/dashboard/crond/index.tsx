import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import { Button, Form, Input, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Services",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Create date",
      dataIndex: "monney",
      key: "monney",
    },
    {
      title: "Start date",
      dataIndex: "fund",
      key: "fund",
    },
    {
      title: "Link",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Charge",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Quantity",
      dataIndex: "action",
      key: "action",
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
        <div>
          <Input
            placeholder="Search..."
            style={{
              width: 200,
            }}
          />
        </div>

        <Table dataSource={dataSource} columns={columns} />
      </DashBoardLayout>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
