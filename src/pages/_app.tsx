import ReactQueryProvider from "@/libs/react-query/ReactQueryProvider";
import ReduxProvider from "@/libs/redux/Provider";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextProgress from "next-progress";
import vi from "antd/locale/vi_VN";
import en from "antd/locale/en_US";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
            <NextProgress delay={300} options={{ showSpinner: false }} />
            <Component {...pageProps} />
          </ConfigProvider>
        </ReactQueryProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}
