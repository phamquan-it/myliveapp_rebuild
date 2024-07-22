import DashBoardLayout from "@/components/admin/DashBoardLayout";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import moment from "moment";

const Page = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };
  const d = useTranslations("DashboardMenu");
  const t = useTranslations("Settings");
  return (
    <>
      <Title className="!semi-boldb !text-center">{d("Settings")}</Title>
      <div className="bg-white rounded-2xl p-5 w-5/6 m-auto">
        <Form
          name="basic"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelAlign="left"
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={
              <span className="font-medium">{t("timeupdateservice")}</span>
            }
            name="timeupdateservice"
            initialValue={moment("10:00", "HH:mm")}
            rules={[{ required: true }]}
          >
            <DatePicker
              picker="time"
              className="w-full"
              format="HH:mm"
              showTime={{ format: "HH:mm" }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">{t("timeupdateorder")}</span>}
            name="timeupdateorder"
            initialValue={moment("00:10", "HH:mm")}
            rules={[{ required: true }]}
          >
            <DatePicker
              picker="time"
              className="w-full"
              format="HH:mm"
              showTime={{ format: "HH:mm" }}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">WhatsApp</span>}
            name="whatapp"
            rules={[{ required: true }]}
            initialValue={"https://wa.me/+84786861688"}
          >
            <Input placeholder="WhatsApp" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">Facebook</span>}
            name="facebook"
            rules={[{ required: true }]}
            initialValue={"https://www.facebook.com/azseo.nett"}
          >
            <Input placeholder="Facebook" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">{t("timeupdaterate_hour")}</span>
            }
            name="timeupdaterate_hour"
            rules={[{ required: true }]}
            initialValue={2}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">{t("exchangeratediffernces")}</span>
            }
            name="exchangeratereferentces"
            rules={[{ required: true }]}
            initialValue={200}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">{t("bank")}</span>}
            name="bank"
            rules={[{ required: true }]}
            initialValue={"MB bank"}
          >
            <Select placeholder="bank">
              <Select.Option value="mb">MB bank</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="font-medium">{t("accountname")}</span>}
            name="account_name"
            rules={[{ required: true }]}
            initialValue={"PHAM TOAN THANG"}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">{t("accountnumber")}</span>}
            name="account_phone"
            rules={[{ required: true }]}
            initialValue={"0913060886"}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">
                {t("perfectmonneyaccountnumber")}
              </span>
            }
            name="perfect_money_account_number"
            rules={[{ required: true }]}
            initialValue={"U13845429"}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">
                {t("timeupdateorderfinishday")}
              </span>
            }
            name="time_update_order_finished_day"
            rules={[{ required: true }]}
            initialValue={2}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">
                {t("timedenypaymentprocessingday")}
              </span>
            }
            name="time_deny_payment_processing_day"
            rules={[{ required: true }]}
            initialValue={5}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-medium">
                {t("timecancelqueueorderday")}
              </span>
            }
            name="time_cancel_queue_order_day"
            rules={[{ required: true }]}
            initialValue={5}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium">{t("provider")}</span>}
            name="time_cancel_queue_order_day"
            rules={[{ required: true }]}
            initialValue={5}
          >
            <Checkbox defaultChecked>Gainsmm</Checkbox>
            <Checkbox defaultChecked>Viralsmm</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            className="flex justify-end"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="me-5"
              id="create"
            >
              {t("update")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
