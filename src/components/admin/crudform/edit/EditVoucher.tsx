import { DatePicker, Form, Input, Switch } from "antd";
import React from "react";
interface EditVoucherProps {
  value: any;
}
const EditVoucher: React.FC<EditVoucherProps> = ({ value }) => {
  return (
    <>
      <Form.Item
        label="Id"
        name="id"
        className="hidden"
        rules={[{ required: true, message: "Please enter a id" }]}
        initialValue={value.id}
      >
        <Input
          onChange={() => {
            console.log(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}
        initialValue={value.name}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Min Price"
        name="minPrice"
        rules={[
          {
            required: true,
            type: "number",
            message: "Please enter a valid min price",
          },
        ]}
        initialValue={value.minPrice}
      >
        <Input type="number" />
      </Form.Item>

      <div className="grid md:grid-cols-2">
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select a start time" }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select an end time" }]}
        >
          <DatePicker showTime />
        </Form.Item>
      </div>

      <Form.Item
        label="Discount Percentage"
        name="discountPercentage"
        initialValue={value.discountPercentage}
        rules={[
          {
            required: true,
            type: "number",
            message: "Please enter a valid discount percentage",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <div className="grid grid-cols-3 gap-2">
        <Form.Item
          initialValue={value.code}
          label="Code"
          name="code"
          className="col-span-2"
          rules={[{ required: true, message: "Please enter a code" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={value.isActive == 1}
          label="Status"
          name="status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </div>
    </>
  );
};
export default EditVoucher;
