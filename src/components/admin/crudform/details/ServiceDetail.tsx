import React from "react";
import { Form, Input, Switch, Select } from "antd";

const { Option } = Select;

const ServiceDetail: React.FC = () => {
  return (
    <div style={{}}>
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter Name" readOnly />
        </Form.Item>
        <div className="grid grid-cols-3 gap-1">
          <Form.Item
            label="Original Name"
            name="name_original"
            className="col-span-2"
          >
            <Input placeholder="Enter Original Name" readOnly />
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <Input placeholder="Enter Rate" readOnly />
          </Form.Item>
        </div>
        <Form.Item label="Initial Rate" name="initial_rate">
          <Input placeholder="Enter Initial Rate" readOnly />
        </Form.Item>
        <div className="grid grid-cols-5 gap-2">
          <Form.Item label="Min" name="min">
            <Input placeholder="Enter Min" readOnly />
          </Form.Item>
          <Form.Item label="Max" name="max">
            <Input placeholder="Enter Max" readOnly />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch disabled />
          </Form.Item>
          <Form.Item label="Dripfeed" name="dripfeed">
            <Input placeholder="Enter Dripfeed" readOnly />
          </Form.Item>
          <Form.Item label="Refill" name="refill">
            <Input placeholder="Enter Refill" readOnly />
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter Description" readOnly />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter Description" readOnly />
        </Form.Item>
        {/* Add other form fields here */}
      </Form>
    </div>
  );
};

export default ServiceDetail;
