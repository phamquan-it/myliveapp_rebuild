import React, { PropsWithChildren, useEffect } from "react";
import { Form, Input, Button, Checkbox, message, FormProps, Space } from "antd";
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
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        emall?: string;
    };



    return (
        <div className="h-screen flex justify-center items-center sm:bg-slate-100">
            <div className="w-full md:w-1/2 lg:w-1/3 p-3 md:border md:shadow rounded md:bg-white">

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Space>
                        <Form.Item<FieldType>
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Form.Item>

                    </Space>
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

