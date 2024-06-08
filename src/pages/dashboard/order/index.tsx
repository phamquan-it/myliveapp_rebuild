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
import { useState } from "react";
import { Input, Select } from "antd";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import TableAction from "@/components/admin/TableAction";
import EditOrder from "@/components/admin/crudform/edit/EditOrder";
import { toast } from "react-toastify";

const { Option } = Select;

const Page = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const token = getCookie("token");
  const router = useRouter();
  const t = useTranslations("MyLanguage");
  const columns: any[] = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text != "Canceled"}
            />
          </>
        );
      },
    },
    {
      title: t("remains"),
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: "OrderID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "ServiceId",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: t("createat"),
      dataIndex: "create_date",
      key: "create_date",
      render: (text: string) => <>{format(text, router.locale || "en")}</>,
    },
    {
      title: t("updateat"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => <>{format(text, router.locale || "en")}</>,
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
            editForm={
              <>
                <Form
                  name="basic"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                >
                  <EditOrder initialValues={record} />

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </>
            }
            deleteForm={
              <DeleteForm
                onCancel={() => {
                  setOpenState(!openState);
                }}
                onDelete={() => {
                  axiosClient
                    .delete(`/platform/delete/${text}/?language=en`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then(() => {
                      console.log("ok");

                      toast.success("success");
                    })
                    .catch((err) => {
                      console.log(err);

                      toast.error(err.message);
                    });
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

  const [params, setParams] = useState({ offset: 0, limit: 10 });

  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", params],
    queryFn: () =>
      axiosClient.get("/order/list?language=en", {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AnyObject> | SorterResult<AnyObject>[],
    extra: TableCurrentDataSource<AnyObject>
  ) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    const offset = (current - 1) * pageSize;
    const limit = current * pageSize;
    setParams({ ...params, limit: limit, offset: offset });
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
  return (
    <>
      <DashBoardLayout>
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
        <div className="flex justify-between my-3">
          <div style={{ display: "flex", gap: "1rem" }}>
            <Input placeholder="Search" style={{ flex: 1 }} />
            <Select placeholder="Select status" style={{ width: 150 }}>
              <Option value="In progress">In progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Error">Error</Option>
            </Select>
            <Select placeholder="Select provider" style={{ width: 150 }}>
              <Option value="provider1">Provider 1</Option>
              <Option value="provider2">Provider 2</Option>
              <Option value="provider3">Provider 3</Option>
            </Select>
          </div>
          <div>
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              iconPosition="end"
              onClick={openModal}
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
          pagination={{
            total: data?.data.total,
          }}
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
