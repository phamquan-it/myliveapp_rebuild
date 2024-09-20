import Title from 'antd/lib/typography/Title';
import React from 'react';
interface StatisticStatusProps {
    value: number,
    order_status: string
}

const StatisticStatus: React.FC<StatisticStatusProps> = ({ value, order_status }) => {

    return <>

        <div className='text-center'>
            <Title className='!my-0' level={3}>{value}</Title>
            <p>{order_status}</p>
        </div>
    </>
}

export default StatisticStatus
