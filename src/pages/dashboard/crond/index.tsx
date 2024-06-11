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
  const d = useTranslations("DashboardMenu");
  const fakeData = [
    {
      key: 1,
      services: "Service A",
      user: "User X",
      createat: "2023-05-15",
      startdate: "2023-05-20",
      link: "https://example.com/serviceA",
      charge: 100,
      quantity: 50,
    },
    {
      key: 2,
      services: "Service B",
      user: "User Y",
      createat: "2023-05-16",
      startdate: "2023-05-22",
      link: "https://example.com/serviceB",
      charge: 150,
      quantity: 30,
    },
    {
      key: 3,
      services: "Service C",
      user: "User Z",
      createat: "2023-05-18",
      startdate: "2023-05-25",
      link: "https://example.com/serviceC",
      charge: 80,
      quantity: 20,
    },
    // Add more data objects as needed
  ];

  const columns: any = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: d("services"),
      dataIndex: "services",
      key: "services",
    },
    {
      title: d("user"),
      dataIndex: "user",
      key: "user",
    },
    {
      title: t("createat"),
      dataIndex: "createat",
      key: "createat",
    },
    {
      title: t("startdate"),
      dataIndex: "startdate",
      key: "startdate",
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
    },
    {
      title: t("charge"),
      dataIndex: "charge",
      key: "charge",
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("action"),
      dataIndex: "id",
      key: "id",
      width: 200,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
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
          </div>
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

        <Table
          dataSource={fakeData}
          columns={columns}
          className="border shadow-md rounded-md mt-3"
        />
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
