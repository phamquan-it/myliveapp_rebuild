import React, { PropsWithChildren, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
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
import LocaleSwitcher from "@/LocaleSwitcher";
const LoginForm = () => {
    const t = useTranslations("Authenlication");
    const p = useTranslations("Placeholder");
    const router = useRouter();
    const dispatch = useDispatch();
    const { isPending, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: (body) => axiosInstance.post("/auth/login?language=en", body),
        onSuccess: (data) => {
            message.success("Success");
            console.log(data.data);
            setCookie("token", data.data.accessToken);
            setCookie("refresh_token", data.data.refreshToken);
            router.push("/dashboard");
        },
        onError: (err) => {
            message.error(err.message);
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
        <div className="h-screen flex justify-center items-center">
            <div className="absolute top-2 end-4">
                <LocaleSwitcher />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-3  rounded" style={{ maxWidth: 600 }}>
                <Title level={3} className="!text-slate-800 text-center">{ t('login') }</Title>
                <Form
                    className="py-3 pe-3 "

                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item<FieldType>
                        name="email"
                        label=<span className="font-semibold text-slate-700">{t('email')}</span>
                        rules={[{ required: true, message: t("requiredEmail") }]}
                    >
                        <Input className="py-2" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label=<span className="font-semibold text-slate-700">{t('password')}</span>
                        name="password"
                        rules={[
                            { required: true, message: t("requiredpassword") },
                            {
                                min: 8,
                                message: t("min5char"),
                            },
                        ]}
                    >
                        <Input.Password className="py-2" />
                    </Form.Item>
                        <Button href={"/"} type="link" className="!px-0">{t('gotohomepage')}</Button>
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
                        <p className="text-center flex items-center justify-center mt-3 text-slate-400">
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
