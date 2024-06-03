import Head from "next/head";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Image } from "antd";
import LocaleSwitcher from "../LocaleSwitcher";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  const t = useTranslations("PageLayout");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{[title, t("pageTitle")].join(" - ")}</title>
      </Head>

      <div style={{ maxWidth: 510 }}>{children}</div>
    </>
  );
}
