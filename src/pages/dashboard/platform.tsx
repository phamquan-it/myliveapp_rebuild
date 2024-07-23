import React, { useState } from 'react';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { PlatformModel } from '@/libs/redux/api/models/platform.model';
import { useCreatePlatformMutation, useDeletePlatformMutation, useGetPlatformListQuery, useUpdatePlatformMutation } from '@/libs/redux/api/platform.api';


const PlatformList = () => {
  const { data, error, isLoading } = useGetPlatformListQuery();
  const [createPlatform] = useCreatePlatformMutation();
  const [updatePlatform] = useUpdatePlatformMutation();
  const [deletePlatform] = useDeletePlatformMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<PlatformModel | null>(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'RTMP',
      dataIndex: 'rmtp',
      key: 'rmtp',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any, record:any) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleCreate = async (values: { name: string, rmtp: string }) => {
    try {
      await createPlatform(values).unwrap();
      message.success('Platform created successfully');
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to create platform');
    }
  };

  const handleUpdate = async (values: { name: string, rmtp: string }) => {
    if (!editingPlatform) return;
    try {
      await updatePlatform({ id: editingPlatform.id, ...values }).unwrap();
      message.success('Platform updated successfully');
      setEditingPlatform(null);
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to update platform');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlatform({ id }).unwrap();
      message.success('Platform deleted successfully');
    } catch (error) {
      message.error('Failed to delete platform');
    }
  };

  const handleEdit = (platform: PlatformModel) => {
    setEditingPlatform(platform);
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" icon={<PlusCircleFilled />} onClick={() => setIsModalOpen(true)}>Create Platform</Button>
      <Table dataSource={data} columns={columns} loading={isLoading} />

      <Modal
        title={editingPlatform ? "Edit Platform" : "Create Platform"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          initialValues={editingPlatform || { name: '', rmtp: '' }}
          onFinish={editingPlatform ? handleUpdate : handleCreate}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the platform name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rmtp"
            label="RTMP"
            rules={[{ required: true, message: 'Please input the RTMP URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingPlatform ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PlatformList;
