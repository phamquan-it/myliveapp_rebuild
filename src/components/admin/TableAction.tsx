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
        title={`${activeButton}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {activeButton == "Delete"
          ? deleteForm
          : activeButton == "Edit"
          ? editForm
          : viewDetail}
      </Modal>
      <Space>
        {viewDetail == undefined ? (
          ""
        ) : (
          <Tooltip title={t("view_detail")}>
            <Button
              disabled={hasProvider(viewDetail)}
              className={`${classBtn} !text-sm `}
              icon={<EyeFilled />}
              onClick={() => showModal("View Details")}
            ></Button>
          </Tooltip>
        )}
        {editForm == undefined ? (
          <></>
        ) : (
          <Tooltip title={t("edit")}>
            <Button
              disabled={hasProvider(editForm)}
              type="primary"
              className={`${classBtn} !bg-green-600 !text-sm`}
              icon={<EditFilled />}
              onClick={() => showModal("Edit")}
            ></Button>
          </Tooltip>
        )}

        {deleteForm == undefined ? (
          <></>
        ) : (
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
        )}

        {syncFunc == undefined ? (
          <></>
        ) : (
          <Tooltip title={t("sync")}>
            <Button
              disabled={hasProvider(syncFunc)}
              className={`${classBtn} !text-sm`}
              type="primary"
              icon={<SyncOutlined />} // Add the reload icon
              // onClick={handleReload}
            ></Button>
          </Tooltip>
        )}
      </Space>
    </div>
  );
};

export default TableAction;
