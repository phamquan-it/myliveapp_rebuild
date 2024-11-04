import React, { PropsWithChildren, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Title from "antd/es/typography/Title";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import FormLayout from "@/components/client/FormLayout";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";
import { setCookie } from "cookies-next";
import axiosInstance from "@/apiClient/axiosConfig";
const LoginForm = () => {
    const t = useTranslations("Authenlication");

    const layout = {
        labelCol: { span: 24 }, // Set the label width to take up the full width
        wrapperCol: { span: 24 }, // Set the input width to take up the full width
    };
    const router = useRouter();
    const dispatch = useDispatch();
    const { isPending, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: (body) => axiosInstance.post("/auth/login?language=en", body),
        onSuccess: (data) => {
            toast.success("Success");
            console.log(data.data);
            setCookie("token", data.data.accessToken);
            setCookie("refresh_token", data.data.refreshToken);
            router.push("/dashboard");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    async function onFinish(values: any) {
        mutate(values);
    }

    type FieldType = {
        email: string;
        password: string;
    };


    return (
        <div className="h-screen flex justify-center items-center bg-slate-100">
            <div className="w-full md:w1/2 lg:w-1/3 p-3 border shadow rounded bg-white">
                <Form
                    className="py-3 pe-3"
                    name="basic"
                    initialValues={{ remember: true }}
                    {...layout}
                    onFinish={onFinish}
                >

                    <div className="px-2 pb-3">
                        <Title level={3} className="!pt-4 !mb-1">
                            LiveStreams
                        </Title>
                        <p className="text-slate-700">Welcome to livestreams</p>
                    </div>
                    <div className="px-2">
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: t("requiredEmail") }]}
                        >
                            <Input className="py-2" placeholder="Enter email" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[
                                { required: true, message: t("requiredpassword") },
                                {
                                    min: 8,
                                    message: t("min5char"),
                                },
                            ]}
                        >
                            <Input.Password className="py-2" placeholder="Enter password" />
                        </Form.Item>
                        <div className="flex justify-between">
                            <Form.Item
                                className="!mb-0"
                                rules={[{ required: true }]}
                            >
                                <Checkbox>Remenber me</Checkbox>
                            </Form.Item>
                            <Form.Item
                                className="!mb-0"
                            >
                                <Link href="forgot-password">Forgot password?</Link>
                            </Form.Item>
                        </div>
                        <Form.Item className="!mt-5">
                            <Button
                                type="primary"
                                block
                                size="large"
                                htmlType="submit"
                                loading={isPending}
                            >
                                {t("login")}
                            </Button>
                            <p className="text-center flex items-center mt-3">
                                {t("donothaveanacount")}
                                <Button
                                    className="!px-0"
                                    type="link"
                                    onClick={() => {
                                        router.push("/register");
                                    }}
                                >
                                    {t("register")}
                                </Button>
                            </p>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default LoginForm;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default,
        },
    };
}
