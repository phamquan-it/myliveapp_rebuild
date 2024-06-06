import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Image, Input, Modal, Select, Table } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { PlusCircleFilled, StarFilled } from "@ant-design/icons";
import { useFormatter, useTranslations } from "next-intl";
import TextArea from "antd/lib/input/TextArea";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { getCookie } from "cookies-next";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/EditCategory";
import DeleteForm from "@/components/admin/DeleteForm";
import EditService from "@/components/admin/crudform/EditService";
const { Option } = Select;
export default function Index() {
  const token = getCookie("token");
  const format = useFormatter();
  const [seriveData, setSeriveData] = useState({
    data: [],
    total: 0,
  });
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: (params) =>
      axiosClient.get("/service/list?language=en", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onSuccess: (data) => {
      const results: any = [];
      let total = 0;
      data.data.data.map((item: any) => {
        results.push({ service: { name: item.name, icon: item.icon } });
        item.serviceCategories.map((service: any) => {
          // console.log(service);
          results.push(service);
          setSeriveData({ data: results, total });
        });
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function fetchServiceData(params: any) {
    userMutation.mutate(params);
  }
  useEffect(() => {
    fetchServiceData({
      offset: 0,
      limit: 2,
    });
    console.log(userMutation);
  }, []);
  const t = useTranslations("MyLanguage");
  const [pageIndex, setPageIndex] = useState(1);
  const columns: any[] = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("name"),
      dataIndex: "service",
      key: "service",
      render: (text: string, record: any, index: number) => {
        if (index == 0) console.log(record.service.icon);

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
          {!Number.isNaN(record.service.min)
            ? ""
            : format.number(parseFloat(record.service.min), {
                style: "currency",
                currency: "USD",
              })}
        </>
      ),
    },
    {
      title: t("maxorder"),
      dataIndex: "max",
      key: "max",
      render: (text: string, record: any) => <>{record.service.max}</>,
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
                  <EditService />

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {t("update")}
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
    <div className="">
      <Head>
        <title>Service</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <DashBoardLayout>
        <div>
          <>
            <Modal
              title={t("create")}
              open={showModal}
              onCancel={hideModal}
              footer={null}
            >
              <div>
                <Form layout="vertical" onFinish={onFinish}>
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
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                      { required: true, message: "Please select a category" },
                    ]}
                  >
                    <Select placeholder="Select category">
                      <Option value="development">Development</Option>
                      <Option value="design">Design</Option>
                      <Option value="marketing">Marketing</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                  <Form.Item
                    label="Rate"
                    name="rate"
                    rules={[{ required: true, message: "Please enter a rate" }]}
                  >
                    <Input placeholder="Enter rate" />
                  </Form.Item>
                  <Form.Item
                    label="Min"
                    name="min"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a minimum value",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Enter min" />
                  </Form.Item>
                  <Form.Item
                    label="Max"
                    name="max"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a maximum value",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Enter max" />
                  </Form.Item>
                  <Form.Item
                    label="Level"
                    name="level"
                    rules={[
                      { required: true, message: "Please select a level" },
                    ]}
                  >
                    <Select placeholder="Select level">
                      <Option value="beginner">Beginner</Option>
                      <Option value="intermediate">Intermediate</Option>
                      <Option value="advanced">Advanced</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="First Rate Config" name="first_rate_config">
                    <Input
                      type="number"
                      placeholder="Enter first rate config"
                    />
                  </Form.Item>
                  <Form.Item label="Rate Config" name="rate_config">
                    <Input type="number" placeholder="Enter rate config" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>

            <div className="flex justify-between">
              <div className="flex">
                <div className="py-3">
                  <Input placeholder="Search..." />
                </div>
                <div className="py-3 ms-3">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a platform"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                  >
                    <Select.Option value="jack">Jack</Select.Option>
                    <Select.Option value="lucy">Lucy</Select.Option>
                    <Select.Option value="tom">Tom</Select.Option>
                  </Select>
                </div>
              </div>
              <div>
                <Button
                  type="primary"
                  className="p-0"
                  iconPosition="end"
                  onClick={openModal}
                  icon={<PlusCircleFilled />}
                >
                  {t("create")}
                </Button>
              </div>
            </div>

            <Table
              className="border rounded-md"
              loading={userMutation.isPending}
              dataSource={seriveData?.data.map((item: any, index: number) => ({
                ...item,
                key: pageIndex * 10 + (index + 1) - 10,
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
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              pagination={{
                position: ["bottomCenter"],
                defaultCurrent: 1,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={(pagination: any) => {
                setPageIndex(pagination.current);
              }}
            />
          </>
        </div>
      </DashBoardLayout>
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
