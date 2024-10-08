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
      <Modal destroyOnClose={true}
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
              id="actionTableButton"
              style={{ fontSize: "small" }}
              disabled={hasProvider(viewDetail)}
              className={`${classBtn} `}
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
              id="btn_action"
              disabled={hasProvider(editForm)}
              className={`${classBtn} !border-blue-600 !text-blue-600`}
              icon={<EditFilled />}
              onClick={() => showModal("Edit")}
            ></Button>
          </Tooltip>
        )}

        {deleteForm == undefined ? (
          <></>
        ) : (
          <Tooltip title={t("delete")} className="!text-sm">
            <Button
              id="btn_action"
              disabled={hasProvider(deleteForm)}
              className={`${classBtn}  !border-red-600 !text-red-600`}
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
              style={{ fontSize: "small !important" }}
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
