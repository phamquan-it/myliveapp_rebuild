import React, { useState } from "react";
import { Form, Input, Button, Modal, Checkbox, message } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import { error } from "console";
import { useRouter } from "next/router";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import FormLayout from "@/components/client/FormLayout";
import axiosClient from "@/apiClient/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { AuthApi } from "@/apiClient/providers/auth";
import axiosInstance from "@/apiClient/axiosConfig";
import LocaleSwitcher from "@/LocaleSwitcher";

const RegiterForm = () => {
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const t = useTranslations("Authenlication");
    const router = useRouter();
    const layout = {
        labelCol: { span: 24 }, // Set the label width to take up the full width
        wrapperCol: { span: 24 }, // Set the input width to take up the full width
    };
    const { isPending, mutate } = useMutation({
        mutationKey: ["/register"],
        mutationFn: (value) =>
            axiosInstance.post(AuthApi.register, value),
        onSuccess: (data) => {
            setOpenSuccessModal(true)
        },
        onError: (err) => {
            console.log(err);
            message.error("An error occured");
        },
    });
    const onFinish = async (values: any) => {
        if (values.confirmpassword != values.password) {
            message.error(t("confirmpasswordError"));
            return;
        }
        mutate(values);
    };

    const p = useTranslations("Placeholder")
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="absolute top-2 end-4">
                    <LocaleSwitcher />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-5 py-5 bg-white">
                    <Title level={3} className="!text-slate-800 text-center">{t('register')}</Title>
                    <Modal title="Notification" open={openSuccessModal} footer={<Button type="primary" onClick={() => {
                        setOpenSuccessModal(false)
                        router.push("/login")
                    }}>Okay</Button>}>
                        <p>Account created successfully, please check your email and activate account!</p>
                    </Modal>

                    <Form
                        className="w-full"
                        name="basic"
                        initialValues={{ remember: true }}
                        {...layout}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            label=<span className="font-semibold text-slate-700">{t('fullname')}</span>
                            rules={[{ required: true }]}
                        >
                            <Input className="py-2" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label=<span className="font-semibold text-slate-700">{t('email')}</span>
                            rules={[
                                { required: true, message: t("requiredEmail") },
                                { type: "email" }
                            ]}
                        >
                            <Input className="py-2" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label=<span className="font-semibold text-slate-700">{t('password')}</span>
                            rules={[
                                { required: true, message: t("requiredpassword") },
                                {
                                    min: 8,
                                    message: t("min8char"),
                                },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: t("passwordStrength"), // Message for weak password
                                }
                            ]}
                        >
                            <Input.Password className="py-2" />
                        </Form.Item>
                        <Form.Item
                            name="confirmpassword"
                            label=<span className="font-semibold text-slate-700">{t('rpassword')}</span>
                            rules={[
                                { required: true, message: t("requiredpassword") },
                                {
                                    min: 8,
                                    message: t("min8char"),
                                },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: t("passwordStrength"), // Message for weak password
                                }
                            ]}
                        >
                            <Input.Password className="py-2" />
                        </Form.Item>
                        <Form.Item>
                            <div className="mt-3">
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    loading={isPending}
                                    size="large"
                                >

                                    {t("register")}
                                </Button>
                            </div>
                        </Form.Item>
                        <Form.Item className="" label="" name="">
                            <div className="flex items-center">
                                {p('youhaveanaccount')}
                                <Button
                                    type="link"
                                    className="!px-1"
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    {t("login")}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </>
    );
};

export default RegiterForm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default,
        },
    };
}
