import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { Button, DatePicker, Form, Input, Switch } from "antd";
import Title from "antd/es/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

const Page = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };
  const d = useTranslations("DashboardMenu");
  return (
    <>
      <Title className="!semi-boldb !text-center">{d("Settings")}</Title>
      <div className="bg-white rounded-2xl p-5 w-5/6 m-auto">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Please enter a code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Min Price"
            name="minPrice"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter a valid min price",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Discount Percentage"
            name="discountPercentage"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter a valid discount percentage",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select a start time" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select an end time" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
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
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
