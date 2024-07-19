import notround from "@/assets/notfound.svg";
import PageLayout from "@/components/PageLayout";
import { Button, Image, Result } from "antd";
const Page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Result
        status="404"
        title="Not found!"
        subTitle="Sorry, the page you visited does not exist."
        extra={[
           <Button type="primary" className="m-auto" href="/" key="console">
           Back Home
         </Button>

        ]}
      />
    </div>
  );
};
export default Page;
