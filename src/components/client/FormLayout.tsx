import { Image } from "antd";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
interface formLayoutProps {
  children: ReactNode;
}
const FormLayout: React.FC<formLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="bg-slate-100 md:bg-teal-50">
        <div
          className={`md:w-1/2 m-auto flex items-center`}
          style={{ height: "100vh" }}
        >
          <ToastContainer />
          <div className="w-full border-none md:border rounded md:shadow-md grid md:grid-cols-2">
            <div className="px-3 py-4 md:bg-slate-50">{children}</div>
            <div className="hidden md:flex justify-center items-center bg-blue-100">
              <Image src={"/laptop.png"} alt="" preview={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FormLayout;
