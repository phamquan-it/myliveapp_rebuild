import { Category } from "@/@type/Category";
import _ from "lodash";
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
import { MenuOutlined, PlusCircleFilled } from "@ant-design/icons";
import TableAction from "@/components/admin/TableAction";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import CategoryDetail from "@/components/admin/crudform/details/CategoryDetail";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import filterOption from "@/hooks/filterOption";
import PlatformSelect from "@/components/admin/PlatformSelect";
import axios from "axios";
import dayjs from "dayjs";
const { Option } = Select;
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { platforms, isPending, isSuccess } = useSelector(
    (state: RootState) => state.platformSlice
  );
  useEffect(() => {
    dispatch(fetchPlatform());
  }, [dispatch]);
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const token = getCookie("token");

  const t = useTranslations("MyLanguage");
  const d = useTranslations("DashboardMenu");
  const columns: any[] = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
      width: "6%",
      align: "center",
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
      width: "13%",
      align: "center",
    },
    {
      title: t("amount"),
      dataIndex: "money",
      key: "money",
      width: "10%",
      align: "center",
    },
    {
      title: t("fund"),
      dataIndex: "fund",
      key: "fund",
      width: "10%",
      align: "right",
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      align: "center",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },

    // {
    //   align: "center",
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
    //               <EditCashFlow value={record} />

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
    //                 .delete(`/cashflow/delete/${text}`)
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  const [openState, setOpenState] = useState(false);
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );
  const [platformValue, setPlatformValue] = useState<number | null>(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.platform))
      ? parseInt(getObjecFormUrlParameters(router)?.platform)
      : null
  );
  const [pageSize, setPageSize] = useState(20);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["category", router.asPath],
    queryFn: () =>
      axios.get(`/api/cashflow`, {
        params: {
          keyword: keyword,
          platformId: platformValue,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
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
    const pageSize = pagination.pageSize || 20;
    setPageSize(pageSize);
  };
  const handleSearch = _.debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const handlePlatform = (value: any) => {
    setPlatformValue(value);
  };
  const p = useTranslations("Placeholder");
  useEffect(() => {
    if (
      keyword == null &&
      platformValue == null &&
      pageIndex == 1 &&
      pageSize == 10 &&
      router.asPath == "/dashboard/cashflow"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        platform: platformValue,
        pageIndex: pageIndex,
      },
    });
  }, [router.asPath, keyword, platformValue, pageIndex]);
  return (
    <>
      <Title level={2} className="text-center !mb-8">
        {d("cashflow")}
      </Title>

      <div className="flex justify-between mt-10">
        <div className="flex justify-start gap-1 " id="filter">
          <Input
            style={{ width: 200 }}
            placeholder={p("search")}
            onChange={handleSearch}
            defaultValue={keyword}
          />
        </div>
      </div>

      <Table
        className="border shadow-md rounded-md mt-4"
        dataSource={data?.data.data.map((item: any, index: number) => ({
          ...item,
          key: pageIndex * pageSize + (index + 1) - pageSize,
        }))}
        scroll={{ x: 700 }}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        pagination={{
          total: data?.data.total,
          current: pageIndex,
          pageSize: pageSize,
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
