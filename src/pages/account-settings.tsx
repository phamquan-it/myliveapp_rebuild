import React, { useMemo, useState } from 'react';
import { Alert, Button, Checkbox, Divider, Form, Image, Input, Result, Select, Tabs } from 'antd';
import { InfoCircleOutlined, KeyOutlined, LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

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
    <Tabs tabBarExtraContent={operations}   items={[
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
                    <Input placeholder="Address" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Fund" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                <Form.Item label="" name="" >       
                    <Input placeholder="Is active" size='middle' className='bg-transparent border-0' style={{paddingBottom: 8, paddingTop: 8}}/>
                </Form.Item>
                
            </Form>
            <Alert showIcon message="Success Text" type="info" description="" />
            <div className='mt-auto pt-8'>
                <Button type="primary">Save changes</Button>
                <Button type="default" className='ms-2'>Reset</Button>
            </div>
           </div>
        </div>
        ),
        key: '1'
    },
    {
        icon: <LockOutlined/>,
        label: `Security`,
        children: (
            <div className='' style={{
                minHeight: 300
            }}>
              
                <Form
                      name="basic"
                      layout='vertical'
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                   
                    >
                      <Form.Item
                        label="Current password"
                        name="username" 
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                      >
                        <Input.Password style={{
                            paddingBottom: 8, paddingTop:8
                        }}/>
                      </Form.Item>
                
                      <Form.Item
                        label="New password" 
                        name="newpassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password style={{
                            paddingBottom: 8, paddingTop:8
                        }} />
                      </Form.Item>
                      <Form.Item
                        label="Confirm new password"
                        name="confirmpassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password  style={{
                            paddingBottom: 8, paddingTop:8
                        }}/>
                      </Form.Item>
                
                      
                
                     <div  className='border-t'>
                     <Title level={4}>
                     &nbsp;
                        <span className='!text-lg'>
                        <KeyOutlined/>
                        </span> &nbsp;
                        Twos-factor authenlication
                     </Title>
                     <div className='flex justify-center'>
                        <div className='text-center'>
                       <div className="flex justify-center">
                       <Button type='primary' className='hover: !border-slate-200' style={{
                            height:40,
                            width: 50,
                            color: "white"
                        }}><LockFilled/></Button>
                       </div >
                        <Title level={4} >Two factor authentication is not enabled yet.</Title>
                        <p className='w-80 text-slate-500 font-light' style={{fontSize:10}}>wo-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. Learn more.</p>
                        </div>
                     </div>
                     </div>
                      <Form.Item className='pt-4'>
                        <div className='absolute bottom-0'>
                            <Button type="primary" htmlType="submit"  style={{
                                height: 35
                            }}>
                            Save changes
                            </Button>
                            <Button type="default" htmlType="reset" className='ms-2'  style={{
                                height: 35
                            }}>
                            Reset
                            </Button>
                        </div>
                      </Form.Item>
                      
                    </Form>
            </div>
        ),
        key: '2'
    },
    {
        icon: <InfoCircleOutlined/>,
        label: "Info",
        children: <Result
            status="info"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button type="primary" key="console">
                Go Console
              </Button>,
              <Button key="buy">Buy Again</Button>,
            ]}
          />,
        key: '3'
    }
  ]}  className='w-2/3 ms-5 bg-slate-50 !p-3 h-4/6 min-h-96 overflow-y-auto'/>
    </div>
        
        
     </div>
  );
};

export default Page;