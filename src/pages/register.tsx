import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
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
  const [openSuccessModal,setOpenSuccessModal] = useState(false)
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
      <FormLayout>
       
        <div className="w-fullrounded px-5 py-5">
          <Title level={3} className="text-center">
            {t("register")}
          </Title>
          <Modal title="Notification" open={openSuccessModal} footer={<Button type="primary" onClick={()=>{
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
              label={t("fullname")}
              name="name"
              rules={[{ required: true, message: t("requiredFullname") }]}
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
                  min: 8,
                  message: "Password should have at least 8 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className="pb-3 mt-3">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isPending}
                >
                  {t("register")}
                </Button>
              </div>
              <Link href={"/"}>{t("gotohomepage")}</Link>
            </Form.Item>
            <Form.Item className="" label="" name="">
              <div className="flex items-center">
                You have an account?{" "}
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
      </FormLayout>
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
