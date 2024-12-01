import { Platform } from '@/@type';
import axiosInstance from '@/apiClient/axiosConfig';
import { AuthApi } from '@/apiClient/providers/auth';
import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, Select, message } from 'antd';
import React, { useState } from 'react';


export const usePlatformData = (filter: any = {}) => {
    return useQuery({
        queryKey: ['platform', filter],
        queryFn: () => axiosInstance.get('/platform/list?language=en&offset=0&limit=100')
    });
};
export const useUserData = (filter: any) => {
    return useQuery({
        queryKey: ['user', filter],
        queryFn: () => axiosInstance.get('/users?language=en', {
            params: filter
        })
    });
};

export const useVpsData = () => {
    return useQuery({
        queryKey: ['vps'],
        queryFn: () => axiosInstance.get('/list?language=en')
    });
};


interface CreateStreamByAdminProps {

}

const CreateStreamByAdmin: React.FC<CreateStreamByAdminProps> = () => {


    const platformData = usePlatformData({ keyword: '' });
    console.log(platformData)
    const vpsdata = useVpsData()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const [rmtp, setRmtp] = useState('');
    const [ipv4, setIpv4] = useState('')

    type FieldType = {
        key?: string;
        source_link?: string;
        platformId?: number;
        vpsId?: number;
        userId?: string;
        link?: string;
    };
    const createStream = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (data: any) => axiosInstance.post('/autolive-control/create-new-stream', data),
        onSuccess: (res) => {
            message.success("OK");
            setIsModalOpen(false);
        },
        onError: (error) => {
            message.error("No ok!")
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        values.link = rmtp + '/' + values.key;
        createStream.mutate(values);
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const userData = useUserData({})

    return <>
        <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />}></Button>
        <Modal title="Create" footer={[]} open={isModalOpen} onCancel={handleCancel}>

            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Google driver link"
                    name="source_link"
                    initialValue="1pRxAAQHEvelx4jgldOr9Sfwhp4ED20fA"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Stream key"
                    name="key"
                    initialValue="k1wk-bjka-9ht6-yvtt-17s5"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Platform"
                    name="platformId"
                    rules={[{ required: true }]}

                >
                    <Select options={platformData?.data?.data?.platforms?.map((platform: any) => ({
                        label: platform.name,
                        value: platform.id,
                        rmtp: platform.rmtp
                    }))}
                        onChange={(value) => {
                            platformData?.data?.data?.platforms?.forEach((platform: any) => {
                                if (platform.id == value) setRmtp(platform.rmtp)
                            })
                        }} />
                </Form.Item>

            </Form>

        </Modal>
    </>
}

export default CreateStreamByAdmin
