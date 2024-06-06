import React, { ReactNode, useEffect, useState } from "react";
import { Button, Modal, Space, Tooltip } from "antd";
import {
  EditFilled,
  DeleteFilled,
  EyeFilled,
  SyncOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";
interface TableActionProps {
  editForm?: ReactNode;
  viewDetail?: ReactNode;
  deleteForm?: ReactNode;
  syncFunc?: () => void;
  openState: boolean;
}

const TableAction: React.FC<TableActionProps> = ({
  editForm,
  viewDetail,
  deleteForm,
  syncFunc,
  openState,
}) => {
  useEffect(() => {
    setIsModalVisible(false);
  }, [openState]);
  const [isModalVisible, setIsModalVisible] = useState(openState);
  const [activeButton, setActiveButton] = useState("");

  const showModal = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const classBtn = "!py-2";
  const hasProvider = (component: ReactNode | Function) => {
    return component == undefined;
  };
  const t = useTranslations("MyLanguage");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Modal
        title={`Modal for ${activeButton}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {activeButton == "Delete"
          ? deleteForm
          : activeButton == "Edit"
          ? editForm
          : viewDetail}
      </Modal>
      <Space>
        <Tooltip title={t("view_detail")}>
          <Button
            disabled={hasProvider(viewDetail)}
            className={`${classBtn}`}
            icon={<EyeFilled />}
            onClick={() => showModal("View Details")}
          ></Button>
        </Tooltip>

        <Tooltip title={t("edit")}>
          <Button
            disabled={hasProvider(editForm)}
            type="primary"
            className={`${classBtn} !bg-green-600`}
            icon={<EditFilled />}
            onClick={() => showModal("Edit")}
          ></Button>
        </Tooltip>

        <Tooltip title={t("delete")}>
          <Button
            disabled={hasProvider(deleteForm)}
            className={`${classBtn}`}
            type="primary"
            danger
            icon={<DeleteFilled />}
            onClick={() => showModal("Delete")}
          ></Button>
        </Tooltip>

        <Tooltip title={t("sync")}>
          <Button
            disabled={hasProvider(syncFunc)}
            className={`${classBtn}`}
            type="primary"
            icon={<SyncOutlined />} // Add the reload icon
            // onClick={handleReload}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  );
};

export default TableAction;
