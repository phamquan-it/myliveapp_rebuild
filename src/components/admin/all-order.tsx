import { Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
interface AllOrderProps {

}

const AllOrder: React.FC<AllOrderProps> = () => {
    return <>
        <Card title="All orders">
            <div className="grid grid-cols-6">
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Completed</p>

                </div>
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Inprogress</p>
                </div>
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Processing</p>
                </div>
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Pendding</p>
                </div>
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Queue</p>
                </div>
                <div>
                    <Title level={3} className="text-center">0</Title>
                    <p className='text-center'>Canceled</p>
                </div>
                <div>

                </div>
            </div>

        </Card>
    </>
}

export default AllOrder
