import { Tag } from 'antd';
import React from 'react';
interface OrderStateProps {
    orderState?: string
}

const OrderState: React.FC<OrderStateProps> = ({ orderState }) => {
    switch (orderState) {
        case 'Completed':
            return <Tag color="green">{orderState}</Tag>
        case 'In progress':
            return <Tag color="yellow">{orderState}</Tag>
        case 'Canceled':
            return <Tag color="orange">{orderState}</Tag>
        case 'Processing':
            return <Tag color="cyan">{orderState}</Tag>
        case 'Partial':
            return <Tag color="blue">{orderState}</Tag>
        case 'Pending':
            return <Tag color="purple">{orderState}</Tag>
        default:
            return <Tag color="red"></Tag>
    }
}

export default OrderState

