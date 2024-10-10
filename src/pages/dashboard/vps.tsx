import TableAction from "@/components/admin/TableAction";
import { debounce } from "lodash";
import { EyeFilled, MessageFilled, PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { webdockConfig } from "../../../WEBDOCK_PROVIDER/APIRequest/config";
import _ from "lodash";
import {
    Button,
    Input,
    Modal,
    Table,
    TablePaginationConfig,
    Tag,
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

const Page = () => {
    const [openState, setOpenState] = useState(false)
    const t = useTranslations("MyLanguage");
    const p = useTranslations("Placeholder");
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sync, setSync] = useState(false)
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

    const [sshInfo, setSSHInfo] = useState(
        {
            ipv4OrHost: "",
            sshUser: ""
        }
    )
    const setSlugData = (slug: string) => {
        setSlug(slug)
    }
    const columns: ColumnsType<any> = [
        {
            title: t('entryno'),
            dataIndex: "key",
            key:'key',
            width: 35
        },

        {
            title: t('name'),
            dataIndex: "name",
            key: 'name',
            width: 150
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key:'slug'
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: 'brand',
            render: (text: string, record: any) => record?.vps?.brand
        },
        {
            title: t('ipv4'),
            dataIndex: "ipv4",
            key:'ipv4'
        },
        {
            title: ('Distro'),
            dataIndex: "ipv4",
            key: 'id',
            render: (text: string, record: any) => `
            ${record?.vps?.distro ?? ''} 
            ${record?.vps?.release ??
                'Not known'
                }`
        },
        {
            title: ('Num of stream'),
            dataIndex: "stream",
            render: (text, record)=> <NumOfStreamsVps slug={record.slug}/>
        },
        {
            title: t('status'),
            width: 190,
            dataIndex: ('slug'),
            render: (text: any, record: any) => (<div className="grid grid-cols-4">
                <VpsDetail slug={record} closeModal={() => { }} />
                <Button type="default" disabled={record.status != "running"} icon={<>&gt;_</>} onClick={() => {
                    setSSHInfo({
                        ipv4OrHost: record.ipv4,
                        sshUser: 'root'
                    })
                }}></Button>


                {/* <VpsButtonState record={record}/> */}
                <VpsHideOption vps={record} />
            </div>)
        }
    ]

    const [connectionState, setConnectionState] = useState(false);
    const [isViewDetailOpen, setIsViewDetailOpen] = useState(false)
    const [slug, setSlug] = useState<any>('')
    const hideModalViewDetail = () => {
        setSlug('')
        setIsViewDetailOpen(false)
    }
    const openModalViewDetail = () => {
        setIsViewDetailOpen(true)
    }



    const openModal = () => {
        setIsModalOpen(true);
        setConnectionState(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setConnectionState(false);
    };
    useEffect(() => {
        //open modal when sshInfo change
        if (sshInfo.sshUser != "" && sshInfo.sshUser !== "")
            openModal()
    }, [sshInfo])

    useEffect(() => {
        //open modal view detail
        if (slug != '')
            openModalViewDetail()
    }, [slug])

    const { pageIndex, pageSize, limit, offset } = pagination(router)
    const syncObj = syncObjectToUrl(router)
    const [selectedRows, setSelectedRows] = useState<any>([])
    return (
        <>
            <Title className="text-center" level={2}>
                Vps
            </Title>

            <Modal
                title={`Terminal ${sshInfo.sshUser}@${sshInfo.ipv4OrHost}`}
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                width={850}
                destroyOnClose={true} footer={null}
            >
                <XtermUI SSHInfo={sshInfo} />
            </Modal>

            <Modal width={1000}
                title={t("create")}
                open={showModal}
                onCancel={hideModal}
                footer={null}
            >
                <VpsForm closeModal={hideModal} setSlug={setSlugData} />
            </Modal>
            <div className="flex justify-between items-center my-3">
                <div id="filter">
                    <SearchInput />
                </div>
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
            </div>
            <HorizoneMenu data={selectedRows}>
                <HideMenuSelected selectedRows={selectedRows} />
            </HorizoneMenu>
            <Table
                className="border rounded-md shadow-md overflow-hidden"
                dataSource={data?.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
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

