import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import {
  CheckOutlined,
  CloseOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Modal,
  Switch,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import TableAction from "@/components/admin/TableAction";
import EditOrder from "@/components/admin/crudform/edit/EditOrder";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { text } from "stream/consumers";
import Link from "next/link";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";

const { Option } = Select;
const statisticalOrder = [
  {
    key: 1,
    amount: 15.752,
    status: "Completed",
  },
  {
    key: 2,
    amount: 89,
    status: "Partial",
  },
  {
    key: 3,
    amount: 5,
    status: "In progress",
  },
  {
    key: 4,
    amount: 0,
    status: "Processing",
  },
  {
    key: 5,
    amount: 0,
    status: "Pending",
  },
  {
    key: 6,
    amount: 0,
    status: "Queue",
  },
  {
    key: 7,
    amount: 531,
    status: "Canceled",
  },
];
const Page = () => {
  const router = useRouter();
  const d = useTranslations("DashboardMenu");
  const t = useTranslations("MyLanguage");
  const columns: any[] = [
    {
      title: "ID Orders",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: t("service"),
      dataIndex: "service",
      key: "service",
      render: (text: any, record: any) => record?.service?.name,
      ellipsis: true,
    },
    {
      title: "ID Viralsmm/Gainsmm",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
    },
    {
      title: "Provider	",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (text: any, record: any) => (
        <Link href={`https://${record?.service?.provider?.name}.com/`}>
          {record?.service?.provider?.name}
        </Link>
      ),
    },
    {
      title: "User	",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: (text: any, record: any) => record?.user?.email,
      ellipsis: true,
    },
    {
      title: t("createat"),
      dataIndex: "create_date",
      key: "create_date",
      align: "center",
      render: (text: string) => (
        <>
          {dayjs(text).format("HH:mm:ss")}
          <br />
          {dayjs(text).format("YYYY-MM-DD")}
        </>
      ),
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
      render: (text: any) => (
        <Link href={text} target="_blank">
          {text}
        </Link>
      ),
      ellipsis: true,
    },
    {
      title: "Charge",
      dataIndex: "charge",
      key: "charge",
      render: (text: string) => parseFloat(text).toFixed(5),
    },
    {
      title: "Actually spent",
      dataIndex: "order_id",
      key: "order_id",
      render: () => 0,
    },
    {
      title: "Start count",
      dataIndex: "start_count",
      key: "start_count",
      render: (text: any) =>
        text != null || text != undefined || text != null ? text : 0,
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: t("remains"),
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        return (
          <div className="flex justify-center">
            <Tag
              color={
                text == "Completed"
                  ? "green"
                  : text == "In progress"
                  ? "yellow"
                  : text == "Canceled"
                  ? "orange"
                  : text == "Processing"
                  ? "cyan"
                  : text == "Partial"
                  ? "blue"
                  : text == "Pending"
                  ? "yellow"
                  : "red"
              }
            >
              {text == undefined ? "Null" : text}
            </Tag>
          </div>
        );
      },
    },
    {
      title: t("action"),
      dataIndex: "id",
      key: "id",
      width: 70,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              openState={openState}
              viewDetail={<>view detail</>}
              // syncFunc={() => {
              //   //synchonized data here
              // }}
              // editForm={
              //   <>
              //     <Form
              //       name="basic"
              //       layout="vertical"
              //       initialValues={{ remember: true }}
              //       // onFinish={onFinish}
              //       // onFinishFailed={onFinishFailed}
              //     >
              //       <EditOrder initialValues={record} />

              //       <Form.Item>
              //         <Button type="primary" htmlType="submit">
              //           Update
              //         </Button>
              //       </Form.Item>
              //     </Form>
              //   </>
              // }
              // deleteForm={
              //   <DeleteForm
              //     onCancel={() => {
              //       setOpenState(!openState);
              //     }}
              //     onDelete={() => {
              //       axiosClient
              //         .delete(`/platform/delete/${text}/?language=en`, {
              //           headers: {
              //             Authorization: `Bearer ${token}`,
              //           },
              //         })
              //         .then(() => {
              //           console.log("ok");

              //           toast.success("success");
              //         })
              //         .catch((err) => {
              //           console.log(err);

              //           toast.error(err.message);
              //         });
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
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const token = getCookie("token");

  const [openState, setOpenState] = useState(false);
  const [status, setStatus] = useState(
    getObjecFormUrlParameters(router)?.status
  );
  const [provider, setProvider] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.provider))
      ? getObjecFormUrlParameters(router)?.provider
      : null
  );
  const [keyword, setIKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", router.asPath],
    queryFn: () =>
      axiosClient.get("/order/list?language=en", {
        params: {
          providerId: provider,
          keyword: keyword,
          status: status,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };

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
  const handleStatus = (value: any) => {
    setStatus(value);
  };
  const handlerProvider = (value: any) => {
    setProvider(value);
  };
  const handleKeyword = (e: any) => {
    setIKeyword(e.target.value);
  };
  useEffect(() => {
    if (
      status == null &&
      provider == null &&
      keyword == null &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/order"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        status: status,
        provider: provider,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  }, [pageIndex, pageSize, keyword, provider, status]);
  return (
    <>
      <Title level={2} className="text-center">
        {d("order")}
      </Title>
      <div className="border shadow-sm rounded-md bg-white">
        <Title className="p-3 border-b bg-gray-100" level={5}>
          All orders
        </Title>
        <ul className="grid sm:grid-cols-2 md:grid-cols-7 gap-3 p-3">
          {statisticalOrder.map((item) => {
            return (
              <>
                <li className="text-center">
                  <Title level={5} className="!mb-0">
                    {item.amount}
                  </Title>
                  <p>{item.status}</p>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <Modal
        title={t("create")}
        open={showModal}
        onCancel={hideModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Services"
            name="services"
            rules={[{ required: true, message: "Please select a service" }]}
          >
            <Select placeholder="Select service">
              <Option value="service1">Service 1</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Provider" name="provider">
            <Input placeholder="Enter provider" />
          </Form.Item>
          <Form.Item
            label="User"
            name="user"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Enter user email" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item label="Charge" name="charge">
              <Input type="number" placeholder="Enter charge" />
            </Form.Item>
            <Form.Item label="Start Count" name="startCount">
              <Input type="number" placeholder="Enter start count" />
            </Form.Item>
          </div>
          <Form.Item label="Actually Spent" name="actuallySpent">
            <Input type="number" placeholder="Enter actually spent" />
          </Form.Item>

          <div className="grid md:grid-cols-2 gap-2">
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select status">
                <Option value="In progress">In progress</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Error">Error</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("create")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex justify-between my-3 mt-10">
        <div style={{ display: "flex", gap: 5 }} id="filter">
          <Input
            defaultValue={keyword}
            placeholder="Search"
            style={{ flex: 1 }}
            allowClear
            onChange={handleKeyword}
          />
          <Select
            defaultValue={status}
            placeholder="Select status"
            allowClear
            style={{ width: 150 }}
            onChange={handleStatus}
            options={statusOptions}
            showSearch
            filterOption={filterOptionByLabel}
          />
          <Select
            defaultValue={provider}
            placeholder="Select provider"
            allowClear
            style={{ width: 150 }}
            className=""
            onChange={handlerProvider}
          >
            <Option value="1">
              <span className="text-sm">Gainsmm</span>
            </Option>
            <Option value="2">
              <span className="text-sm">Viralsmm</span>
            </Option>
          </Select>
        </div>
        <div>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            iconPosition="end"
            onClick={openModal}
            id="create"
          >
            {t("create")}
          </Button>
        </div>
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
        scroll={{ x: 1200 }}
        pagination={{
          total: data?.data.total,
          pageSize: pageSize,
          current: pageIndex,
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
const statusOptions = [
  { value: "In progress", label: "In progress" },
  { value: "Completed", label: "Completed" },
  { value: "Partial", label: "Partial" },
  { value: "Canceled", label: "Canceled" },
  { value: "Processing", label: "Processing" },
  { value: "Pending", label: "Pending" },
];
