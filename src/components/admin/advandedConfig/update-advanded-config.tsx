import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import { useResolutionList } from '@/apiClient/providers/resolution';
import { EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, Select, message } from 'antd';
import React, { useState } from 'react';
interface UpdateAdvandedConfigProps {
    advandedConfig: AdvandedConfig
}

export const UpdateAdvandedConfig: React.FC<UpdateAdvandedConfigProps> = ({ advandedConfig }) => {
    const updatePath = `advanded-configuration/update/${advandedConfig.id}`
    const resolutionData = useResolutionList()
    const queryClient = useQueryClient()
    const updateAdvandedConfig = useMutation({
        mutationKey: ['advandedConfig' + advandedConfig.id],
        mutationFn: (advandedConfig: AdvandedConfig) => axiosInstance
            .patch(updatePath,
                advandedConfig),
        onSuccess: (res) => {
            message.success("Success")
            setIsModalOpen(false)
            queryClient.invalidateQueries({
                queryKey: ['advanded-configuration']
            })
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const onFinish: FormProps<AdvandedConfig>['onFinish'] = (values) => {
        updateAdvandedConfig.mutate(values)
    };

    const onFinishFailed: FormProps<AdvandedConfig>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return <>
        <Button type="primary" icon={<EditFilled />} iconPosition="end" onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Update" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{
            loading: updateAdvandedConfig.isPending
        }}>
            <Form
                labelAlign="left"
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<AdvandedConfig>
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                    initialValue={advandedConfig.name}
                >
                    <Input placeholder="Enter config name" />
                </Form.Item>
                <Form.Item<AdvandedConfig>
                    label="Resolution"
                    name="resolution_key"
                    rules={[{ required: true }]}
                    initialValue={advandedConfig.resolution_key}
                >
                    <Select options={resolutionData.data?.data.map((resolution) => ({ value: resolution.key, label: resolution.key }))} placeholder="Select resolution" />
                </Form.Item>
                <Form.Item<AdvandedConfig>
                    label="Max stream"
                    name="max_stream"
                    rules={[{ required: true }]}
                    initialValue={advandedConfig.max_stream}
                >
                    <Input placeholder="Enter max stream" />
                </Form.Item>
            </Form>
        </Modal>
    </>
}
