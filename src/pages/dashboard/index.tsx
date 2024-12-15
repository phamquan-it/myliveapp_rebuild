"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { Card, ConfigProvider, Select, Table, Tabs, TabsProps, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { FacebookFilled, LinkedinFilled, TwitchOutlined, TwitterCircleFilled, YoutubeFilled } from "@ant-design/icons";
import { GetStaticPropsContext } from "next";
import { FaShoppingBag } from "react-icons/fa";
import PlatformChart from "@/components/charts/PlatformChart";
import LineChart from "@/components/charts/LineChart";
import LivestreamsStatisticTable from "@/components/statistics/livestreams-table";
import VpsStatistic from "@/components/statistics/vps-statistic";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/apiClient/axiosConfig";
import { useTranslations } from "next-intl";
import UserStatistic from "@/components/statistics/user-statistic";
import SystemLog from "@/components/statistics/system-log";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
    ssr: false,
});
interface PageProps {

}
const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '',
        label: 'All',
        children: '',
    },
    {
        key: 'running',
        label: 'Running',
        children: '',
    },
    {
        key: 'scheduling',
        label: 'Scheduling',
        children: '',
    },
    {
        key: 'initalize',
        label: 'Initalize',
        children: '',
    },
];


const Page: React.FC<PageProps> = () => {

    const streamStatistic = useQuery({
        queryKey: ['/statistic/streams'],
        queryFn: () => axiosInstance.get("/statistic/streams")
    })
    const fundsStatistic = useQuery({
        queryKey: ['/statistic/fund'],
        queryFn: () => axiosInstance.get("/statistic/fund")
    })


    const orderStatistic = useQuery({
        queryKey: ['/statistic/order'],
        queryFn: () => axiosInstance.get("/statistic/get-stream-statistic-by-user")
    })

    const vpsStatistic = useQuery({
        queryKey: ['/statistic/vps'],
        queryFn: () => axiosInstance.get("/statistic/vps")
    })

    const order_stasus = orderStatistic?.data?.data
    const { currentTotal, remains } = fundsStatistic?.data?.data || {}

    const [scheduling, initalize, running, stopped, error] = streamStatistic?.data?.data || []
    const s = useTranslations("StreamStatus")
    return <div style={{
        height: "calc(100vh - 65px)",
        overflow: "auto"
    }}>

        <Title level={5} className="ps-3 pt-3">Dashboard</Title>
        <div className="grid grid-cols-3 px-3 gap-3">
            <Card title="Orders">
                <div className="grid grid-cols-2 text-center">
                    <div>
                        <Title level={4}>{order_stasus?.running}</Title>
                        <p className="text-slate-600 text-center">In progress</p>
                    </div>
                    <div>
                        <Title level={4}>{order_stasus?.completed}</Title>
                        <p className="text-slate-600 text-center">Completed</p>
                    </div>
                </div>
            </Card>

            <Card title="Funds">
                <div className="grid grid-cols-2 text-center">
                    <div>
                        <Title level={4}>${remains}</Title>
                        <p className="text-slate-600 text-center">Current</p>
                    </div>
                    <div>
                        <Title level={4}>${currentTotal}</Title>
                        <p className="text-slate-600 text-center">Lifetime</p>
                    </div>
                </div>
            </Card>
            <Card title="Vps">
                <div className="grid grid-cols-2 text-center">
                    <div>
                        <Title level={4}>{vpsStatistic?.data?.data?.running_vps}</Title>
                        <p className="text-slate-600 text-center">Running</p>
                    </div>
                    <div>
                        <Title level={4}>{vpsStatistic?.data?.data?.amount}</Title>
                        <p className="text-slate-600 text-center">All</p>
                    </div>
                </div>
            </Card>
            <Card title="All orders" className="col-span-3">
                <div className="grid grid-cols-5 text-center">
                    <div>
                        <Title level={4}>{initalize?.count ?? 0}</Title>
                        <p className="text-slate-600 text-center">{s('initalize')}</p>
                    </div>
                    <div>
                        <Title level={4}>{scheduling?.count ?? 0}</Title>
                        <p className="text-slate-600 text-center">{s('scheduling')}</p>
                    </div>
                    <div>
                        <Title level={4}>{running?.count ?? 0}</Title>
                        <p className="text-slate-600 text-center">{s('running')}</p>
                    </div>
                    <div>
                        <Title level={4}>{stopped?.count ?? 0}</Title>
                        <p className="text-slate-600 text-center">{s('stopped')}</p>
                    </div>
                    <div>
                        <Title level={4}>{error?.count ?? 0}</Title>
                        <p className="text-slate-600 text-center">{s('error')}</p>
                    </div>
                </div>
            </Card>
            <div className="col-span-2">
                <VpsStatistic />
            </div>
            <div className="col-span-1  overflow-hidden">
                <UserStatistic />
            </div>
            <div className="col-span-3">
                <LivestreamsStatisticTable currentTotal={currentTotal} remains={remains} />
            </div>
            <div className="col-span-3">
                <SystemLog />
            </div>
        </div>
    </div>
}
export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
