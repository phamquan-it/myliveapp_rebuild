import { Button } from "antd";
import React from "react";
import { useTranslations } from "use-intl";
interface DeleteFormProps {
  onCancel: () => void;
  onDelete: () => void;
}
const DeleteForm: React.FC<DeleteFormProps> = ({ onCancel, onDelete }) => {
  const t = useTranslations("MyLanguage");
  return (
    <>
      <div className="flex gap-1 justify-end">
        <Button type="default" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button type="primary" danger onClick={onDelete}>
          {t("accept")}
        </Button>
      </div>
    </>
  );
};
export default DeleteForm;
