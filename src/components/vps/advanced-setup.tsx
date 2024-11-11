import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import { SettingFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal, Table, TableProps, Transfer, TransferProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
interface AdvancedSetupProps {

}

const AdvancedSetup: React.FC<AdvancedSetupProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {

    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const router = useRouter()
    const { data, isFetching, isError } = useQuery({
        queryKey: ["advanded-configuration", router],
        queryFn: () =>
            axiosInstance.get("advanded-configuration/list", {
                params: {
                    language: "en",
                },
            }),
        placeholderData: (previousData) => previousData,
    });


    const columns: ColumnsType<AdvandedConfig> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Resolution',
            dataIndex: 'resolution_key',
            key: 'resolution_key',
        },
        {
            title: 'Max stream',
            dataIndex: 'max_stream',
            key: 'max_stream',
        },
    ];

    const tableProps: TableProps = {
        rowKey: "id",
        columns,
        dataSource: data?.data?.data,
        pagination: false,
        rowSelection: {
            type: "checkbox"
        },
        style: {
            scrollbarWidth: 'thin'
        },
        scroll: { y: 500 }
    }

    return <>
        <Button type="default" onClick={showModal} icon={<IoSettingsSharp />}></Button>
        <Modal title="Advanced setup" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Table {...tableProps} />
        </Modal>
    </>

}

export default AdvancedSetup
