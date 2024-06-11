import Title from "antd/es/typography/Title";
import React from "react";
interface HistoryStatiticalProps {
  monney?: number;
  info?: string;
  color?: string;
}
const HistoryStatitical: React.FC<HistoryStatiticalProps> = ({
  monney,
  info,
  color,
}) => {
  return (
    <>
      <div
        className=" rounded-md p-4 py-6 gap-1 flex"
        style={{
          backgroundColor: color,
        }}
      >
        <div
          className="bg-white h-14 w-14 flex justify-center items-center rounded-full text-2xl"
          style={{
            color: color,
          }}
        >
          <span className="text-2xl">$</span>
        </div>
        <ul>
          <li>
            <Title level={5} className="!text-white !mb-0">
              {monney} USD
            </Title>
          </li>
          <li className="text-sm text-white">{info}</li>
        </ul>
      </div>
    </>
  );
};
export default HistoryStatitical;
