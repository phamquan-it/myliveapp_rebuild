import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { useQuery } from "@tanstack/react-query";
import lodash, { values } from "lodash";
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
import { Platform } from "@/@type";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import { RootState } from "@/libs/redux/store";
import axios from "axios";
import { PlusCircleFilled } from "@ant-design/icons";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import TableAction from "@/components/admin/TableAction";
import EditCashFlow from "@/components/admin/crudform/edit/EditCashFlow";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();
  const { platforms, isPending, isSuccess } = useSelector(
    (state: RootState) => state.platformSlice
  );
  useEffect(() => {
    dispatch(fetchPlatform());
  }, [dispatch]);
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
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: t("amount"),
      dataIndex: "money",
      key: "money",
    },
    {
      title: t("fund"),
      dataIndex: "fund",
      key: "fund",
    },
    {
      title: t("createat"),
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
            editForm={
              <>
                <Form
                  name="basic"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                >
                  <EditCashFlow value={record} />

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
                    .delete(`/cashflow/delete/${text}`)
                    .then(() => {
                      toast.success("success");
                    })
                    .catch((err) => {
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
  const [keyword, setKeyword] = useState("");
  const [params, setParams] = useState({
    keyword: keyword,
    offset: 0,
    limit: 10,
  });

  // const { data, isFetching, isError } = useQuery({
  //   queryKey: ["orders", params],
  //   queryFn: () =>
  //     axios.get("http://localhost:3000/api/cashflow", {
  //       params: params,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   placeholderData: (previousData) => previousData,
  // });
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
  const data = [
    {
      id: 1,
      email: "john@example.com",
      action: "deposit",
      money: 100,
      fund: "A",
    },
    {
      id: 2,
      email: "jane@example.com",
      action: "withdrawal",
      money: 200,
      fund: "B",
    },
    {
      id: 3,
      email: "sam@example.com",
      action: "transfer",
      money: 300,
      fund: "C",
    },
    {
      id: 4,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 5,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 6,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    {
      id: 4,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 5,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 6,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    {
      id: 7,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 8,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 9,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    // Add more data as needed
  ];
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
        <div className="flex justify-between gap-1 items-center">
          <div>
            <Input
              style={{ width: 200 }}
              placeholder="Search..."
              onChange={(e) => {
                setKeyword(e.target.value);
                const search = lodash.debounce(() => {
                  setParams({
                    ...params,
                    keyword,
                  });
                }, 300);
                search();
              }}
            />
            <Modal
              title={t("create")}
              open={showModal}
              onCancel={hideModal}
              footer={null}
            >
              <div>
                <h1>My Form</h1>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter an email" },
                    ]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <Form.Item
                    label="Action"
                    name="action"
                    rules={[
                      { required: true, message: "Please enter an action" },
                    ]}
                  >
                    <Input placeholder="Enter action" />
                  </Form.Item>
                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                      { required: true, message: "Please enter an amount" },
                    ]}
                  >
                    <Input type="number" placeholder="Enter amount" />
                  </Form.Item>
                  <Form.Item
                    label="Fund"
                    name="fund"
                    rules={[{ required: true, message: "Please enter a fund" }]}
                  >
                    <Input type="number" placeholder="Enter fund" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
          <div>
            <Button
              type="primary"
              iconPosition="end"
              onClick={openModal}
              icon={<PlusCircleFilled />}
            >
              {t("create")}
            </Button>
          </div>
        </div>

        <Table
          dataSource={data.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * 10 + (index + 1) - 10,
          }))}
          columns={columns}
          //   loading={isFetching}
          onChange={handleTableChange}
          pagination={{
            total: 20,
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
