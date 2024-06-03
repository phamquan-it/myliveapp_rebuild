import React, { useState } from "react";
import { Form, Input, Button } from "antd";
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

const RegiterForm = () => {
  const t = useTranslations("Authenlication");
  const router = useRouter();
  const [info, setInfo]  = useState();
  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };
  const mutationLogin = useMutation({
    mutationKey:["/register"],
    mutationFn:(value)=>axiosClient.post("/auth/login?language=en",value),
    onSuccess:(data)=>{
      setCookie("token",data.data.token);
      setCookie("refresh_token",data.data.refresh_token);
      router.push("/")
    },
    onError:()=>{
      router.push("/login")
    }
  })
  const {isPending, mutate} = useMutation({
    mutationKey:["/register"],
    mutationFn:(value)=>axiosClient.post("/auth/register?language=en",value),
    onSuccess:(data)=>{
      toast.success("Success")
      mutationLogin.mutate(info)
    },
    onError:((err)=>{
      console.log(err);
      toast.error("An error occured")
    })
  })
  const onFinish = async (values: any) => {
    if (values.confirmpassword != values.password) {
      toast.error(t("confirmpasswordError"));
      return;
    }
    setInfo(values)
    mutate(values)
  };
  return (
    <>
      <FormLayout>
        <ToastContainer />
        <div className="w-fullrounded px-5 py-5">
          <Title level={3} className="text-center">
            {t("register")}
          </Title>
          <Form
            className="w-full"
            name="basic"
            initialValues={{ remember: true }}
            {...layout}
            onFinish={onFinish}
          >
            <Form.Item
              label={t("fullname")}
              name="name"
              rules={[{ required: true, message: "Please input fullname!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("email")}
              name="email"
              rules={[{ required: true, message: t("requiredEmail") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: t("requiredpassword") },
                {
                  min: 5,
                  message: "Password should have at least 5 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t("rpassword")}
              name="confirmpassword"
              rules={[
                { required: true, message: t("confirmpassword") },
                {
                  min: 5,
                  message: "Password should have at least 5 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="pb-3 flex gap-2">
                <Button type="primary" htmlType="submit" loading={isPending}>
                  {t("register")}
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {t("login")}
                </Button>
              </div>
              <Link href={"/"}>{t("gotohomepage")}</Link>
            </Form.Item>
          </Form>
        </div>
      </FormLayout>
    </>
  );
};

export default RegiterForm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
