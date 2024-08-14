import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';


export const usePlatformData = () => {
    return useQuery({
        queryKey: ['platform'],
        queryFn: () => axiosInstance.get('/platform/list?language=en')
    });
};
export const useUserData = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/users?language=en')
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
    
    const platformData = usePlatformData();
    const vpsdata = useVpsData()
    const userData = useUserData()
    console.log("api user",userData?.data?.data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }



    type FieldType = {
        key?: string;
        platformId?: number;
        vpsId?: number;
        userId?: string;
        link?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <>
        <Button type="primary" onClick={showModal}>Create new stream</Button>
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
                    label="Stream key"
                    name="key"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Link"
                    name="link"
                    rules={[{ required: true }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="User"
                    name="userId"
                    rules={[{ required: true }]}
                >
                    <Select options={userData?.data?.data.map((user: any) => ({ label: user.email, value: user.id }))} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Vps"
                    name="vpsId"
                    rules={[{ required: true }]}
                >

                    <Select options={vpsdata?.data?.data?.data.map((vps: any) => ({ label: vps.hostname, value: vps.vpsProvider }))} />

                </Form.Item>
                <Form.Item<FieldType>
                    label="Platform"
                    name="platformId"
                    rules={[{ required: true }]}
                >
                    <Select options={platformData?.data?.data?.platforms.map((platform: any) => ({ label: platform.name, value: platform.id }))} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    </>
}

export default CreateStreamByAdmin
