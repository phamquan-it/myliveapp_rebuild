import { GetStaticPropsContext } from "next";
import { Button, Result } from 'antd';
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";
import { AuthApi } from "@/apiClient/providers/auth";
import { useEffect } from "react";
const Page = () => {
  const router = useRouter()
  const t = useTranslations("Authenlication")
  const n = useTranslations("result")
  console.log("Your key" + router.query.key);
  const { data, isFetching, isError } = useQuery({
    queryKey: ['activate'], queryFn: () => axiosClient.patch(AuthApi.activate, {
      key: router.query.key
    })
  });
  useEffect(()=>{
    console.log(data);
  },[data])
  return (
    <>
      <Result
        status="success"
        title={n('active')}
        subTitle={`Kích hoạt người dùng : ${data?.data?.id}, Hanoi, Vietnam - ${new Date().toDateString()}`}
        extra={[
          <Button type="primary" key="console" onClick={() => {
            router.push("/");
          }}>
            {t('gotohomepage')}
          </Button>,
          <Button key="buy" onClick={() => {
            router.push("/login")
          }}>{t('login')}</Button>,
        ]}
      />
    </>
  );
}
export default Page
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
