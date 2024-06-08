import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import EditUser from "@/components/admin/crudform/edit/EditUser";
import format from "@/hooks/dayjsformatter";
import {
  CheckOutlined,
  CloseOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  Input,
  Modal,
  Select,
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
import { Button } from "antd/lib";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
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
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("isactive"),
      dataIndex: "isActive",
      key: "isActive",
      render: (text: number) => (
        <Switch defaultChecked={text == 1 ? true : false} />
      ),
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => format(text, router.locale || "en"),
    },
    {
      title: t("fund"),
      dataIndex: "funds",
      key: "funds",
    },
    {
      title: t("totalmoney"),
      dataIndex: "total_money",
      key: "total_money",
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
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
                  <EditUser formValues={record} />

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
                    .delete(`/user/delete/${text}/?language=en`, {
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
      axiosClient.get("/user/list?language=en", {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });
  console.log(data);
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
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <div className="grid grid-cols-3 gap-2">
              <Form.Item label="Fund Number" name="fundNumber">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Total Money" name="totalMoney">
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Is Active"
                name="isActive"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
            <Form.Item label="Role" name="role">
              <Select>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex justify-between">
          <div>
            <Input placeholder="Search..." />
          </div>
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
          className="rounded-md shadow-md border mt-3"
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
