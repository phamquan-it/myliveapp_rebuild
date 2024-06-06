import React, { useState, useEffect } from "react";
import { Select, Image, Form, Input, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";

const OrderForm = () => {
  const { data } = useQuery({
    queryKey: ["key"],
    queryFn: () => axiosClient.get("/platform/list?language=en"),
  });

  return (
    <>
      <Form.Item label="Platform" name="" initialValue={1} className="mt-5">
        <Select
          disabled
          className="select-none"
          options={data?.data.data.map((item: any, index: number) => ({
            key: index,
            value: item.id,
            label: (
              <div className="flex items-center gap-2">
                <Image src={item.icon} width={20} alt="" preview={false} />
                {item.name}
              </div>
            ),
          }))}
        />
      </Form.Item>
      <Form.Item
        label="Service name:"
        name="name"
        initialValue={
          "ID:610 Youtube Livestream Views trong 15 phút (Concurrent) Cheapest HQ"
        }
      >
        <Input.TextArea placeholder="" allowClear readOnly />
      </Form.Item>
    </>
  );
};

export default OrderForm;
