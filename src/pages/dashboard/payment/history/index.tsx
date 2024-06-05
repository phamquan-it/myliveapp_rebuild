import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const dataSource = [
    {
      key: "1",
      account: "pmquan@gmail.com",
      id: "1",
      paymethod: "Qrcode",
      date: "13/11/2000",
      content: "content",
      status: "ok",
      amountusd: "2",
      amountvnd: "2",
    },
  ];

  const columns = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("account"),
      dataIndex: "account",
      key: "account",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("paymethod"),
      dataIndex: "paymethod",
      key: "paymethod",
    },
    {
      title: t("date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("content"),
      dataIndex: "content",
      key: "content",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("amountusd"),
      dataIndex: "amountUSD",
      key: "amountUSD",
    },
    {
      title: t("rate"),
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: t("amountvnd"),
      dataIndex: "amountvnd",
      key: "amountvnd",
    },

    {
      title: t("action"),
      dataIndex: "acction",
      key: "acction",
    },
  ];
  return (
    <>
      <DashBoardLayout>
        <Table dataSource={dataSource} columns={columns} />
      </DashBoardLayout>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
