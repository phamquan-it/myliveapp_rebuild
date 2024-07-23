import React, { useEffect } from 'react';
import { Alert, Button, Form, Image, Input, message, Result, Tabs, Upload } from 'antd';
import { InfoCircleOutlined, KeyOutlined, LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { TbLogout } from 'react-icons/tb';
import { useGetUserInfoQuery, useLogoutMutation } from '@/libs/redux/api/auth.api';
import { useRouter } from 'next/router';

export const UserSetting: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const { data, isFetching, isError } = useGetUserInfoQuery();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        role: data.role,
        email: data.email,
        address: data.address,
        remains: data.remains,
        isActive: data.isActive ? 'Active' : 'Inactive',
      });
    }
  }, [data, form]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      message.success('Logout successful');
      router.push('/');
    } catch (error) {
      message.error('Failed to logout');
    }
  };

  const operations = (
    <Button icon={<TbLogout />} loading={isLoading} onClick={handleLogout}>
      Logout
    </Button>
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs
        tabBarExtraContent={operations}
        items={[
          {
            icon: <UserOutlined />,
            label: `Accounts`,
            children: (
              <div>
                <div className="flex gap-1 h-full">
                  <Image
                    preview={false}
                    width={100}
                    className="rounded shadow"
                    src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
                    alt=""
                  />
                  <div className="mt-3">
                    <div className="flex gap-1">
                      <Upload>
                        <Button type="primary">UPLOAD NEW PHOTO</Button>
                      </Upload>
                      <Button
                        type="default"
                        danger
                        style={{
                          border: '1px solid teal',
                          fontWeight: '500',
                          color: 'teal',
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    <p className="mt-2">Allow jpg, jpeg, png, max size of 800k</p>
                  </div>
                </div>
                <div className="py-8">
                  <Form
                    form={form}
                    className="grid grid-cols-2 grid-rows-4 gap-2 py-4 px-0"
                    layout="vertical"
                  >
                    <Form.Item label="" name="name">
                      <Input placeholder="Name" size="middle" style={{ paddingBottom: 8, paddingTop: 8 }} />
                    </Form.Item>
                    <Form.Item label="" name="role">
                      <Input placeholder="Role" size="middle" style={{ paddingBottom: 8, paddingTop: 8 }} />
                    </Form.Item>
                    <Form.Item label="" name="email">
                      <Input placeholder="Email address" size="middle" style={{ paddingBottom: 8, paddingTop: 8 }} />
                    </Form.Item>
                    <Form.Item label="" name="address">
                      <Input placeholder="Address" size="middle" style={{ paddingBottom: 8, paddingTop: 8 }} />
                    </Form.Item>
                    <Form.Item label="" name="remains">
                      <Input
                        readOnly
                        placeholder="Remains"
                        size="middle"
                        style={{ paddingBottom: 8, paddingTop: 8 }}
                      />
                    </Form.Item>
                    <Form.Item label="" name="isActive">
                      <Input
                        placeholder="Is active"
                        readOnly
                        size="middle"
                        style={{ paddingBottom: 8, paddingTop: 8 }}
                      />
                    </Form.Item>
                  </Form>
                  <Alert showIcon message="Success Text" type="info" description="" />
                  <div className="mt-auto pt-8">
                    <Button type="primary">Save changes</Button>
                    <Button type="default" className="ms-2">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            ),
            key: '1',
          },
          {
            icon: <LockOutlined />,
            label: `Security`,
            children: (
              <div className="" style={{ minHeight: 300 }}>
                <Form
                
                  name="basic"
                  layout="vertical"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Current password"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                  >
                    <Input.Password style={{ paddingBottom: 8, paddingTop: 8 }} />
                  </Form.Item>

                  <Form.Item
                    label="New password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                  >
                    <Input.Password style={{ paddingBottom: 8, paddingTop: 8 }} />
                  </Form.Item>
                  <Form.Item
                    label="Confirm new password"
                    name="confirmNewPassword"
                    rules={[{ required: true, message: 'Please confirm your new password!' }]}
                  >
                    <Input.Password style={{ paddingBottom: 8, paddingTop: 8 }} />
                  </Form.Item>

                  <div className="border-t">
                    <Title level={4}>
                      &nbsp;
                      <span className="!text-lg">
                        <KeyOutlined />
                      </span>
                      &nbsp; Two-factor authentication
                    </Title>
                    <div className="flex justify-center">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <Button
                            type="primary"
                            className="hover: !border-slate-200"
                            style={{ height: 40, width: 50, color: 'white' }}
                          >
                            <LockFilled />
                          </Button>
                        </div>
                        <Title level={4}>Two-factor authentication is not enabled yet.</Title>
                        <p className="w-80 text-slate-500 font-light" style={{ fontSize: 10 }}>
                          Two-factor authentication adds an additional layer of security to your account by requiring
                          more than just a password to log in. Learn more.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Form.Item className="pt-4">
                    <div className="absolute bottom-0">
                      <Button type="primary" htmlType="submit" style={{ height: 35 }}>
                        Save changes
                      </Button>
                      <Button type="default" htmlType="reset" className="ms-2" style={{ height: 35 }}>
                        Reset
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            ),
            key: '2',
          },
          {
            icon: <InfoCircleOutlined />,
            label: 'Info',
            children: (
              <Result
                status="info"
                title="Successfully Purchased Cloud Server ECS!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                  <Button type="primary" key="console">
                    Go Console
                  </Button>,
                  <Button key="buy">Buy Again</Button>,
                ]}
              />
            ),
            key: '3',
          },
        ]}
        className="w-full !p-3 h-4/6 overflow-y-auto"
      />
    </div>
  );
};
