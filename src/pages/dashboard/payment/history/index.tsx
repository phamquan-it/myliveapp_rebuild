import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import HistoryStatitical from "@/components/admin/crudform/statistical/HistoryStatitical";
import { Button, DatePicker, Form, Input, Table } from "antd";
import Title from "antd/es/typography/Title";
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

  const columns: any = [
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
      align: "right",
      title: t("amountvnd"),
      dataIndex: "amountvnd",
      key: "amountvnd",
    },

    {
      witdth: 200,
      align: "center",
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              openState={openState}
              // viewDetail={<>view detail</>}
              // syncFunc={() => {
              //   //synchonized data here
              // }}
              editForm={
                <>
                  <Form
                    layout="vertical"
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              }
              // deleteForm={
              //   <DeleteForm
              //     onCancel={() => {
              //       setOpenState(!openState);
              //     }}
              //     onDelete={() => {
              //       setOpenState(!openState);
              //     }}
              //   />
              // }
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
        <div className="flex gap-1 my-3">
          <Input placeholder="Search..." style={{ width: 200 }} />
          <DatePicker placeholder="Start Date" />
          <DatePicker placeholder="End Date" />
        </div>
        <div className="my-3 gap-3 grid grid-cols-5">
          <HistoryStatitical
            color="rgb(10, 143, 220)"
            monney={0.207}
            info="Current Viral SMM balance"
          />
          <HistoryStatitical
            color="rgb(23, 182, 221)"
            monney={0.207}
            info="Current Viral SMM balance"
          />
          <HistoryStatitical
            color="rgb(73, 189, 101)"
            monney={0.207}
            info="Current Viral SMM balance"
          />
          <HistoryStatitical
            color="rgb(244, 152, 32)"
            monney={0.207}
            info="Current Viral SMM balance"
          />
          <HistoryStatitical
            color="rgb(158, 73, 230)"
            monney={0.207}
            info="Current Viral SMM balance"
          />
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="border rounded-md shadow-md"
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
