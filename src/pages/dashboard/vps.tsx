import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import { EyeFilled, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { webdockConfig } from "../../../WEBDOCK_PROVIDER/APIRequest/config";
import _ from "lodash";
import {
    Affix,
    Button,
    ConfigProvider,
    Input,
    Modal,
    Table,
    TablePaginationConfig,
    Tag,
    Image,
    Tooltip,
    Progress,
} from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import axios from "axios";
import VpsForm from "@/components/admin/vps/VpsForm";
import VpsButtonState from "@/components/admin/vps/VpsButtonState";
import XtermUI, { SSHInfo } from "@/components/app/Xterm.component";
import VpsDetail from "@/components/admin/vps/VpsDetail";
import VpsHideOption from "@/components/admin/vps/VpsHideOption";
import axiosInstance from "@/apiClient/axiosConfig";
import SearchInput from "@/components/filters/SearchInput";
import { pagination } from "@/helpers/pagination";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import { ColumnsType } from "antd/es/table";
import HorizoneMenu from "@/components/admin/HorizoneMenu";
import HideMenuSelected from "@/components/vps/HideMenuSelected";
import Reloadbtn from "../reloadbtn";
import NumOfStreamsVps from "@/components/vps/NumOfStreamsVps";
import { FaPlay } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import AdminLayout from "@/components/admin-layout";
import AdvancedSetup from "@/components/vps/advanced-setup";
import Link from "next/link";
import Network from "@/components/vps/network";
import VpsPrice from "@/components/admin/vps/vps-price";
import VpsStatus from "@/components/admin/vps/vps-status";

const Page = () => {
    const [openState, setOpenState] = useState(false)
    const t = useTranslations("MyLanguage");
    const p = useTranslations("Placeholder");
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sync, setSync] = useState(false)
    const profilesSlug = useQuery({
        queryKey: ['ProfileSlug', location], queryFn: () => axiosInstance.get(
            "/vps-provider/get-profile-for-create-vps", {
            params: {
                locationId: 'dk'
            }
        })
    });


    const { data, isFetching, isError } = useQuery({
        queryKey: ['vpsData', isModalOpen],
        queryFn: () => axiosInstance.get<any>('/vps-provider/getvps', {
            params: {
                language: "en"
            }
        })
    });


    const [showModal, setShowModal] = useState<boolean>(false);
    const hideModal = () => {
        setShowModal(false);
    };


    const d = useTranslations("DashboardMenu");


    const columns: ColumnsType<any> = [
        {
            title: <div className="py-2">{t('entryno')}</div>,
            dataIndex: "key",
            key: 'key',
            width: 35
        },

        {
            title: t('name'),
            dataIndex: "name",
            key: 'name',
        },
        {
            title: t('platform'),
            dataIndex: 'platform',
            key: 'platform',
            render: () => (
                <Image className="mt-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVI5SCDlnpFcgofZJAAQuIzHeBdlPO1n6Yw&s" width={30} alt="" preview={false} />
            )
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: 'brand',
            render: (text: string, record: any) => record?.vps?.brand
        },
        {
            title: t('price'),
            dataIndex: 'profile',
            key: 'profile',
            width: 150,
            align: "right",
            render: (text) => (<VpsPrice profile={text} profiles={profilesSlug?.data} />)
        },

        {
            title: "Network",
            dataIndex: "slug",
            key: 'slug',
            render: (text: string) => <>
                <Network slug={text} />
            </>
        },
        {
            title: ('No. Stream'),
            dataIndex: "stream",
            align: "center",
            render: (text, record) => <NumOfStreamsVps slug={record.slug} />
        },
        {
            title: t('status'),
            dataIndex: 'slug',
            key: 'slug',
            render: (text, record) => {
                console.log("vps", record)
                return <>
                    <VpsStatus slug={text} />
                </>
            },
            align: "center"
        },
        {
            title: '',
            width: 190,
            dataIndex: ('slug'),
            render: (text: any, record: any) => (<div className="grid grid-cols-4">
                <VpsDetail slug={record} closeModal={() => { }} />
                <XtermUI SSHInfo={{
                    ipv4OrHost: '192.168.1.51', sshUser: 'root'
                }} />

                <VpsHideOption vps={record} />
                <AdvancedSetup slug={text} />
            </div>)
        }
    ]

    const [connectionState, setConnectionState] = useState(false);


    const { pageIndex, pageSize, limit, offset } = pagination(router)
    const syncObj = syncObjectToUrl(router)
    const [selectedRows, setSelectedRows] = useState<any>([])
    return (
        <AdminLayout selected={selectedRows} breadcrumbItems={
            [
                {
                    title: <Link href="/dashboard">{d('home')}</Link>
                },
                {
                    title: 'Vps',
                },
            ]
        } actions={(
            <HideMenuSelected selectedRows={selectedRows} />
        )} staticAction={(
            <Button
                type="primary"
                id="create"
                icon={<PlusCircleFilled />}
                iconPosition="end"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                {t("create")}
            </Button>
        )}>

            <div className="grid gap-2 sm:flex justify-between items-center my-3">
                <div id="filter">
                </div>
            </div>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        cellPaddingBlock: 5
                    }
                }
            }}>
                <Table className="!font-sans"
                    dataSource={data?.data.map((item: any, index: number) => ({
                        ...item,
                        key: pageIndex * pageSize + (index + 1) - pageSize,
                    }))}
                    rowKey='slug'
                    columns={columns}
                    loading={isFetching}
                    scroll={{ x: 1000 }}
                    onChange={(pag) => {
                        const { current, pageSize } = pag
                        syncObj({
                            pageIndex: current,
                            pageSize
                        })
                    }}
                    pagination={{
                        total: data?.data.total,
                        pageSize: pageSize,
                        current: pageIndex,
                        showSizeChanger: true,
                    }}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectedRows(selectedRows)
                        }
                    }}
                />
            </ConfigProvider>
        </AdminLayout>
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

