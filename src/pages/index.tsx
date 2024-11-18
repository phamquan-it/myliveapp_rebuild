import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import lodash, { forEach } from "lodash";
import { useTranslations } from "next-intl";
import {
    Alert,
    Button,
    Card,
    ConfigProvider,
    Form,
    Image,
    Input,
    Layout,
    List,
    Modal,
    Select,
    Table,
    TableProps,
} from "antd";
import { useRouter } from "next/router";
import axiosClient from "@/apiClient/axiosClient";
import { useEffect, useState } from "react";
import { Footer, Header } from "antd/es/layout/layout";
import LocaleSwitcher from "@/LocaleSwitcher";
import {
    ClockCircleOutlined,
    FacebookFilled,
    MobileOutlined,
    ShareAltOutlined,
    StarFilled,
    TeamOutlined,
    XOutlined,
    YoutubeFilled,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/es/typography/Title";
import OrderForm from "@/components/client/OrderForm";
import PageLayout from "@/components/PageLayout";
import { platform } from "os";
import SearchInput from "@/components/filters/SearchInput";

const Home = ({
    locale,
    serviceData,
    platformdata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const p = useTranslations("Placeholder");
    const [serviceDataTable, setserviceDataTable] = useState(serviceData);
    const t = useTranslations("MyLanguage");
    const [pageSize, setPageSize] = useState(20);
    const router = useRouter();
    const columns: any = [
        {
            title: t("service"),
            dataIndex: "name",
            key: "name",

            render: (text: string, record: any) => (
                <div className="flex gap-1 items-center">
                    {record.icon != undefined ? (
                        <Image src={record.icon} alt="" width={25} />
                    ) : (
                        ""
                    )}
                    {text}
                </div>
            ),
        },
        {
            title: t("rate"),
            dataIndex: "level",
            width: "100px",
            key: "level",
            render: (text: string) => (
                <>
                    {text != undefined ? (
                        <div className="flex gap-1">
                            {text}
                            <StarFilled className="!text-orange-400" />
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            ),
        },
        {
            title: t("minorder"),
            dataIndex: "min",
            key: "min",
            align: "right",
            width: "130px",
        },
        {
            title: t("maxorder"),
            dataIndex: "max",
            key: "max",
            align: "right",
            width: "130px",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            width: "40px",

            render: (text: string | number, record: any) => (
                <>
                    {record.icon == undefined ? (
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                // setShowModal(true);
                                router.push(`/dashboard/order/new-order?id=${text}`);
                            }}
                        >
                            {t("buy")}
                        </Button>
                    ) : (
                        ""
                    )}
                </>
            ),
        },
    ];

    //multiple locale

    const d = useTranslations("PageLayout");
    const handleTable = (pagination: any) => {
        setPageSize(pagination.pageSize);
        // setCurrent(pagination.current);
        router.push(router, {
            query: {
                current: pagination.current,
            },
        });
    };
    //profess list
    const professList = [
        {
            key: 1,
            icon: <ClockCircleOutlined width={50} />,
            title: d("easy"),
            description: d("easy_desc"),
        },
        {
            key: 2,
            icon: <TeamOutlined />,
            title: d("stable"),
            description: d("stable_desc"),
        },
        {
            key: 3,
            icon: <ShareAltOutlined />,
            title: d("crossplatform"),
            description: d("crossplatform_desc"),
        },
        {
            icon: <MobileOutlined />,
            title: d("support"),
            description: d("support_desc"),
        },
    ];
    const { platformId, txtsearch } = router.query;
    const [showModal, setShowModal] = useState(false);

    const tableProps: TableProps = {
        columns,
        dataSource: [
            { name: "Live streams 1", level: 1, min: 5, max: 10 },
            { name: "Live streams 2", level: 1, min: 5, max: 10 },
            { name: "Live streams 3", level: 1, min: 5, max: 10 },
            { name: "Live streams 4", level: 1, min: 5, max: 10 },
            { name: "Live streams 5", level: 1, min: 5, max: 10 },
            { name: "Live streams 6", level: 1, min: 5, max: 10 },
            { name: "Live streams 7", level: 1, min: 5, max: 10 },
            { name: "Live streams 8", level: 1, min: 5, max: 10 },
        ]
    }
    return (
        <main className="h-screen overflow-auto">
            <ConfigProvider theme={{
                components: {
                    Layout: {
                        headerBg: 'white',
                        headerPadding: 5,
                        footerBg: '#2d323d'
                    }
                }
            }}>
                <Layout>

                    <Header className="shadow-sm mb-3">
                        <div className="flex justify-between items-center" style={{
                            maxWidth: 1400,
                            margin: "auto"
                        }}>
                            <div className="flex items-center">
                                <Image
                                    preview={false}
                                    height={50}
                                    src={`assets/livestreams.webp`}
                                    alt=""
                                />
                                <Title level={3} className="!mb-0 !font-sans translate-y-1 !text-sky-500">LiveStreams</Title>
                            </div>
                            <div className="flex gap-1 items-center h-full">
                                <LocaleSwitcher
                                    onChange={(value: string) => {
                                        router.push(
                                            router,
                                            {
                                                query: router.query,
                                            },
                                            { locale: value }
                                        );
                                    }}
                                />
                                <Button
                                    type="primary"
                                    className=""
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    {d("login")}
                                </Button>
                                <Button
                                    type="default"
                                    className=""
                                    onClick={() => {
                                        router.push("/register");
                                    }}
                                >
                                    {d("register")}
                                </Button>
                            </div>
                        </div>
                    </Header>

                    <Content>
                        <div style={{
                            maxWidth: 1400,
                            margin: "auto"
                        }}>

                            <div className="lg:flex gap-2 justify-center ">
                                {professList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div
                                                style={{
                                                    width: 240,
                                                }}
                                                key={index}
                                                className=" px-4 custom_icon bg-gray-100 py-2">
                                                <h1 className="flex gap-1 justify-center text-xl">
                                                    <span className="">{item.icon}</span>
                                                    <span
                                                        className="text-xl"
                                                        style={{
                                                            backgroundImage:
                                                                "linear-gradient(90deg, rgba(9,121,10,1) 0%, rgba(3,62,182,1) 100%)",
                                                            WebkitBackgroundClip: "text",
                                                            WebkitTextFillColor: "transparent",
                                                            backgroundClip: "text",
                                                        }}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </h1>
                                            </div>
                                            <p
                                                className="text-sm text-center mt-1"
                                                style={{
                                                    fontSize: 15,
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {item.description}
                                            </p>

                                        </div>
                                    );
                                })}
                            </div>
                            <Title level={3} className="!text-gray-700 !text-center mt-7">
                                Bảng giá dịch vụ
                            </Title>
                            <div
                                className="flex gap-2 py-3"
                            >
                                <SearchInput />

                            </div>
                            <div className="container mx-auto">
                                <Table {...tableProps} />
                            </div>
                        </div>

                    </Content>
                    <Footer className="!text-slate-50 font-sans">
                        <div
                            className="container mx-auto grid grid-cols-4 gap-4"
                            style={{
                                fontSize: 12,
                                color: "#98a2aa"
                            }}
                        >
                            <div className="">
                                <Title level={5} className="!font-sans !text-slate-50">{d("aboutus")}</Title>
                                <p>Learn more about our company and mission.</p>
                            </div>
                            <div>
                                <Title level={5} className="!font-sans !text-slate-50">{d("contact")}</Title>
                                <p>Email: info@example.com</p>
                                <p>Phone: +1 123-456-7890</p>
                            </div>
                            <div>
                                <Title level={5} className="!font-sans !text-slate-50">{d("terms")}</Title>
                                <p>Email: info@example.com</p>
                                <p>Phone: +1 123-456-7890</p>
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <YoutubeFilled />
                                    <FacebookFilled />
                                    <XOutlined/>
                                </div>
                                <p>Email: info@example.com</p>
                                <p>Phone: +1 123-456-7890</p>
                            </div>

                            <div className="col-span-3 ">
                                <p>&copy; 2023 Your Company. All rights reserved.</p>
                            </div>
                        </div>
                    </Footer>
                </Layout>

            </ConfigProvider>
        </main>
    );
};
export default Home;
Home.Layout = PageLayout;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    let serviceData: any[] = [];
    let platformdata: any = [];
    try {
        //   const dataResponse = await axiosClient.get(
        //     `/platform/list?language=${locale}`
        //   );
        //   dataResponse.data.data.map((item: any) => {
        //     platformdata.push(item);
        //   });
        //   const response = await axiosClient.get(
        //     "/service/list-public?language=" + locale
        //   );
        //   response.data.data.map((item: any) => {
        //     serviceData.push(item);
        //     item.serviceCategories.map((serviceCategory: any) => {
        //       serviceCategory.service.platformId = item.platformId;
        //       serviceData.push(serviceCategory.service);
        //     });
        //   });
    } catch (error) {
        console.error("Error fetching service data:", error);
    }

    return {
        props: {
            platformdata,
            locale,
            serviceData,
            messages: (await import(`../../messages/${locale}.json`)).default,
        },
        revalidate: 86400,
    };
}
