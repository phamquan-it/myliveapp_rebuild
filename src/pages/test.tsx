import VpsHideOption from '@/components/vps/VpsOption';
import { Button, Form, Input, Modal, Table, Upload, UploadProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useRouter } from 'next/router';
import { TbEyeEdit } from 'react-icons/tb';
import qs from 'query-string';
import { stringify } from 'querystring';
import { NextPage } from 'next';
import Title from 'antd/es/typography/Title';
import ModalApp from '@/components/app/ModalApp';
import { useEffect, useState } from 'react';
import { TablePaginationConfig, TableProps, message } from 'antd/lib';
import { UploadOutlined } from '@ant-design/icons';
import GenericTable from '@/components/app/GenericTable';
export interface ServerConfig {
    key?: number;
    slug?: string;
    name?: string;
    date?: string;
    location?: string;
    image?: string;
    profile?: string;
    ipv4?: string;
    ipv6?: string;
    status?: "provisioning" | "stopped" | "stopping" | "starting" | "running"; // you can add other statuses if needed
    virtualization?: "container" | "kvm"; // assuming it can either be a container or a virtual machine
    webServer?: "Apache" | "Nginx"; // assuming you might want to include other web servers
    aliases?: string[];
    snapshotRunTime?: number;
    description?: string;
    WordPressLockDown?: boolean;
    SSHPasswordAuthEnabled?: boolean;
    notes?: string;
    nextActionDate: string;
}

interface PageProps {
    modal?: any;
}
interface User {
  id: number;
  name: string;
  email: string;
}

const userColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];

const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

const Page: NextPage<PageProps> = ({ modal }) => {
    const router = useRouter();
    const [openModal, setOpenModal, syncObjectToUrl] =  modal;
    const dataSource: ServerConfig[] = [
        {
            key: 1,
            aliases: [],
            date: '',
            description: '',
            image: '',
            ipv4: '',
            ipv6: '',
            location: '',
            name: '',
            nextActionDate: '',
            notes: '',
            profile: '',
            slug: '',
            snapshotRunTime: 1,
            status: 'provisioning',
            virtualization: 'container',
            webServer: 'Apache',
            SSHPasswordAuthEnabled: true,
            WordPressLockDown: false
        },
    ];

    const columns: ColumnType<ServerConfig>[] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => index + 1
        }, {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'name',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'IPv4',
            dataIndex: 'ipv4',
            key: 'address',
        },
        {
            title: 'CreateAt',
            dataIndex: 'date',
            key: 'createAt',
        },
        {
            title: 'Profile',
            dataIndex: 'profile',
            key: 'profile',
        },
        {
            title: "OS",
            dataIndex: "image",
            key: "image"
        },
        {
            title: "Action",
            dataIndex: "slug",
            key: "slug",
            render: (text, record, index) => (
                <>
                    <Button type="primary" icon={<TbEyeEdit />}></Button>
                </>
            )
        }
    ];
    const [openKey, setOpenKey] = useState('');
    useEffect(() => {
        if (openKey != '')
            modal[1](true);
    }, [openKey])
    useEffect(() => {
       if(!modal[0]) setOpenKey(''); 
    }, [modal[0]])
  const props: UploadProps = {
          name: 'icon',
          method:'post',
          action: 'https://api.golive365.top/upload',
          headers: {
          },
          onChange(info) {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success("ok");
            } else if (info.file.status === 'error') {
              message.error("error");
            }
          },
        };

        const tableConfig: TableProps = {
            pagination: {
                defaultPageSize: 10,
                total: 50
            } 
        }
        
        useEffect(() => {
         console.log(router); 
      }, [router])
    return <>
        <Title>{}</Title>
        <Table<ServerConfig> dataSource={dataSource} columns={columns} />
        <VpsHideOption />
        <Modal title="Basic Modal" open={modal[0]} onCancel={() => {
            modal[1](false);
        }}>
            <ModalApp contents={[
                {
                    key: 'create',
                    component: <>


                        <Form
                            name="basic"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                        </Form>
                        );
                    </>

                },
                {
                    key: 'update',
                    component: <h1>Update</h1>
                },
                {
                    key: 'delete',
                    component: <h1>Delete</h1>
                }]} openKey={openKey} />
        </Modal>
        <Button type="primary" onClick={() => setOpenKey('create')}>Create</Button>
        <Button type="primary" onClick={() => setOpenKey('update')}>Update</Button>
        <Button type="primary" onClick={() => setOpenKey('delete')}>Delete</Button>
        <Button type="primary" onClick={() => {

            const obj = {
                key: '1',
                name: 'test',
                age: '27'
            }
            syncObjectToUrl(obj,'/test') 
        }}>GetObject</Button>

              
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <GenericTable<User> columns={userColumns} data={userData} pagination={{
            current: 3,
            total: 50,
            }} /> 

    </>
}

export default Page
