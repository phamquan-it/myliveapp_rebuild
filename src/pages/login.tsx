import React, { PropsWithChildren, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import Title from "antd/es/typography/Title";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { GetStaticPropsContext } from "next";
import { useLoginMutation } from "@/libs/redux/api/auth.api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const handleLogin = async (values: { email: string; password: string }) => {
    
    try {
      const result:any = await login(values).unwrap();
      // Store the token in localStorage
      localStorage.setItem('authToken', result.accessToken);
      // Optionally redirect or update UI
      message.success('Login successful!').then(()=>{
        router.push('/dashboard/')
      });
    } catch (err) {
      console.error('Login failed:', err);
      message.error('Login failed. Please try again.');
    }
  };

  const onFinish = (values: { email: string; password: string }) => {
    handleLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Failed to submit form.');
  };
  const t = useTranslations("Authenlication")
  const router = useRouter()

  return (
    <div className="w-full flex justify-center items-center h-full">
     <Form 
          className=" py-5 pe-3 w-1/3 min-w-80"
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Title level={3} className="text-center !pt-4">
            {t("login")}
          </Title>
          <div className="px-2">
            <Form.Item
              label={t("email")}
              name="email"
              rules={[{ required: true, message: t("requiredEmail") }]}
            >
              <Input style={{
                paddingBottom:8,
                paddingTop:8
              }}/>
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: t("requiredpassword") },
                {
                  min: 5,
                  message: t("min5char"),
                },
              ]}
            >
              <Input.Password style={{
                paddingBottom:8,
                paddingTop:8
              }}/>
            </Form.Item>

            <Form.Item className="!mt-5">
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={isLoading}
                style={{
                  height:40
                }}
              >
                {t("login")}
              </Button>
              <div className="mt-3">
                <Link href={"/"}>{t("gotohomepage")}</Link>
              </div>
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
