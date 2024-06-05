import DashBoardLayout from "@/components/admin/DashBoardLayout";

import { GetStaticPropsContext } from "next";

const Page = () => {
  return (
    <>
      <DashBoardLayout>
        <div></div>
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
