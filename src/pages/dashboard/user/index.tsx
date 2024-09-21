import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
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
import Title from "antd/es/typography/Title";
import { Button } from "antd/lib";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import { error } from "console";
import { useUserData } from "@/components/live-streams/CreateStreamByAdmin";
const { Option } = Select;
const Page = () => {
    const token = getCookie("token");
    const router = useRouter();
    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const columns: any[] = [
        {
            align: "center",
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            // render: (text: string) => <div className="ms-3">{text}</div>,
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
            render: (text: string, record: any) => (
                <Switch
                    defaultChecked={record?.isActive == "1" ? true : false}
                    onChange={(value) => {
                        handleActiveUser(value, record);
                    }}
                />
            ),
        },
        {
            title: t("createat"),
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (text: string) => format(text, router.locale || "en"),
        },
        {
            title: t("fund"),
            dataIndex: "funds",
            key: "funds",
            align: "right",
        },
        {
            title: t("totalmoney"),
            dataIndex: "total_money",
            key: "total_money",
            align: "right",
        },
        {
            align: "center",
            title: t("role"),
            dataIndex: "role",
            key: "role",
            render: (text: string, record: any) => record?.role?.name,
        },
        {
            title: t("action"),
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 200,
            render: (text: string, record: any) => {
                return (
                    <div className="flex justify-center">
                        <TableAction
                            openState={openState}
                            // viewDetail={<>view detail</>}
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
                                        <EditUser formValues={record} />

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Update
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </>
                            }
                        />
                    </div>
                );
            },
        },
    ];
    const handleActiveUser = (value: any, user: any) => {
        axiosClient
            .patch(
                "https://devbe.azseo.net/user/update-status?language=en",
                {
                    status: value ? 0 : 1,
                    data: [user.id],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                toast.success(res.data.data.message);
            })
            .catch((error) => {
                toast.error(error.message);
            });
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
    // handle filter
    const [openState, setOpenState] = useState(false);

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
    const [keyword, setKeyword] = useState(
        getObjecFormUrlParameters(router)?.keyword || ""
    );
    const { data, isFetching } = useUserData({
        keyword: keyword,
        offset: (pageIndex - 1) * pageSize,
        limit: pageIndex * pageSize,
    });

    console.log(data);
    const handleTableChange = (pagination: TablePaginationConfig) => {
        const current = pagination.current || 1;
        setPageIndex(current);
        const pageSize = pagination.pageSize || 20;
        setPageSize(pageSize);
    };
    const handleSearch = _.debounce((e: any) => {
        setKeyword(e.target.value);
    }, 300);
    useEffect(() => {
        if (
            keyword == null &&
            pageSize == 20 &&
            pageIndex == 1 &&
            router.asPath == "/dashboard/user"
        )
            return;
        router.push(router, {
            query: {
                keyword: keyword,
                pageIndex: pageIndex,
                pageSize: pageSize,
            },
        });
    }, [keyword, pageIndex, pageSize]);
    return (
        <>
            <Title level={2} className="text-center">
                {d("user")}
            </Title>
            <Modal
                title={d("addfund")}
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
                        <Select
                            mode="multiple"
                            allowClear
                            options={data?.data}
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            defaultValue={["a10", "c12"]}
                        // onChange={handleChange}
                        // options={options}
                        />
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
                    <Input
                        placeholder="Search..."
                        onChange={handleSearch}
                        defaultValue={keyword}
                    />
                </div>
                <Button
                    id="create"
                    type="primary"
                    icon={<PlusCircleFilled />}
                    iconPosition="end"
                    onClick={openModal}
                >
                    {d("addfund")}
                </Button>
            </div>
            <Table
                className="rounded-md shadow-md border mt-3 overflow-hidden"
                dataSource={data?.data?.data?.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
                columns={columns}
                loading={isFetching}
                onChange={handleTableChange}
                scroll={{ x: 900 }}
                pagination={{
                    total: data?.data.total,
                    pageSize: pageSize,
                    current: pageIndex,
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
