import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import UserProfile from "@/components/client/UserProfile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";

const Page = () => {
  const token = getCookie("token");
  const { data } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () =>
      axiosClient.get("/user/info?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  console.log(data);

  return (
    <>
      <UserProfile
        active={data?.data.data.isActive}
        funds={data?.data.data.funds}
        name={data?.data.data.name}
        email={data?.data.data.email}
        role={data?.data.data.role.name}
      />
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
