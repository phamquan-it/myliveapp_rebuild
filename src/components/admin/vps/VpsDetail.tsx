import { DeleteFilled, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Checkbox, Form, Input, List, Modal, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import { text } from "stream/consumers";
import ViewQueuesProcess from "@/components/app/View.queues.component";
import XtermUI from "@/components/app/Xterm.component";
import ViewQueuesComponent from "@/components/app/View.queues.component";
import LiveStream from "@/components/vps/vps-details/live-stream";
interface VpsDetailProps {
    slug: any,
    closeModal: Function
}
const VpsDetail: React.FC<VpsDetailProps> = ({ slug, closeModal }) => {
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
    const systeminfo = useQuery({
        queryKey: ['vps_detail', slug], queryFn: () => axios.get("https://api.golive365.top/vps-provider/get-profile-for-create-vps?locationId=dk", webdockConfig)
    });

    const { data, isFetching, isError } = useQuery({
        queryKey: ['Queues'], queryFn: () => axios.get('https://api.golive365.top/queue/get-queue-from-vps/', {
            params: {
                slug: slug.slug
            }
        })
    });
    const [vpsData, setVpsData] = useState<any>()



    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Title level={5} className="text-center border-b">Vps info</Title>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 2,
                        }}
                        dataSource={[
                            {
                                title: 'RAM',
                                value: '10.97GB'
                            },
                            {
                                title: 'CPU',
                                value: '8 core, 12 thread'
                            },
                        ]}
                        renderItem={(item: any) => (
                            <List.Item>
                                <Card title={item.title}>{item.value}</Card>
                            </List.Item>
                        )}
                    />


                </div>
                <div>
                    <LiveStream/>
                </div>
            </div>
            <Title level={4}>Queue</Title>
            <Table dataSource={data?.data} loading={isFetching} columns={columns} />
            <ViewQueuesComponent />
        </>
    );
}
export default VpsDetail
