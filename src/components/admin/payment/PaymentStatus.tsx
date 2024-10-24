import { Tag } from 'antd';
import React from 'react';
interface PaymentStatusProps {
    status: string
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status }) => {
    switch (status) {
        case 'pendding':
            return <Tag color="orange">Pendding</Tag>
        case 'inprogress':
            return <Tag color="blue">In progress</Tag>
        case 'completed':
            return <Tag color="green">Completed</Tag>
        default:
            return <Tag color="red">Deny</Tag>
    }
}

export default PaymentStatus

