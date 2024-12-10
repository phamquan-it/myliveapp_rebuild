import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { useQuery } from "@tanstack/react-query";
import lodash, { method } from "lodash";
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
const { Option } = Select;
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { PlusCircleFilled, StarFilled } from "@ant-design/icons";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import { toast } from "react-toastify";
import PaymentAction from "@/components/admin/payment/payment-action";

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
            align: "center",
        },
        {
            title: t("email"),
            dataIndex: "account",
            key: "account",
        },
        {
            title: t("create"),
            dataIndex: "creator",
            key: "id",
        },
        {
            title: t("method"),
            dataIndex: "paymethod",
            key: "paymethod",
        },
        {
            title: t("rate"),
            dataIndex: "rate",
            key: "rate",
            render: (text: string) => (
                <>
                    {text} <StarFilled className="!text-orange-400" />
                </>
            ),
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
        },
        {
            title: t("createat"),
            dataIndex: "createdAt",
            width: "10%",
            align: "center",
            key: "createdAt",
            render: (text: string) => format(text, router.locale || "en"),
        },
        {
            align: "center",
            width: 200,
            title: t("action"),
            dataIndex: "id",
            key: "id",
            render: (id: number) => <>
                <PaymentAction paymentId={id} />
            </>
        },
    ];

    const onFinish = (values: any) => {
        console.log("Form values:", values);
        // Handle form submission logic here
    };
    const [showModal, setShowModal] = useState<boolean>(false);
    const hideModal = () => {
        setShowModal(false);
    };
    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <Modal
                title={t("create")}
                open={showModal}
                footer={false}
                onCancel={hideModal}
            >
                <div>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter a name" }]}
                        >
                            <Input placeholder="Enter name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Please enter a valid email",
                                },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item
                            label="Action"
                            name="action"
                            rules={[{ required: true, message: "Please select an action" }]}
                        >
                            <Select placeholder="Select action">
                                <Option value="action1">Action 1</Option>
                                <Option value="action2">Action 2</Option>
                                <Option value="action3">Action 3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "Please enter a valid amount",
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Enter amount" />
                        </Form.Item>
                        <Form.Item
                            label="Fund"
                            name="fund"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "Please enter a valid fund",
                                },
                            ]}
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

            <div className="flex justify-between" id="filter">
                <Button
                    type="primary"
                    onClick={openModal}
                    icon={<PlusCircleFilled />}
                    iconPosition="end"
                    id="create"
                >
                    {t("create")}
                </Button>
            </div>
            <Table
                className="border rounded-md shadow-md mt-3"
                dataSource={data?.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * 10 + (index + 1) - 10,
                }))}
                columns={columns}

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

const data = {
    data: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        account: `tuyen${index}@gmail.com`,
        creator: `quan${index}`,
        paymethod: "QR_code",
        date: "2023-08-24T12:34:13.000Z",
        content: "azseo",
        status: "processing",
        amount: 1,
        rate: 1,
        amount_vi: 100,
    })),
    total: 50,
};
