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
    return <div style={{
        height: "calc(100vh - 65px)",
        overflow: "auto"
    }}>

        <Title level={5} className="ps-3 pt-3">Dashboard</Title>
        <div className="grid grid-cols-2 px-3 gap-3">
            <Card title="All orders">
                <div className="grid grid-cols-2 text-center">
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Current</p>
                    </div>
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Lifetime</p>
                    </div>
                </div>
            </Card>

            <Card title="Funds">
                <div className="grid grid-cols-2 text-center">
                    <div>
                        <Title level={4}>$0</Title>
                        <p className="text-slate-600 text-center">Current</p>
                    </div>
                    <div>
                        <Title level={4}>$0</Title>
                        <p className="text-slate-600 text-center">Lifetime</p>
                    </div>
                </div>
            </Card>
            <Card title="Orders" className="col-span-2">
                <div className="grid grid-cols-5 text-center">
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Initalize</p>
                    </div>
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Scheduling</p>
                    </div>
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Running</p>
                    </div>
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Stopped</p>
                    </div>
                    <div>
                        <Title level={4}>0</Title>
                        <p className="text-slate-600 text-center">Error</p>
                    </div>
                </div>
            </Card>
            <div className="col-span-2">
                <VpsStatistic />
            </div>
            <div className="col-span-2">
                <LivestreamsStatisticTable />
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
