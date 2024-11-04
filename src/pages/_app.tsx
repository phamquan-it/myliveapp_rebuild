import ReactQueryProvider from "@/libs/react-query/ReactQueryProvider";
import ReduxProvider from "@/libs/redux/Provider";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Spin } from "antd";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import vi from "antd/locale/vi_VN";
import en from "antd/locale/en_US";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        setIsReady(router.isReady)
    }, [router])
    const path: string = router.asPath;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isReady) return (<div className="h-screen w-screen flex justify-center items-center"><Spin /> </div>)
    return (
        <NextIntlClientProvider
            locale={router.locale}
            messages={pageProps.messages}
            timeZone="Europe/Vienna"
        >
            {/* addRedux */}
            <ReduxProvider>
                {/* add react  query */}
                <ReactQueryProvider>
                    {/* add ant design */}
                    <ConfigProvider
                        theme={theme}
                        locale={router.locale == "vi" ? vi : en}
                    >
                        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} options={{ showSpinner: false }} />
                        <Component {...pageProps} />
                    </ConfigProvider>
                </ReactQueryProvider>
            </ReduxProvider>
        </NextIntlClientProvider>
    );
}
