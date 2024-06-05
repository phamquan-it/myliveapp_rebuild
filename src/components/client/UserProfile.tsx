import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Image, Progress, Switch, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/router";
import React from "react";
interface userProfileProps {
  email: string;
  name: string;
  funds: string;
  role: string;
  active: number;
}
const UserProfile: React.FC<userProfileProps> = (props) => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="shadow h-full p-3">
          <div className="flex justify-center">
            <Image
              width={150}
              className="rounded-full shadow-sm border"
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?random`}
              placeholder=""
              alt=""
              preview={false}
            />
          </div>
          <p className="text-center text-base">{props.email}</p>
          <div className="my-3">
            <a
              className="btn border p-3 py-1  bg-blue-500 text-white me-2 hover:shadow-md hover:text-white hover:bg-pink-500 active:text-rose-700"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Trang chủ
            </a>
            <a className="btn border p-3 py-1  bg-blue-500 text-white me-2 hover:shadow-md hover:text-white hover:bg-pink-500 active:text-rose-700">
              Đổi mật khẩu
            </a>
          </div>
          <div>
            <ul className="my-4">
              <li>
                <span className="font-semibold">Full name:</span> {props.name}
              </li>
              <li>
                <span className="font-semibold">Email:</span> {props.email}
              </li>
              <li>
                <span className="font-semibold">Funds:</span> {props.funds}
              </li>
              <li>
                <span className="font-semibold">Role:</span> {props.role}
              </li>
              <li>
                <span className="font-semibold">Active</span>{" "}
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked={props.active == 1}
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2">
          <div className="rounded shadow p-3">
            <div>
              <Title level={5} style={{ marginBottom: 0 }}>
                Số luồng đang chạy
              </Title>
              <Progress
                percent={30}
                size={"small"}
                showInfo={false}
                strokeColor={"rgb(219, 44, 146)"}
              />
            </div>
            <div className="mt-3">
              <Title level={5} style={{ marginBottom: 0 }}>
                Số luồng đã tạo
              </Title>
              <Progress
                percent={30}
                size={"small"}
                showInfo={false}
                strokeColor={"rgb(219, 44, 146)"}
              />
            </div>
          </div>
          <div className="rounded shadow mt-4 p-3">
            <Title level={5}>Lịch sử giao dịch</Title>
            <Table dataSource={[]} bordered>
              <Column title="ID" dataIndex="ID" key="id" />
              <Column
                title="Tên giao dịch"
                dataIndex={"transactionName"}
                key="transactionName"
              />
              <Column title="Ngày bắt đầu" dataIndex="Indate" key="indate" />
              <Column title="Ngày kết thúc" dataIndex="Enddate" key="endate" />
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
