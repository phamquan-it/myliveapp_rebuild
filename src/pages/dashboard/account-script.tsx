import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal, Table } from "antd";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { webdockConfig } from "../../../WEBDOCK_PROVIDER/APIRequest/config";
import Title from "antd/es/typography/Title";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UpdateAccountScript from "@/components/admin/vps/update-account-script";
import SearchInput from "@/components/filters/SearchInput";


const Page = () => {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (cell: string, record: any, index: number) => {
                console.log('cell', cell)
                console.log('record', record)
                console.log('index', index)
                return index + 1
            }
        },
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
            title: 'Filename',
            dataIndex: 'filename',
            key: 'filename',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (text: any, record: any) => (<div className="flex gap-1">
                <Button type="primary" icon={<EditFilled />} onClick={() => {
                    setAccountScript(record);
                }}></Button>

                <Button icon={<DeleteFilled />} danger onClick={() => {
                    delteteAccountScriptMutation.mutate(text)
                }}></Button>

            </div>),
        },

    ];
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const hideModalUpdate = () => {
        setIsModalUpdateOpen(false);
    }
    const [accountScript, setAccountScript] = useState<any>(undefined)
    useEffect(() => {
        if (accountScript != undefined)
            setIsModalUpdateOpen(true)
    }, [accountScript])

    const [openModal, setOpenModal] = useState(false)
    const { data, isFetching, isError } = useQuery({
        queryKey: ['publicScript', openModal], queryFn: () =>
            axios.get('https://api.webdock.io/v1/account/scripts', webdockConfig)
    });


    const showCreatePopup = () => {
        setOpenModal(true)
    }
    const hideCreatePopup = () => {
        setOpenModal(false)
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        createAccountScriptMutaion.mutate(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const createAccountScriptMutaion = useMutation({
        mutationFn: (data) => axios.post("https://api.webdock.io/v1/account/scripts", data, webdockConfig),
        onSuccess: () => {
            hideCreatePopup()
            message.success("Create account script ok")
        },
        onError: () => {
            hideCreatePopup()
            message.error("Create account script no ok")
        }
    });
    const delteteAccountScriptMutation = useMutation({
        mutationFn: (data) => axios.delete(`https://api.webdock.io/v1/account/scripts/${data}`, webdockConfig),
        onSuccess: () => {
            message.success("Delete account script ok")
        },
        onError: () => {
            message.error("Delete account script no ok")
        }
    });
    const vpsList = useQuery({ queryKey: ['queryKey'], queryFn: () => axios.get("https://api.webdock.io/v1/servers", webdockConfig) });

    return (
        <>
            <div className="flex justify-between my-2">
                <div>
                    <SearchInput/>
                </div>
                <Button type="primary" icon={<PlusCircleFilled />} iconPosition="end" onClick={showCreatePopup}>
                    Create
                </Button>
            </div>

            <Modal title="Update" open={isModalUpdateOpen} footer={[]} onCancel={hideModalUpdate} destroyOnClose={true}>
                <UpdateAccountScript accountScript={accountScript} />
            </Modal>

            <Modal title="Create" open={openModal} footer={null} onCancel={() => {
                setOpenModal(false)
            }}>

                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Filename"
                        name="filename"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea placeholder="" allowClear autoSize />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>



            <Table className='border rounded overflow-hidden shadow'
                pagination={{
                    pageSize: 20
                }}
                expandable={{
                    expandedRowRender: (record: any) => <Input.TextArea placeholder="" allowClear value={record.content} readOnly autoSize />,
                    rowExpandable: (record) => record.content !== undefined,
                }}
                dataSource={data?.data.map((script: any, index: number) => ({ ...script, key: index + 1 }))} columns={columns} loading={isFetching} />
        </>
    );
}
export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}

