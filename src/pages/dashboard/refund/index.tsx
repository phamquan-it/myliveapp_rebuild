import axiosClient from "@/apiClient/axiosClient";
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
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
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
        return record?.order?.service?.name == undefined
          ? record?.order?.service?.name_vi
          : record?.order?.service?.name;
      },
      ellipsis: true,
    },
    {
      title: t("link"),
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => {
        return (
          <Link href={`${record?.order?.link}`} target="_blank">
            {record?.order?.link}
          </Link>
        );
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
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 20
  );
  const [keyword, setKeyword] = useState("");
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", router.asPath],
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
  useEffect(() => {
    if (
      keyword == "" &&
      pageIndex == 1 &&
      pageSize == 20 &&
      router.asPath == "/dashboard/refund"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  }, [keyword, pageSize, pageIndex]);
  return (
    <>
      <Title level={2} className="text-center">
        {d("refund")}
      </Title>
      <div className="flex justify-between my-3">
    
        <div className="flex" id="filter">
          <Input
            className="!py-1"
            placeholder={p("search")}
            style={{ width: 200 }}
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table
        className="border rounded shadow-md"
        dataSource={
         []
        }
        scroll={{ x: 1500 }}
        columns={columns}
        loading={isFetching}
        onChange={handleTableChange}
        pagination={{
          total: data?.data.total,
          pageSize: pageSize,
          current: pageIndex,
          showSizeChanger: true,
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
