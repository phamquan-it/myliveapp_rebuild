import axiosClient from "@/apiClient/axiosClient";
import axiosInstance from "@/apiClient/axiosConfig";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Image, Input, Progress, Switch, Table, message } from "antd";
import Title from "antd/es/typography/Title";
import { Button } from "antd/lib";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { isError } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "use-intl";



const UserProfile: React.FC = () => {

    const { data, isFetching } = useQuery({
        queryKey: ['userinfo'],
        queryFn: () => axiosInstance.get("/auth/profile")
    })
    const router = useRouter();

    const changeNameMutation = useMutation({
        mutationKey: ['changeName'],
        mutationFn: (name: string) => axiosInstance.patch('/users/change-name', { name }),
        onSuccess: (res) => {
            message.success("OK")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const changePasswordMutation = useMutation({
        mutationKey: ['changeName'],
        mutationFn: (values: any) => axiosInstance.patch('users/change-password', {
            password: values.oldpassword,
            new_password: values.newpassword
        }),
        onSuccess: (res) => {
            message.success("Change password OK")
        },
        onError: (err) => {
            message.error(err.message)
            console.error(err)
        }
    })

    const onFinish = (values: any) => {
        if (values.newpassword != values.confirmpassword) {
            message.error("Comfirm password not OK")
        }
        changePasswordMutation.mutate(values)
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    const t = useTranslations("UserProfile");

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldValue('name', data?.data?.name)
    }, [data, form])

    return (
        <>
            <div className="w-10/12 grid md:grid-cols-2 m-auto gap-9 sm:shadow-md p-4 sm:rounded-md sm:border">
                <div>
                    <ToastContainer />
                    <Form
                        form={form}
                        onFinish={(values: { name: string }) => {
                            changeNameMutation.mutate(values.name)
                        }}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        labelAlign="left"
                    >
                        <Form.Item
                            label={<span className="font-medium">{t("name")}</span>}
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                            className="flex justify-end"
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="me-11"
                            >
                                {t("update")}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                <Form
                    name="passwordChange"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label={<span className="font-medium">{t("oldpassword")}</span>}
                        name="oldpassword"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-medium">{t("newpassword")}</span>}
                        name="newpassword"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">{t("confirmpassword")}</span>}
                        name="confirmpassword"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 5, span: 16 }}
                        className="flex justify-end"
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="me-10"
                        >
                            {t("changepassword")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default UserProfile;
