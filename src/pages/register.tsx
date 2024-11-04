import React, { useState } from "react";
import { Form, Input, Button, Modal, Checkbox } from "antd";
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
            toast.error("An error occured");
        },
    });
    const onFinish = async (values: any) => {
        if (values.confirmpassword != values.password) {
            toast.error(t("confirmpasswordError"));
            return;
        }
        mutate(values);
    };

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-slate-100">
                <div className="w-1/3 rounded px-5 py-5 bg-white shadow">
                    <Title level={3} className="!mb-1" >
                        LiveStreams
                    </Title>
                    <p className="text-slate-700 pb-3 text-sm font-semibold">Create new account</p>
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
                            rules={[{ required: true, message: t("requiredFullname") }]}
                        >
                            <Input className="py-2" placeholder="Enter your name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: t("requiredEmail") }]}
                        >
                            <Input className="py-2" placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: t("requiredpassword") },
                                {
                                    min: 5,
                                    message: "Password should have at least 5 characters",
                                },
                            ]}
                        >
                            <Input.Password className="py-2" placeholder="Enter password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmpassword"

                            rules={[
                                { required: true, message: t("confirmpassword") },
                                {
                                    min: 8,
                                    message: "Password should have at least 8 characters",
                                },
                            ]}
                        >
                            <Input.Password className="py-2" placeholder="Confirm password" />
                        </Form.Item>
                        <Form.Item className="!mb-0">
                            <Checkbox>I accept terms and policy</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <div className="">
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
                                You have an account?                                <Button
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
