import notround from "@/assets/notfound.svg";
import PageLayout from "@/components/PageLayout";
import { Button, Image } from "antd";
const Page = () => {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="grid gap-2">
          <div className="flex justify-center">
            <Image
              width={150}
              src={"/assets/notfound.png"}
              alt=""
              height={200}
              preview={false}
            />
          </div>
          <p>Sorry, the page you visited does not exist.</p>
          <div className=" flex justify-center">
            <Button type="primary" className="m-auto" href="/">
              Back Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
