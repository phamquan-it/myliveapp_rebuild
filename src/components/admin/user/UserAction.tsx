import { EditFilled } from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import UpdateUserInfo from './UpdateUserInfo';
interface UserActionProps {

}

const UserAction: React.FC<UserActionProps> = () => {
    const t = useTranslations('MyLanguage')
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t('update_info'),
            children: <UpdateUserInfo/>,
        },
        {
            key: '2',
            label: t('change_password'),
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: t('update_servive_price'),
            children: 'Content of Tab Pane 3',
        },
    ];
    return <>

        <Button type="default" style={{
            border: '1px solid green'
        }} icon={<EditFilled style={{
            color: 'green'
        }} />} onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Update user" open={isModalOpen} footer={[]} onCancel={handleCancel} width={700}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
    </>
}

export default UserAction
