import CategorySelect from "@/components/admin/CategorySelect";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import PlatformSelect from "@/components/admin/PlatformSelect";
import { Button, Form, Input, Select, Switch } from "antd";
import Title from "antd/lib/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Page = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const t = useTranslations("DashboardMenu");
  return (
    <>
      <div>
        <Title className="!text-center">New Order</Title>
        <div className="grid grid-cols-12 gap-4">
          <div className="p-3 col-span-7 bg-white rounded-2xl py-5">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <PlatformSelect required={true} />
              <CategorySelect />
              <Form.Item label={t("services")} name="service">
                <Select showSearch placeholder="Select service" />
              </Form.Item>
              <Form.Item label="Temporary price" name="temporaryprice">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Voucher" name="voucher">
                <Select />
              </Form.Item>
              <Form.Item label="User" name="user">
                <Select />
              </Form.Item>
              <Form.Item label="Charge" name="charge">
                <Input disabled />
              </Form.Item>
              <Form.Item label="" name="">
                <span className="font-medium">Schedule (Timezone: +07:00)</span>{" "}
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className=" py-5 px-4 col-span-5 bg-white rounded-2xl me-3">
            <Form layout="vertical">
              <Form.Item
                label={<span className="text-sm font-medium">Description</span>}
                name=""
              >
                <Input.TextArea placeholder="" allowClear rows={12} readOnly />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
