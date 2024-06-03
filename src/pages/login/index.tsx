import React, { useEffect } from "react";
import { Form, Input, Button} from "antd";
import Title from "antd/es/typography/Title";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";
import FormLayout from "@/components/client/FormLayout";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from  '@/libs/redux/store'
import { resetState } from "@/libs/redux/slices/authenlicationSlice";
import { loginAsync } from "@/libs/redux/asyncthunkfunc/authenlicateAsyncThunk";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "@/apiClient/axiosClient";
import { setCookie } from "cookies-next";
const LoginForm = () => {
   const t = useTranslations("Authenlication");
  
  const layout = {
    labelCol: { span: 24 }, // Set the label width to take up the full width
    wrapperCol: { span: 24 }, // Set the input width to take up the full width
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const {isPending, mutate}  = useMutation({
    mutationKey:["login"],
    mutationFn:(body)=>axiosClient.post("/auth/login?language=en",body),
    onSuccess:(data)=>{
      toast.success("Success")
      setCookie("token",data.data.token);
      setCookie("refresh_token",data.data.refresh_token);
      router.push("/dashboard")
    },
    onError:(err)=>{
      console.log(err);
      
      toast.error("Email  or password is not valid!")
    }
  })
  async function onFinish(values: any) {
    mutate(values)
  }

  return (
    <>
      <FormLayout>
       
        <Form
          className="w-full py-5 pe-3"
          name="basic"
          initialValues={{ remember: true }}
          {...layout}
          onFinish={onFinish}
        >
          <Title level={3} className="text-center !font-light !pt-4">
            {t("login")}
          </Title>
          <div className="px-2">
            <Form.Item
              label={t("email")}
              name="email"
              rules={[{ required: true, message: ("requiredEmail") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: ("requiredpassword") },
                {
                  min: 5,
                  message: "Password should have at least 5 characters",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="!mt-3">
              <Button type="primary" block htmlType="submit" loading={isPending}>
                {t("login")}
              </Button>
              <p className="text-center">
                {t('donothaveanacount')}
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
            <Form.Item label="" name="">
              <Link href={"/"}>{t("gotohomepage")}</Link>
            </Form.Item>
          </div>
        </Form>
      </FormLayout>
    </>
  );
};
 export default LoginForm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
