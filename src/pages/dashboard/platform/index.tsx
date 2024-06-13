import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/libs/redux/store";
import { useEffect, useState } from "react";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import format from "@/hooks/dayjsformatter";
import { useRouter } from "next/router";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Platform } from "@/@type";
import lodash from "lodash";
import {
  MenuOutlined,
  PlusCircleFilled,
  UploadOutlined,
} from "@ant-design/icons";
import DeleteForm from "@/components/admin/DeleteForm";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import TableAction from "@/components/admin/TableAction";
import EditPlatForm from "@/components/admin/crudform/edit/EditPlatform";
import PlatformDetail from "@/components/admin/crudform/details/PlatformDetail";
import axiosClient from "@/apiClient/axiosClient";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import Title from "antd/es/typography/Title";
const Page = () => {
  const token = getCookie("token");
  const dispatch = useDispatch();
  const router = useRouter();
  const d = useTranslations("DashboardMenu");
  const t = useTranslations("MyLanguage");
  const { platforms, isPending, isError, isSuccess } = useSelector(
    (state: RootState) => state.platformSlice
  );
  const [platformData, setPlatformData] = useState<Platform[]>([]);
  const handleSearch = (e: any) => {
    const results: Platform[] = [];
    platforms.map((i) => {
      if (
        i.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      ) {
        results.push(i);
      }
    });
    setPlatformData(results);
  };
  useEffect(() => {
    if (platformData?.length == 0) {
      dispatch(fetchPlatform());
      setPlatformData(platforms);
    }
  }, [isPending]);

  const columns: any = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: 10,
      render: () => <MenuOutlined className="ms-2 me-2" />,
    },
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
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (text: string) => {
        return (
          <>
            <Image src={text} width={25} alt="" />
          </>
        );
      },
    },
    {
      title: t("createAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <>{format(text, router.locale || "en")}</>,
    },
    {
      width: "15%",
      align: "center",
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              openState={openState}
              // viewDetail={
              //   <>
              //     <PlatformDetail />
              //   </>
              // }
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
                    <EditPlatForm initialValues={record} />

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
                  onCancel={() => {
                    setOpenState(!openState);
                  }}
                />
              }
            />
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

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };
  return (
    <>
      <div className="py-2">
        <Title level={2} className="text-center">
          {d("platform")}
        </Title>
        <Modal
          title="Upload form"
          open={showModal}
          footer={null}
          onCancel={hideModal}
        >
          <div>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Title">
                <Input placeholder="Enter title" />
              </Form.Item>
              <Form.Item label="Upload File" name="file">
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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
          <div id="filter">
            <Input
              placeholder="Search..."
              className="!py-1"
              onChange={handleSearch}
              style={{ width: 200 }}
            />
          </div>

          <Button
            id="create"
            icon={<PlusCircleFilled />}
            type="primary"
            onClick={() => {
              setShowModal(true);
            }}
          >
            {t("create")}
          </Button>
        </div>
      </div>

      <Table
        className="shadow-md border rounded-md"
        dataSource={platformData}
        columns={columns}
        loading={isPending}
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
