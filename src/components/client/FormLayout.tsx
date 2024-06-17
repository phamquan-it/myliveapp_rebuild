import LocaleSwitcher from "@/LocaleSwitcher";
import { Affix, Button, Image } from "antd";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
interface formLayoutProps {
  children: ReactNode;
}
const FormLayout: React.FC<formLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="  rounded-md border relative bg-gray-50">
        <div
          className={`md:w-1/2 m-auto flex items-center`}
          style={{ height: "100vh" }}
        >
          <Affix className="absolute top-3 right-10">
            <LocaleSwitcher />
          </Affix>

          <ToastContainer />
          <div className="md:w-1/2 border-none md:border rounded md:shadow-md grid m-auto">
            <div className="px-3 py-4 rounded-lg md:bg-white pt-6">
              {children}
            </div>
            {/* <div className="hidden md:flex justify-center items-center bg-blue-100">
              <Image src={"/laptop.png"} alt="" preview={false} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FormLayout;
