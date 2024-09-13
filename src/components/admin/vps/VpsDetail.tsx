import { DeleteFilled, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Checkbox, Form, Input, List, Modal, Table, Tabs, TabsProps, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import { text } from "stream/consumers";
import ViewQueuesProcess from "@/components/app/View.queues.component";
import XtermUI from "@/components/app/Xterm.component";
import ViewQueuesComponent from "@/components/app/View.queues.component";
import LiveStream from "@/components/vps/vps-details/live-stream";
import VpsProfile from "@/components/vps/vps-details/vps-profiles";
import axiosInstance from "@/apiClient/axiosConfig";
import XtermLog from "@/components/vps/vps-details/xterm-log";
interface VpsDetailProps {
    slug: any,
    closeModal: Function
}
const VpsDetail: React.FC<VpsDetailProps> = ({ slug }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'key',
        },
        {
            title: 'Mission',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (<>
                {record?.mission.name}
            </>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (id: string) => (
                <div className="flex gap-1">
                    <Tooltip title="View detail">
                        <Button type="default" size="small" icon={<EyeFilled />} onClick={handleOpenModal}></Button>
                    </Tooltip>
                    <Tooltip title="Remove from queue">
                        <Button type="default" size="small" icon={<DeleteFilled />} danger></Button>
                    </Tooltip>

                </div>
            )
        },
    ];

    const { data, isFetching, isError } = useQuery({
        queryKey: ['Queues'], queryFn: () => axiosInstance.get('/queue/get-queue-from-vps/', {
            params: {
                slug: slug.slug
            }
        })
    });
    const [vpsData, setVpsData] = useState<any>()



    const [serviceId, setServiceId] = useState('apache2')
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Vps log',
            children: (<>
                <ViewQueuesComponent ipv4={slug.ipv4} service={serviceId} />
            </>),
        },
        {
            key: '2',
            label: 'Queues',
            children: <Table dataSource={data?.data} loading={isFetching} columns={columns} />,
        },
    ];

    useEffect(()=>{
        setServiceId('apache2')
    },[isModalOpen])
       return (
        <>
            <Button type="default" onClick={() => setIsModalOpen(true)} icon={<EyeFilled />}></Button>
            <Modal destroyOnClose={true} width={1300} title="Vps detail" open={isModalOpen} onCancel={() => {
                setIsModalOpen(false);
            }}>
                <div className="grid grid-cols-4 gap-2 pb-8">
                    <div>
                        <Title level={5} className="text-center border-b">Vps info</Title>
                        <VpsProfile vpsProvider={slug} />
                    </div>
                    <div className="col-span-3">
                        <LiveStream slug={slug} setService={setServiceId} />
                    </div>
                </div>
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
}
export default VpsDetail
