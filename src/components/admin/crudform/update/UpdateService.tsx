import React, { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import type {
  ConfigProviderProps,
  RadioChangeEvent,
  TableProps,
  TourProps,
  UploadFile,
} from "antd";
import {
  Button,
  Calendar,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Popconfirm,
  QRCode,
  Radio,
  Select,
  Space,
  Table,
  theme,
  TimePicker,
  Tour,
  Transfer,
  Upload,
} from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

dayjs.locale("en");

const UpdateService: React.FC = () => {
  const { token } = theme.useToken();
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    });
  }

  const [targetKeys, setTargetKeys] = useState([]);

  // Handle change event
  const handleChange = (nextTargetKeys: any) => {
    setTargetKeys(nextTargetKeys);
  };
  return (
    <div className="grid">
      <Form.Item label="Transfer" name="transfer">
        <Transfer
          dataSource={mockData}
          showSearch
          targetKeys={targetKeys}
          onChange={handleChange}
          render={(item) => item.title}
          style={{ width: "100%" }} // Set width to 100%
          listStyle={{
            width: "50%",
          }}
        />
      </Form.Item>
    </div>
  );
};

export default UpdateService;
