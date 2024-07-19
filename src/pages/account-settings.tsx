import React, { useMemo, useState } from 'react';
import { Alert, Button, Checkbox, Divider, Form, Image, Input, Select, Tabs } from 'antd';
import { InfoCircleOutlined, LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';

const CheckboxGroup = Checkbox.Group;

const operations = <Button>Extra Action</Button>;



const Page: React.FC = () => {
  
  return (
    <div className="flex justify-between items-center" style={{
        width:"100%",
        height:"100vh",
        backgroundColor: "gray"
    }}>
    <div className="p-3 w-full h-full">
    <Tabs tabBarExtraContent={operations} items={[
    {
        icon: <UserOutlined/>,
        label: `Accounts`,
        children: (
        <div>
            <div className='flex gap-1 h-full'>
                <Image preview={false}
                    width={100}
                    className='rounded shadow'
                    src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
                    alt=''
                    />
                <div className='  mt-3'>
                    <div className="flex gap-1 ">
                        <Button type="primary">UPLOAD NEW PHOTO</Button>
                        <Button type="default" danger style={{
                            border: "1px solid teal",
                            fontWeight:"500",
                            color: "teal"
                        }}>Reset</Button>    
                    </div>
                    <p className='mt-2'>Allow jpg, jpeg, png, max size of 800k</p>
                </div>
            </div>
           <div className='py-8'>
           <Form className='grid grid-cols-2 grid-rows-4 gap-2 py-4 px-0' layout='vertical'>
                <Form.Item label="" name="" >       
                    <Input placeholder="Name" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Phone" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Birthday" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Name" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Name" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Name" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                
            </Form>
            <Alert showIcon message="Success Text" type="success" description="" />
            
           </div>
        </div>
        ),
        key: '1'
    },
    {
        icon: <LockOutlined/>,
        label: `Security`,
        children: `Content of tab1`,
        key: '2'
    },
    {
        icon: <InfoCircleOutlined/>,
        label: "Info",
        children: `Content of tab1`,
        key: '3'
    }
  ]} style={{}} className='w-2/3 ms-5 bg-slate-50 !p-3 h-3/4'/>
    </div>
    
     </div>
  );
};

export default Page;