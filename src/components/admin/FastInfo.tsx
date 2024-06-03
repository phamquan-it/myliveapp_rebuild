import { CalendarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import React, { ReactNode } from "react";

export interface FastInfoProps {
  id: number;
  title: string;
  monney: string;
  dateTitle: string;
  color: string;
  icon: ReactNode;
}

const FastInfo: React.FC<FastInfoProps> = ({
  title,
  monney,
  dateTitle,
  color,
  icon,
}) => {
  return (
    <div
      className="shadow relative rounded"
      style={{ borderTop: "0.2px solid #eee" }}
    >
      <div
        className={`absolute p-5 ${color} z-10 rounded -top-5 left-3 text-white text-2xl`}
      >
        <div className="p-2">{icon}</div>
      </div>
      <div className="text-sm absolute z-20 end-3 top-2 text-gray-400 font-thin">
        {title}
      </div>
      <div title="" className="pt-5 px-2">
        <Title
          level={2}
          className="!font-thin text-end border-b pb-4 pt-3 !text-gray-600"
        >
          {monney}
        </Title>
      </div>
      <div className="pb-4 px-2 text-gray-500 font-thin">
        <CalendarOutlined /> <span>{dateTitle}</span>
      </div>
    </div>
  );
};

export default FastInfo;
