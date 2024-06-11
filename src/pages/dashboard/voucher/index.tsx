import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditVoucher from "@/components/admin/crudform/edit/EditVoucher";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("MyLanguage");

  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      code: "JB001",
      minPrice: 100.0,
      discountPercentage: 10,
      createdAt: "2023-01-01",
      startTime: "2023-01-01 10:00:00",
      endTime: "2023-01-01 18:00:00",
      isActive: 1,
      id: "1",
    },
    {
      key: "2",
      name: "Jane Smith",
      code: "JS002",
      minPrice: 150.0,
      discountPercentage: 15,
      createdAt: "2023-02-01",
      startTime: "2023-02-01 10:00:00",
      endTime: "2023-02-01 18:00:00",
      isActive: 0,
      id: "2",
    },
    // Add more data here
  ];

  const columns: any = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("code"),
      dataIndex: "code",
      key: "code",
    },
    {
      title: t("minprice"),
      dataIndex: "minPrice",
      key: "minPrice",
      //render: (text:string) => <span>{text.toFixed(2)}</span>,
    },
    {
      title: t("discountpercentage"),
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: t("createAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      // render: (text) => format(text, router.locale || 'en'),
    },
    {
      title: t("starttime"),
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: t("endtime"),
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: t("status"),
      dataIndex: "isActive",
      key: "isActive",
      render: (text: number) => <Switch defaultChecked={text === 1} />,
    },
    {
      title: t("action"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 200,
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
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <EditVoucher value={record} />

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update
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

  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  return (
    <>
      <DashBoardLayout>
        <Modal
          title={t("create")}
          open={showModal}
          onCancel={hideModal}
          footer={null}
        >
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: "Please enter a code" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Min Price"
              name="minPrice"
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter a valid min price",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Discount Percentage"
              name="discountPercentage"
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter a valid discount percentage",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                { required: true, message: "Please select a start time" },
              ]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[{ required: true, message: "Please select an end time" }]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item label="Status" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex justify-between items-center my-3">
          <Input placeholder="Search..." style={{ width: 200 }} />

          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            iconPosition="end"
            onClick={openModal}
          >
            {t("create")}
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="border rounded-md shadow
          "
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
