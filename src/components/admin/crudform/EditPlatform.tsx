import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import { Button } from "antd/lib";

const EditPlatForm = () => {
  return (
    <>
      <Form.Item label="ID">
        <Input placeholder="id" disabled />
      </Form.Item>
      <Form.Item label="Title">
        <Input placeholder="Enter title" />
      </Form.Item>
      <Form.Item label="Upload File" name="file">
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};
export default EditPlatForm;
