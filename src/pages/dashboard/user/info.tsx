import axiosClient from "@/apiClient/axiosClient";
import axiosInstance from "@/apiClient/axiosConfig";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import UserProfile from "@/components/client/UserProfile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";

const Page = () => {
    const { data } = useQuery({
        queryKey: ["userinfo"],
        queryFn: () =>
            axiosInstance.get("/auth/profile", {
            }),
    });
    console.log(data);

    return (
        <>
            <UserProfile/>
        </>
    );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}.json`))
                .default,
        },
    };
}
