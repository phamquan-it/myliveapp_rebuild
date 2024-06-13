import axiosClient from "@/apiClient/axiosClient";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditVoucher from "@/components/admin/crudform/edit/EditVoucher";
import { PlusCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Switch,
  Table,
  TablePaginationConfig,
} from "antd";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const [pageIndex, setPageIndex] = useState(1);
  const token = getCookie("token");
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", pageIndex, pageSize, keyword, router.locale],
    queryFn: () =>
      axiosClient.get("/discount/list?language=" + router.locale, {
        params: {
          keyword: keyword,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

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
      dataIndex: "conditions_apply",
      key: "minPrice",
      //render: (text:string) => <span>{text.toFixed(2)}</span>,
    },
    {
      title: t("discountpercentage"),
      dataIndex: "discount_percentage",
      key: "discountPercentage",
      render: (text: string) => text + "%",
    },
    {
      title: t("createAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: t("starttime"),
      dataIndex: "start_time",
      key: "startTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: t("endtime"),
      dataIndex: "end_time",
      key: "endTime",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: number) => <Switch defaultChecked={text == 1} />,
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

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const handleKeyword = (e: any) => {
    setKeyword(e.target.value);
  };
  const d = useTranslations("DashboardMenu");
  return (
    <>
      <Title className="text-center" level={2}>
        {d("voucher")}
      </Title>
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
            rules={[{ required: true, message: "Please select a start time" }]}
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
        <div id="filter">
          <Input
            placeholder="Search..."
            style={{ width: 200 }}
            onChange={handleKeyword}
          />
        </div>

        <Button
          type="primary"
          id="create"
          icon={<PlusCircleFilled />}
          iconPosition="end"
          onClick={openModal}
        >
          {t("create")}
        </Button>
      </div>
      <Table
        className="border rounded-md shadow-md"
        dataSource={data?.data.data.map((item: any, index: number) => ({
          ...item,
          key: pageIndex * 10 + (index + 1) - 10,
        }))}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        pagination={{
          total: data?.data.total,
        }}
      />
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
