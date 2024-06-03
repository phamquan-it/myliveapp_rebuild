import {
  FacebookFilled,
  SlackOutlined,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import FastInfo from "./FastInfo";

const FastInfoList = () => {
  const fastList = [
    {
      id: 1,
      title: "FaceBook",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-blue-500",
      icon: <FacebookFilled />,
    },
    {
      id: 2,
      title: "X",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-gray-800",
      icon: <XOutlined />,
    },
    {
      id: 3,
      title: "Tiktok",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-yellow-500",
      icon: <SlackOutlined />,
    },
    {
      id: 4,
      title: "Youtube",
      monney: "$2000",
      dateTitle: "Last 24 hour ago",
      color: "bg-red-500",
      icon: <YoutubeFilled />,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {fastList.map((item) => (
        <FastInfo
          key={item.id}

          title={item.title}
          monney={item.monney}
          dateTitle={item.dateTitle}
          color={item.color}
          icon={item.icon} id={0}        />
      ))}
    </div>
  );
};

export default FastInfoList;
