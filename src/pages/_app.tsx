import ReactQueryProvider from "@/libs/react-query/ReactQueryProvider";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Spin } from "antd";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import vi from "antd/locale/vi_VN";
import en from "antd/locale/en_US";
import { ReactNode, useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import DashBoardLayout from "@/components/DashboardLayout";


export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        setIsReady(router.isReady)
    }, [router])
    const path: string = router.asPath;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isReady) return (<div className="h-screen w-screen flex justify-center items-center"><Spin /> </div>)

    const Layout = router.asPath.includes('/dashboard') ? DashBoardLayout : PageLayout;
    return (
        <NextIntlClientProvider
            locale={router.locale}
            messages={pageProps.messages}
            timeZone="Europe/Vienna"
        >
            {/* addRedux */}
                {/* add react  query */}
                <ReactQueryProvider>
                    {/* add ant design */}
                    <ConfigProvider
                        theme={theme}
                        locale={router.locale == "vi" ? vi : en}
                    >
                        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} options={{ showSpinner: false }} />
                        <Layout>
                            <div className="font-sans">
                                <Component {...pageProps} />
                            </div>
                        </Layout>
                    </ConfigProvider>
                </ReactQueryProvider>
        </NextIntlClientProvider>
    );
}
