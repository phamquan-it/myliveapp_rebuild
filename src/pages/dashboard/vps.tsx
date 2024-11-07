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
            title: <div className="py-2">No.</div>,
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
            title: 'Platform',
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
            title: ('Amount'),
            dataIndex: "stream",
            align: "center",
            render: (text, record) => <NumOfStreamsVps slug={record.slug} />
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: () => <>
                <div className="flex justify-center">
                    <Tooltip title="Running">
                        <FaPlay className="text-sky-600" />
                    </Tooltip>
                </div>
            </>,
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            align: "right",
            render: () => (<span className="font-semibold">
                10$
            </span>)
        },
        {
            dataIndex: 'id',
            key: 'id',
            render: () => (<>
                <Button shape="circle" type="link" className="border-none text-slate-700" icon={
                    <FiMoreVertical />
                }></Button>
            </>),
            width: 50
        },


        //      {
        //          title: '',
        //          width: 190,
        //          dataIndex: ('slug'),
        //          render: (text: any, record: any) => (<div className="grid grid-cols-4">
        //              <VpsDetail slug={record} closeModal={() => { }} />
        //              <Button type="default" disabled={record.status != "running"} icon={<>&gt;_</>} onClick={() => {
        //                  setSSHInfo({
        //                      ipv4OrHost: record.ipv4,
        //                      sshUser: 'root'
        //                  })
        //              }}></Button>


        //              {/* <VpsButtonState record={record}/> */}
        //              <VpsHideOption vps={record} />
        //          </div>)
        //      }
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
            <Affix offsetTop={100}>
                <HorizoneMenu data={selectedRows}>
                    <HideMenuSelected selectedRows={selectedRows} />
                </HorizoneMenu>
            </Affix>
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
            <div className="grid gap-2 sm:flex justify-between items-center my-3">
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

