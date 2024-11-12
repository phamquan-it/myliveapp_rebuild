import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import { SettingFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Table, TableProps, Transfer, TransferProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/lib/typography/Title';
import { useRouter } from 'next/router';
import React, { Key, useEffect, useState } from 'react';
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
interface AdvancedSetupProps {
    slug: string
}

interface ApplyAdvancedConfig {
    slug: string,
    configIds?: number[] | undefined
}

const AdvancedSetup: React.FC<AdvancedSetupProps> = ({ slug }) => {

    const router = useRouter()
    const configVps = useQuery({
        queryKey: [slug + "vps"],
        queryFn: () =>
            axiosInstance.get("get-config-from-slug", { params: { slug } }),
        placeholderData: (previousData) => previousData,
    });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

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
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | undefined>([])
    const tableProps: TableProps = {
        rowKey: "id",
        columns,
        dataSource: data?.data?.data,
        pagination: false,
        rowSelection: {
            type: "checkbox",
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
                setSelectedRowKeys(selectedRowKeys)
            }
        },
        scroll: { y: 500 }
    }


    useEffect(() => {
        const arrayOfIds = configVps.data?.data?.advandedConfigs?.map((item: AdvandedConfig) => item.id) || [];
        // Log the result
        setSelectedRowKeys(arrayOfIds)
    }, [configVps?.data?.data])
    const applyVpsConfig = useMutation({
        mutationKey: ['applyConfig' + slug],
        mutationFn: (config: ApplyAdvancedConfig) => axiosInstance.post('advancedConfig', config),
        onSuccess: () => {
            message.success("Apply config successfully")
        },
        onError: () => {
            message.error("Applu config err!")
        }
    })

    const handleOk = () => {
        const configIds = selectedRowKeys ? selectedRowKeys.map(k => Number(k)) : [];
        applyVpsConfig.mutate({
            slug, configIds
        })
    }
    return <>
        <Button type="default" onClick={showModal} icon={<IoSettingsSharp />}></Button>
        <Modal
            title="Advanced setup"
            width={600}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Apply"
            okButtonProps={{
                loading: applyVpsConfig.isPending
            }}
        >
            <Table {...tableProps} />
        </Modal>
    </>

}

export default AdvancedSetup
