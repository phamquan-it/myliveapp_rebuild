import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, Select, Spin, message } from 'antd';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import React from 'react';

interface SettingFormProps { }

const SettingForm: React.FC<SettingFormProps> = () => {
    type FieldType = {
        id: number;
        time_update_service: string;
        time_update_order: string;
        time_update_exchange_rate: string;
        exchange_rate_diferences: string;
        what_app: string;
        telegram: string;
        facebook: string;
        phone: string;
        acount_no: string;
        bank_id: number;
    };

    const t = useTranslations('Settings');
    const { data, isFetching, isError } = useQuery({
        queryKey: ['setting'],
        queryFn: () => axiosInstance.get<FieldType>('/setting'),
    });

    const bank = useQuery({
        queryKey: ['bank'],
        queryFn: () => axiosInstance.get<Bank>('/bank'),
    });

    const updateSetting = useMutation({
        mutationKey: ['update_setting'],
        mutationFn: (setting: FieldType) => axiosInstance.patch("/setting/update", setting),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })



    // Only show the form after the data is loaded
    if (isFetching) {
        return <div className="flex justify-center items-center"><Spin /></div>; // Display loading spinner
    }

    if (isError || !data?.data) {
        return <div>Error loading settings data</div>; // Error handling (Optional)
    }

    return (
        <>
            <div className="bg-white rounded-2xl p-5 w-5/6 m-auto">
                <Form className="!font-sans"
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left"
                    initialValues={{
                        ...data.data,
                        time_update_service: moment(data.data.time_update_service, 'HH:mm'),
                        time_update_order: moment(data?.data?.time_update_order, 'HH:mm'),
                        time_update_exchange_rate: moment(data.data.time_update_exchange_rate, 'HH:mm'),
                        exchange_rate_diferences: moment(data.data.exchange_rate_diferences, 'HH:mm'),
                    }}
                    onFinish={(values) => {
                        console.log('Submitted values:', values);
                        updateSetting.mutate(values)
                    }}
                >
                    <Form.Item<FieldType>
                        label={<span className="font-medium">{t('timeupdateservice')}</span>}
                        name="time_update_service"
                        rules={[{ required: true }]}
                        required={false} 
                    >
                        <DatePicker
                            picker="time"
                            className="w-full"
                            format="HH:mm"
                            showTime={{ format: 'HH:mm' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false} 
                        label={<span className="font-medium">{t('timeupdateorder')}</span>}
                        name="time_update_order"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            picker="time"
                            className="w-full"
                            format="HH:mm"
                            showTime={{ format: 'HH:mm' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">WhatsApp</span>}
                        name="what_app"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="WhatsApp" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">Facebook</span>}
                        name="facebook"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Facebook" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">{t('timeupdaterate_hour')}</span>}
                        name="time_update_exchange_rate"
                        rules={[{ required: true }]}
                    >
                        <DatePicker
                            picker="time"
                            className="w-full"
                            format="HH:mm"
                            showTime={{ format: 'HH:mm' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label={<span className="font-medium">{t('exchangeratediffernces')}</span>}
                        name="exchange_rate_diferences"
                        rules={[{ required: true }]}
                        required={false}
                    >
                        <DatePicker
                            picker="time"
                            className="w-full"
                            format="HH:mm"
                            showTime={{ format: 'HH:mm' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">{('Phone')}</span>}
                        name="phone"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Phone" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">{('Telegram')}</span>}
                        name="telegram"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Telegram" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">{t('bank')}</span>}
                        name="bank_id"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="bank">
                            <Select.Option value="mb">MB Bank</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        required={false}
                        label={<span className="font-medium">{t('accountname')}</span>}
                        name="account_name"
                        rules={[{ required: true }]}
                        initialValue="PHAM TOAN THANG"
                    >
                        <Input placeholder="" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        required={false}
                        label={<span className="font-medium">{t('accountnumber')}</span>}
                        name="acount_no"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Account Number" />
                    </Form.Item>

                    <Form.Item
                        required={false}
                        wrapperCol={{ offset: 6, span: 16 }}
                        className="flex justify-end"
                    >
                        <Button
                            loading={updateSetting.isPending}
                            type="primary"
                            htmlType="submit"
                            className="me-5"
                        >
                            {t('update')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default SettingForm;

