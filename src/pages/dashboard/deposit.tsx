import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Page = () => {
    const d = useTranslations("DashboardMenu");
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <div className="w-full">
                <Title level={1} className="text-center !font-bold">
                    {d("deposit")}
                </Title>
                <div className="m-auto w-1/2 min-w-80 bg-white p-5 pt-10 rounded-2xl">
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelAlign="left"
                    >
                        <Form.Item
                            label="Amount(USD)"
                            name="username"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Exchange rate today" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Amount (VND)" name="username">
                            <Input />
                        </Form.Item>
                        <Form.Item label="User" name="username">
                            <Input />
                        </Form.Item>

                        <Form.Item className=" flex justify-end">
                            <div className="grid lg:flex justify-center gap-2 ">
                                <Button type="primary" htmlType="submit">
                                    Playment via Perfect Money
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Playment via QR Code
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
