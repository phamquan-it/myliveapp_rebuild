import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import { useResolutionList } from '@/apiClient/providers/resolution';
import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, Select, message } from 'antd';
import React, { useState } from 'react';
interface CreateAdvandedConfigProps {

}

const CreateAdvandedConfig: React.FC<CreateAdvandedConfigProps> = () => {
    const resolutionData = useResolutionList()



    const queryClient = useQueryClient()
    const createAdvandedConfig = useMutation({
        mutationKey: ['advandedConfig'],
        mutationFn: (advandedConfig: AdvandedConfig) => axiosInstance
            .post("advanded-configuration/create",
                advandedConfig,
            ),
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
        console.log('Success:', values);
        createAdvandedConfig.mutate(values)
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
        <Button type="primary" icon={<PlusCircleFilled />} iconPosition="end" onClick={() => {
            setIsModalOpen(true)
        }}>Create</Button>
        <Modal title="Create" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{
            loading: createAdvandedConfig.isPending
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
                    required={false}
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Enter config name" />
                </Form.Item>
                <Form.Item<AdvandedConfig>
                    required={false}
                    label="Resolution"
                    name="resolution_key"
                    rules={[{ required: true }]}
                >
                    <Select options={resolutionData.data?.data.map((resolution) => ({ value: resolution.key, label: resolution.key }))} placeholder="Select resolution" />
                </Form.Item>
                <Form.Item<AdvandedConfig>
                    required={false}
                    label="Max stream"
                    name="max_stream"
                    rules={[{ required: true }]}

                >
                    <Input placeholder="Enter max stream" />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default CreateAdvandedConfig
