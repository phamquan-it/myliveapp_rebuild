import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Image, Input, Modal, Select, Table } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { PlusCircleFilled, StarFilled } from "@ant-design/icons";
import { useFormatter, useTranslations } from "next-intl";
import TextArea from "antd/lib/input/TextArea";
import axiosClient from "@/apiClient/axiosClient";
import { getCookie } from "cookies-next";
import TableAction from "@/components/admin/TableAction";
import EditService from "@/components/admin/crudform/edit/EditService";
import CreateService from "@/components/admin/crudform/create/CreateService";
import PlatformSelect from "@/components/admin/PlatformSelect";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/router";
import _ from "lodash";
import PlatformSelectForFilter from "@/components/admin/PlatformSelectForFilter";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import UpdateService from "@/components/admin/crudform/update/UpdateService";
import filterOption from "@/hooks/filterOption";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";
export default function Index() {
  const router = useRouter();
  const token = getCookie("token");

  const [seriveData, setSeriveData] = useState({
    data: [],
    total: 0,
  });

  const t = useTranslations("MyLanguage");
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 50
  );
  const [provider, setProvider] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.provider))
      ? parseInt(getObjecFormUrlParameters(router)?.provider)
      : null
  );
  const [status, setStatus] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.provider))
      ? parseInt(getObjecFormUrlParameters(router)?.provider)
      : null
  );
  const columns: any[] = [
    // {
    //   title: t("entryno"),
    //   dataIndex: "key",
    //   key: "key",
    //   align: "center",
    // },
    {
      title: t("name"),
      dataIndex: "service",
      key: "service",
      render: (text: string, record: any, index: number) => {
        return (
          <div className="flex gap-1 items-center">
            {record.service.icon != undefined ? (
              <Image src={record.service.icon} alt="" width={25} />
            ) : (
              ""
            )}
            {record.service.name}
          </div>
        );
      },
    },
    {
      title: t("rate"),
      dataIndex: "rate",
      key: "rate",
      render: (text: string, record: any) => <>{record.service.rate}</>,
    },
    {
      title: t("minorder"),
      dataIndex: "min",
      key: "min",
      align: "right",

      render: (text: string, record: any) => (
        <>
          {" "}
          {record?.service?.min != undefined
            ? parseFloat(record?.service?.min).toLocaleString(
                router.locale == "en" ? "en-US" : "vi-VN"
              )
            : ""}
        </>
      ),
    },
    {
      title: t("maxorder"),
      dataIndex: "max",
      key: "max",
      render: (text: string, record: any) => {
        console.log(typeof record?.service?.min);

        return (
          <>
            {record?.service?.max != undefined
              ? parseFloat(record?.service?.max).toLocaleString(
                  router.locale == "en" ? "en-US" : "vi-VN"
                )
              : ""}
          </>
        );
      },
      align: "right",
    },
    {
      title: t("level"),
      dataIndex: "level",
      align: "center",
      key: "level",
      render: (tex: string, record: any) => (
        <>
          {record.service.level}
          {record.service.level != undefined ? (
            <StarFilled className="!text-orange-300" />
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      align: "right",
      title: t("initial_rate"),
      dataIndex: "initial_rate",
      key: "initial_rate",
      render: (text: string, record: any) => <>{record.service.initial_rate}</>,
    },
    {
      title: t("rate_config"),
      dataIndex: "rate_config",
      key: "rate_config",
      align: "right",
      render: (text: string, record: any) => <>{record.service.rate_config}</>,
    },
    {
      width: 200,
      title: t("action"),
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            {record.service.icon == undefined ? (
              <div className="flex gap-1">
                <TableAction
                  openState={openState}
                  // viewDetail={<ServiceDetail />}
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
                        <EditService service={record} />

                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            {t("update")}
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
                  //       axiosClient
                  //         .delete(`/service/delete/${text}`)
                  //         .then(() => {
                  //           toast.success("success");
                  //         })
                  //         .catch((err) => {
                  //           toast.error(err.message);
                  //         });

                  //       setOpenState(!openState);
                  //     }}
                  //   />
                  // }
                />
                <Button
                  type="primary"
                  size="small"
                  className="!pb-0 order_btn !text-sm"
                  onClick={() => {
                    router.push(`/dashboard/order/new-order?id=${text}`);
                  }}
                >
                  {t("order")}
                </Button>
              </div>
            ) : (
              ""
            )}
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
  const [platformId, setPlatformId] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.platformId))
      ? parseInt(getObjecFormUrlParameters(router)?.platformId)
      : null
  );
  const [category, setCategory] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.category))
      ? parseInt(getObjecFormUrlParameters(router)?.category)
      : null
  );
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );
  const { data, isFetching, isError } = useQuery({
    queryKey: ["service", router.asPath],
    queryFn: (querykey: any) => {
      console.log(querykey);

      return axiosClient.get(`/service/list?language=${router.locale}`, {
        params: {
          providerId: provider,
          status: status,
          platformId: platformId,
          keyword: keyword,
          categoriesId: category,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
  useEffect(() => {
    const results: any = [];
    let total = 0;
    setSeriveData({ data: [], total });
    data?.data.data.map((item: any) => {
      results.push({ service: { name: item.name, icon: item.icon } });
      item.serviceCategories.map((service: any) => {
        service.platformId = item.platformId;
        if (router.locale == "vi") {
          service.service.description_en = service.service.description_vi;
          if (
            service.service.name_vi != undefined ||
            service.service.name_vi == ""
          )
            service.service.name = service.service.name_vi;
        }
        results.push(service);
      });
      setSeriveData({ data: results, total });
    });
  }, [data, isFetching]);
  const handePlatform = (value: any) => {
    setPlatformId(value);
    setCategory(null);
  };
  const handleSearch = _.debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const categories = useQuery({
    queryKey: ["category", platformId],
    queryFn: () =>
      axiosClient.get("/categories/list?language=en", {
        params: {
          platformId: platformId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  const hanleCategory = (value: any) => {
    setCategory(value);
  };
  const handleProvider = (value: any) => {
    setProvider(value);
  };
  const handleStatus = (value: any) => {
    setStatus(value);
  };
  const p = useTranslations("Placeholder");
  useEffect(() => {
    if (
      keyword == null &&
      platformId == null &&
      category == null &&
      pageIndex == 1 &&
      provider == null &&
      status == null &&
      pageSize == 50 &&
      router.asPath == "/dashboard/service"
    )
      return;
    router.push(router, {
      query: {
        pageSize: pageSize,
        pageIndex: pageIndex,
        keyword: keyword,
        platformId: platformId,
        provider: provider,
        status: status,
        category: category,
      },
    });
  }, [pageIndex, keyword, platformId, provider, status, category, pageSize]);

  return (
    <div className="">
      <Head>
        <title>Service</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
        <>
          <Title level={2} className="text-center">
            {t("service")}
          </Title>
          <Modal
            title={t("create")}
            open={showModal}
            width={1000}
            onCancel={hideModal}
            footer={null}
          >
            <div>
              <Form layout="vertical" onFinish={onFinish}>
                <UpdateService />
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>

          <div className="flex justify-between items-center my-3" id="filter">
            <div className="flex gap-2">
              <div className="">
                <Input
                  defaultValue={keyword}
                  placeholder={p("search")}
                  onChange={handleSearch}
                  className="h-full"
                />
              </div>
              <div className="flex gap-1">
                <PlatformSelectForFilter
                  noLabel={true}
                  onChange={handePlatform}
                  value={platformId}
                />
                <Select
                  showSearch
                  style={{ width: 220 }}
                  value={category}
                  filterOption={filterOption}
                  defaultValue={category}
                  placeholder={p("selectcategory")}
                  onChange={hanleCategory}
                  allowClear
                  options={categories.data?.data?.data?.map((item: any) => ({
                    ...item,
                    label: (
                      <div className="flex items-center gap-1">
                        <Image
                          src={item.icon}
                          alt=""
                          width={25}
                          preview={false}
                        />
                        <span style={{ fontSize: 14 }}>{item.name}</span>
                      </div>
                    ),
                    key: item.name,
                    value: item.id,
                  }))}
                />
                <Select
                  showSearch
                  defaultValue={provider}
                  style={{ width: 170 }}
                  filterOption={filterOption}
                  placeholder={p("selectprovider")}
                  onChange={handleProvider}
                  allowClear
                  options={[
                    { value: 1, label: "Gainsmm", key: "Gainsmm" },
                    { value: 2, label: "Viralsmm", key: "Gainsmm" },
                  ]}
                />
                <Select
                  showSearch
                  style={{ width: 170 }}
                  placeholder={p("select status")}
                  onChange={handleStatus}
                  defaultValue={status}
                  filterOption={filterOptionByLabel}
                  allowClear
                  options={[
                    { value: 1, label: "Active" },
                    { value: 2, label: "Blocked" },
                    { value: 3, label: "Removed" },
                  ]}
                />
              </div>
            </div>
            <div>
              <Button
                id="create"
                type="primary"
                className="!p-0"
                iconPosition="end"
                onClick={openModal}
                icon={<PlusCircleFilled />}
              >
                {t("create")}
              </Button>
            </div>
          </div>

          <Table
            className="border rounded-md shadow-md"
            loading={isFetching}
            dataSource={seriveData?.data.map((item: any, index: number) => ({
              ...item,
              key: index + 1,
            }))}
            columns={columns}
            expandable={{
              expandedRowRender: (record: any) => (
                <TextArea
                  value={record.service.description_en}
                  readOnly
                  autoSize
                />
              ),
              rowExpandable: (record) =>
                record?.service?.description_en !== undefined,
            }}
            pagination={{
              position: ["bottomCenter"],
              defaultCurrent: pageIndex,
              showSizeChanger: true,
              // showQuickJumper: true,
              pageSize: pageSize,
            }}
            onChange={(pagination: any) => {
              setPageSize(pagination.pageSize);
              setPageIndex(pagination.current);
            }}
          />
        </>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
