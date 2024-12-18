import { User } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
interface UserStatisticProps {

}

const UserStatistic: React.FC<UserStatisticProps> = () => {
    const userTotal = useQuery({
        queryKey: ['user-total'],
        queryFn: () => axiosInstance.get("/statistic/get-user-total")
    })


    const [statisticBy, setStatisticBy] = useState('new')
    const userStatistic = useQuery({
        queryKey: ['user-statistic', statisticBy],
        queryFn: () => axiosInstance.get("/statistic/get-newest-user")
    })

    const userRich = useQuery({
        queryKey: ['user-rich', setStatisticBy],
        queryFn: () => axiosInstance.get("/statistic/get-richest-user")
    })


    const t = useTranslations('MyLanguage')
    const columns: ColumnsType<any> = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            width: 70,
            render: (text, record, index) => index + 1
        },
        {
            title: <div className="py-2">
                {t("name")}
            </div>,
            dataIndex: "name",
            key: "name",
            render: (text, record) => (<>
                <div className="font-semibold">{text}</div>
                <span className="text-slate-500" style={{
                    fontSize: 12
                }}>{record?.email}</span>
            </>)
        },

        {
            title: t("fund"),
            dataIndex: "remains",
            key: "remains",
            align: "right",
            render: (text, record) => {
                console.log(record)
                return <span className="font-semibold">{text}$</span>
            }
        },
        {
            title: t("totalmoney"),
            dataIndex: "total",
            key: "total",
            align: "right",
            render: (text) => <span className="font-semibold">{text}$</span>
        }
    ]


    return <>
        <Table<User> loading={userRich.isLoading || userStatistic.isLoading} title={() => (<div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700">
                Users | Total: {userTotal?.data?.data}
            </span>
            <Select className="!w-24" value={statisticBy} options={[
                { value: 'rich', label: <span>Richest</span> },
                { value: 'new', label: <span>Newest</span> }
            ]} onChange={(e) => {
                setStatisticBy(e)
            }} />
        </div>)} dataSource={(statisticBy == 'new') ? userStatistic?.data?.data : userRich?.data?.data} columns={columns}
            pagination={false}
        />
    </>
}

export default UserStatistic
