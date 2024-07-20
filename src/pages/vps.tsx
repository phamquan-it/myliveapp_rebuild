import React, { useState } from 'react';
import { Button, Form, Input, List, Modal, Select, Table, Tabs, TabsProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { AndroidFilled, KeyOutlined, PlusCircleFilled } from '@ant-design/icons';

const { TabPane } = Tabs;



const CustomTabs = (items: any) => {
  return (
    <Tabs defaultActiveKey="item-1" className='min-h-full' tabPosition='bottom'>
        {items.items.map((item: any) => (
          <TabPane tab={item.label} key={item.key} icon={item.icon}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
  );
};

const App = () => {
   const [openModal,setOpenModal] = useState(false)
   const hideModal = ()=>{ 
    setOpenModal(false)
   }
  const items:any = [
    { label: 'Live Vps' , key: 'item-1', children: (
      <div className='p-4 h-full'>
        <Title level={2} className='!text-slate-700'>Live Vps</Title>
        <div className='flex justify-between my-2'>
            <div className='flex gap-1'>
                <Input placeholder="Search..." />
                <div>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="CPU"
                   /> 
                </div>
            </div>
            <div>
                <Modal title="Create" open={openModal} onCancel={hideModal} confirmLoading={true} okText="Accept">
                  
                    <Form
                          name="basic"
                          layout={"vertical"}
                          initialValues={{ remember: true }}
                        >
                            <Form.Item label="Provider" name="" initialValue={1}>
                                <Select
                                  showSearch
                                  placeholder="Provider"
                                  options={[{
                                    label:"Webdock",
                                    value:1
                                  }]}
                                  />
                            </Form.Item>
                          <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Slug"
                            name="slug"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                            <Input />
                          </Form.Item>
                          <div className='grid grid-cols-2 gap-2'>
                          <Form.Item
                            label="Location"
                            name="slug"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Virtualization"
                            name="slug"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                              <Select
                                showSearch
                                placeholder=""
                               />
                          </Form.Item>
                          
                          </div>
                          <Form.Item
                            label="Profile slug"
                            name="slug"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                              <Select
                                showSearch
                                placeholder=""
                               />
                          </Form.Item>
                          <Form.Item
                            label="Image slug"
                            name="slug"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                          >
                              <Select
                                showSearch
                                placeholder=""
                               />
                          </Form.Item>    
                        </Form>
                </Modal>
                
                <Button type="primary" icon={<PlusCircleFilled/>} iconPosition='end' onClick={()=>{
                    setOpenModal(true)
                }}>Create</Button>
            </div>
        </div>
        <Table bordered className='' dataSource={[
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              style:{color:"red"},
              age: 42,
              address: '10 Downing Street',
            },
          ]} columns={[
            {
                title: 'Slug',
                dataIndex: 'slug',
                key: 'slug',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Location',
              dataIndex: 'location',
              key: 'location',
            },
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
            },
            {
                title: 'Profile',
                dataIndex: 'profile',
                key: 'profile',
            },
            {
                title: 'Ipv4',
                dataIndex: 'ipv4',
                key: 'ipv4',
            },
          ]} pagination={{ position: ["bottomCenter"] }}/>
      </div>
    ) },
    { label: 'Public key' , key: 'item-2', children: (
        <div className='p-3'>
            <Title level={3}>Public key</Title>
            <div className="flex mb-2 justify-between">
                <div>
                <Input placeholder="Search..."/>
                </div>
                <Button type="primary" icon={<PlusCircleFilled/>} iconPosition='end'>Create</Button>
                
            </div>
            <Table bordered dataSource={[
              {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
              },
              {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
              },
            ]} columns={[
              {
                title: 'No.',
                dataIndex: 'key',
                key: 'key',
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Key',
                dataIndex: 'key',
                key: 'key',
              },
              {
                title: 'CreateAt',
                dataIndex: 'created',
                key: 'created',
              },
            ]} />
        </div>
    ) },
    { label: 'Shell Users', key: 'item-3', children: (
        <div className='p-3'>
            <Title level={3}>Shell Users</Title>
            <div className="flex mb-2 justify-between">
                <div>
                <Input placeholder="Search..."/>
                </div>
                <Button type="primary" icon={<PlusCircleFilled/>} iconPosition='end'>Create</Button>
                
            </div>
            <Table bordered dataSource={[
              {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
              },
              {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
              },
            ]} columns={[
              {
                title: 'No.',
                dataIndex: 'key',
                key: 'key',
              },
              {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
              },
              {
                title: 'Shell',
                dataIndex: 'shell',
                key: 'shell',
              },
              {
                title: 'CreateAt',
                dataIndex: 'created',
                key: 'created',
              },
            ]} 
            expandable={{
                expandedRowRender: (record) => (
                    <div>
                     <List
                        itemLayout="horizontal"
                        dataSource={[
                            {
                              title: 'Ant Design Title 1',
                            },
                            {
                              title: 'Ant Design Title 2',
                            },
                            {
                              title: 'Ant Design Title 3',
                            },
                            {
                              title: 'Ant Design Title 4',
                            },
                          ]}
                        renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />

                    </div>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
              }}
            />
        </div>
    ) },
    { label: 'Script library', key: 'item-4', children: (
        <div className='p-3'>
            <Title level={3}>Script library</Title>
            <div className="flex mb-2 justify-between">
                <div>
                <Input placeholder="Search..."/>
                </div>
                <Button type="primary" icon={<PlusCircleFilled/>} iconPosition='end'>Create</Button>
                
            </div>
            <Table bordered dataSource={[
              {
                key: '1',
                name: 'Mike',
                age: 32,
                address: '10 Downing Street',
              },
              {
                key: '2',
                name: 'John',
                age: 42,
                address: '10 Downing Street',
              },
            ]} columns={[
              {
                title: 'No.',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'File name',
                dataIndex: 'filename',
                key: 'filename',
              },
              {
                title: 'Content',
                dataIndex: 'content',
                key: 'content',
              },
            ]}
           
            />
        </div>
    ) },
  ];

  return (
    <div style={{
        backgroundColor: "gray"
    }} className=" h-screen flex items-end justify-end">
      <div className="h-5/6 bg-white px-3 w-5/6" id='reverse_tabs'>
      <CustomTabs items={items} />
      </div>
    </div>
  );
};

export default App;