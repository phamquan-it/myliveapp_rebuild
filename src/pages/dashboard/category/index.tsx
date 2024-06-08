import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { useQuery } from "@tanstack/react-query";
import lodash, { values } from "lodash";
import {
  Button,
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
import { PlusCircleFilled } from "@ant-design/icons";
import TableAction from "@/components/admin/TableAction";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import CategoryDetail from "@/components/admin/crudform/details/CategoryDetail";
import { toast } from "react-toastify";
const { Option } = Select;
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
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Category) => (
        <div className="flex items-center gap-2">
          <Image width={25} src={record.icon} alt="image" />
          {text}
        </div>
      ),
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      width: "100px",
      key: "createdAt",
      render: (text: string) => format(text, router.locale || "en"),
    },
    {
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <TableAction
            openState={openState}
            viewDetail={<CategoryDetail />}
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
                  <EditCategory value={record} />

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
                    .delete(`/category/delete/${text}`)
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
    platformId: "",
  });

  const { data, isFetching, isError } = useQuery({
    queryKey: ["category", params],
    queryFn: () =>
      axiosClient.get("/categories/list?language=en", {
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
  const [platformValue, setPlatformValue] = useState<number>(1);
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
          <div>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Enter title..," />
              </Form.Item>
              <Form.Item
                label="Platform"
                name="platform"
                rules={[
                  { required: true, message: "Please select a platform" },
                ]}
              >
                <Select placeholder="Select platform">
                  <Option value="web">Web</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("create")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        <div className="flex justify-between">
          <div className="flex justify-start gap-1">
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
            <Select
              showSearch
              options={platforms.map((platform) => ({
                label: (
                  <>
                    <div className="flex items-center gap-1">
                      <Image
                        src={platform.icon}
                        alt=""
                        width={25}
                        preview={false}
                      />
                      <span>{platform.name}</span>
                    </div>
                  </>
                ),
                value: `${platform.id}#${platform.name}`,
              }))}
              style={{ width: 200 }}
              placeholder="Select a platform"
              onChange={(value) => {
                const regex = /(\d+)#/;
                const match = parseInt(value.match(regex));
                setPlatformValue(match || 1);
                setParams({
                  ...params,
                  platformId: match.toString(),
                });
              }}
            ></Select>
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
          className="border shadow-md rounded-md mt-3"
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
