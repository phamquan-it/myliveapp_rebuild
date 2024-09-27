import DashBoardLayout from "@/components/admin/DashBoardLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
    Switch,
    Tabs,
    TabsProps,
} from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import SettingForm from "@/components/admin/SettingForm";
import VpsConfig from "@/components/admin/VpsConfig";
import { useRouter } from "next/router";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";

const Page = () => {
    const onFinish = (values: any) => {
        console.log("Form values:", values);
        // Handle form submission here
    };
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("Settings");
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t('app_config'),
            children: <SettingForm/>,
        },
        {
            key: '2',
            label: t('vps_config'),
            children: <VpsConfig/>,
        },
    ];
    const router = useRouter()
    const tab: string = Array.isArray(router.query?.tab) ? router.query.tab[0] : router.query?.tab || '1';

    const syncObj = syncObjectToUrl(router)
    return (
        <>
            <Title className="!semi-boldb !text-center">{d("Settings")}</Title>


            <Tabs defaultActiveKey={tab} items={items} addIcon={<PlusOutlined />} tabPosition='top' onChange={(e)=>{
                console.log('active key', e)
                syncObj({tab: e})
            }} />
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
