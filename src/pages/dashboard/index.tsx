import DashBoardLayout from "@/components/admin/DashBoardLayout";
import FastInfoList from "@/components/admin/FastInfoList";
import { GetStaticPropsContext } from "next";

const Page = () => {
  return (
    <>
      <DashBoardLayout>
        <FastInfoList />
      </DashBoardLayout>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
