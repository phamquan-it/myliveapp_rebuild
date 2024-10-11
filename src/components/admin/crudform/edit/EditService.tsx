import React, { useState } from "react";
import { Form, Input, Select, Button, Image } from "antd";
import { useTranslations } from "next-intl";
import { StarFilled } from "@ant-design/icons";
import PlatformSelect from "../../PlatformSelect";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";

const { Option } = Select;
interface editServiceProps {
  service: any;
}

const EditService: React.FC<editServiceProps> = ({ service }) => {
  const levels = [
    {
      value: 1,
      label: (
        <div className="flex gap-1">
          1<StarFilled className="!text-orange-400" />{" "}
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className="flex gap-1">
          2<StarFilled className="!text-orange-400" />{" "}
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div className="flex gap-1">
          3<StarFilled className="!text-orange-400" />{" "}
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div className="flex gap-1">
          4<StarFilled className="!text-orange-400" />{" "}
        </div>
      ),
    },
    {
      value: 5,
      label: (
        <div className="flex gap-1">
          5<StarFilled className="!text-orange-400" />{" "}
        </div>
      ),
    },
  ];
  const { data } = useQuery({
    queryKey: ["platform"],
    queryFn: () => axiosClient.get(`/platform/list?language=en`),
  });
  const [platformId, setPlatformId] = useState();
  const [categgoryId, setCateggoryId] = useState();

  const t = useTranslations("DashboardMenu");
  const d = useTranslations("MyLanguage");
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <Form.Item
        label="ID"
        name="id"
        className="md:col-span-3 !hidden"
        rules={[{ required: true }]}
        initialValue={service.service.id}
      >
        <Input
          type="hidden"
          placeholder="Enter ID"
          onChange={() => {
            console.log(service);
          }}
        />
      </Form.Item>
      <PlatformSelect
        props={{ style: { width: 200 } }}
        required={true}
        onChange={(value) => {
          setPlatformId(value);
          console.log(value);
        }}
      />
      <Form.Item
        label={d("name")}
        name="name"
        className="md:col-span-3"
        rules={[{ required: true }]}
        initialValue={service.service.name}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        label={d("minorder")}
        name="min"
        rules={[{ required: true }]}
        initialValue={service.service.min}
      >
        <Input type="number" placeholder="Enter Min" />
      </Form.Item>
      <Form.Item
        label={d("maxorder")}
        name="max"
        rules={[{ required: true }]}
        initialValue={service.service.max}
      >
        <Input type="number" placeholder="Enter Max" />
      </Form.Item>
      <Form.Item label="Level" name={d("level")} rules={[{ required: true }]}>
        <Select placeholder="Select Level" options={levels} />
      </Form.Item>
      <Form.Item
        label={d("rate")}
        name="rate"
        className="md:col-span-3"
        rules={[{ required: true }]}
        initialValue={service.service.rate}
      >
        <Input type="number" placeholder="Enter Rate" />
      </Form.Item>

      <Form.Item
        label={d("initial_rate")}
        name="firstrateconfig"
        rules={[{ required: true }]}
        className="col-span-2"
        initialValue={service.service.initial_rate}
      >
        <Input type="number" placeholder="Enter First Rate Config" />
      </Form.Item>
      <Form.Item
        initialValue={service.service.rate_config}
        label={d("rate_config")}
        name="rateconfig"
        rules={[{ required: true }]}
      >
        <Input type="number" placeholder="Enter Rate Config" />
      </Form.Item>
    </div>
  );
};

export default EditService;
