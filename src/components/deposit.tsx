import axiosInstance from "@/apiClient/axiosConfig";
import { useExchangeRate } from "@/apiClient/providers/exchangeRate";
import { useQuery } from "@tanstack/react-query";
import { Button, Checkbox, ConfigProvider, Form, Input, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Deposit = () => {
    const d = useTranslations("DashboardMenu");
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const [form] = Form.useForm()
    const userData = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/users', { params: { language: "en" } })
    })
    const exchangeQuery = useExchangeRate()
    useEffect(() => {
        form.setFieldsValue({ exchangerate: exchangeQuery?.data?.data?.conversion_rate / 1000 })
    }, [exchangeQuery, form])
    return (
        <>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelAlign="left"
                onFieldsChange={(changeFields) => {
                    const amountvnd = form.getFieldValue("amountusd") * form.getFieldValue("exchangerate")
                    form.setFieldsValue({ amountvnd })
                }}
            >
                <Form.Item
                    label={<span className="font-semibold text-slate-700">Amount(USD)</span>}
                    name="amountusd"
                    rules={[{ required: true }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label={<span className="font-semibold  text-slate-700">Exchange rate</span>}
                    name="exchangerate"
                    rules={[{ required: true }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label={<span className="font-semibold  text-slate-700">Amount(VND)</span>}
                    name="amountvnd"
                    rules={[{ required: true }]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item label={<span className="font-semibold  text-slate-700">User</span>} name="username">
                    <Select labelRender={(user) => <>{user.label}</>} options={userData?.data?.data?.data.map((
                        user: { id: string, email: string }) => ({
                            key: user.id, label: user.email, value: user.id
                        }))} />
                </Form.Item>
                <Form.Item >
                    <div className="flex justify-end mt-3">
                        <div className="flex gap-2">
                            <ConfigProvider theme={{
                                token: {
                                    colorPrimary: "#1e79e4"
                                }
                            }}>
                                <Button type="primary" className="!font-sans">Paymnent via QR code</Button>
                            </ConfigProvider>
                        </div>
                    </div>

                </Form.Item>
            </Form>
        </>
    );
};
export default Deposit;

