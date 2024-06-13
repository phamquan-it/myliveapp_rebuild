import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import UpdateRefund from "@/components/admin/crudform/edit/EditRefund";
import format from "@/hooks/dayjsformatter";
import { PlusCircleFilled } from "@ant-design/icons";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Select,
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
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
const { Option } = Select;

const Page = () => {
  const token = getCookie("token");
  const router = useRouter();
  const t = useTranslations("MyLanguage");
  const columns: any[] = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
      width: 80,
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: t("email"),
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => {
        console.log(record.order);

        return record?.order?.user?.email;
      },
      ellipsis: true,
    },
    {
      width: 160,
      title: t("date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string, record: any) =>
        dayjs(record.createdAt).format("DD/MM/YYYY HH:mm:ss"), //
    },
    {
      title: t("service"),
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => {
        return record?.order?.service?.name;
      },
      ellipsis: true,
    },
    {
      title: t("link"),
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => {
        return <>{record?.order?.link}</>;
      },
      ellipsis: true,
    },
    {
      title: t("status"),
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (text: string, record: any) => (
        <Tag
          color={record?.order?.status == "Canceled" ? "volcano" : "purple"}
          className="my-1"
        >
          {record?.order?.status}
        </Tag>
      ),
    },
    {
      width: 130,
      align: "right",
      title: t("amountPaid"),
      dataIndex: "charge_original",
      key: "charge_original",
      render: (text: string) => {
        const number = parseFloat(text);
        return parseFloat(number.toFixed(5));
      },
    },
    {
      width: 130,
      align: "right",
      title: t("refundAmount"),
      dataIndex: "refund",
      key: "refund",
      render: (text: string) => {
        const number = parseFloat(text);
        return parseFloat(number.toFixed(5));
      },
    },
    // {
    //   title: t("action"),
    //   dataIndex: "id",
    //   key: "id",
    //   width: 200,
    //   render: (text: string, record: any) => {
    //     return (
    //       <TableAction
    //         openState={openState}
    //         viewDetail={<>view detail</>}
    //         syncFunc={() => {
    //           //synchonized data here
    //         }}
    //         editForm={
    //           <>
    //             <Form
    //               name="basic"
    //               layout="vertical"
    //               initialValues={{ remember: true }}
    //               // onFinish={onFinish}
    //               // onFinishFailed={onFinishFailed}
    //             >
    //               <UpdateRefund />

    //               <Form.Item>
    //                 <Button type="primary" htmlType="submit">
    //                   Update
    //                 </Button>
    //               </Form.Item>
    //             </Form>
    //           </>
    //         }
    //         deleteForm={
    //           <DeleteForm
    //             onCancel={() => {
    //               setOpenState(!openState);
    //             }}
    //             onDelete={() => {
    //               axiosClient
    //                 .delete(`/refund/delete/${text}`)
    //                 .then(() => {
    //                   toast.success("success");
    //                 })
    //                 .catch((err) => {
    //                   toast.error(err.message);
    //                 });
    //               setOpenState(!openState);
    //             }}
    //           />
    //         }
    //       />
    //     );
    //   },
    // },
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

  //handle filter
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", router.locale, pageSize, pageIndex, keyword],
    queryFn: () =>
      axiosClient.get(`/refund-money/list?language=${router.locale}`, {
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
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const handleSearch = _.debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const d = useTranslations("DashboardMenu");
  const p = useTranslations("Placeholder");
  return (
    <>
      <Title level={2} className="text-center">
        {d("refund")}
      </Title>
      <div className="flex justify-between my-3">
        <Modal
          title={t("create")}
          open={showModal}
          onCancel={hideModal}
          footer={null}
        >
          <div>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter an email" }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item
                label="Service"
                name="service"
                rules={[{ required: true, message: "Please select a service" }]}
              >
                <Select placeholder="Select service">
                  <Option value="service1">Service 1</Option>
                  <Option value="service2">Service 2</Option>
                  <Option value="service3">Service 3</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item
                label="Amount Paid"
                name="amountPaid"
                rules={[
                  { required: true, message: "Please enter amount paid" },
                ]}
              >
                <Input type="number" placeholder="Enter amount paid" />
              </Form.Item>
              <Form.Item
                label="Refund Amount"
                name="refundAmount"
                rules={[
                  { required: true, message: "Please enter refund amount" },
                ]}
              >
                <Input type="number" placeholder="Enter refund amount" />
              </Form.Item>
              <Form.Item label="Create At" name="createAt">
                <DatePicker />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("create")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        <div className="flex" id="filter">
          <Input
            className="!py-1"
            placeholder={p("search")}
            style={{ width: 200 }}
            onChange={handleSearch}
          />
        </div>
        <Button
          id="create"
          type="primary"
          icon={<PlusCircleFilled />}
          iconPosition="end"
          onClick={openModal}
        >
          {t("create")}
        </Button>
      </div>
      <Table
        className="border rounded shadow-md"
        dataSource={
          data?.data?.data?.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * pageSize + (index + 1) - pageSize,
          })) ?? []
        }
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
