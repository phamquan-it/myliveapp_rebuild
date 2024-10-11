import { FaFirstOrder } from "react-icons/fa";
import HistoryStatitical from "./HistoryStatitical";
import Title from "antd/es/typography/Title";

const DashBoardStatical = () => {
    return (
        <>
            <div className="">
                <div
                    className="my-3 gap-3 grid lg:grid-cols-5 md:grid-cols-2
        "
                >
                    <HistoryStatitical
                        color="rgb(10, 143, 220)"
                        monney={0.207}
                        info="Current Viral SMM balance"
                    />
                    <HistoryStatitical
                        color="rgb(23, 182, 221)"
                        monney={0.207}
                        info="Current Viral SMM balance"
                    />
                    <HistoryStatitical
                        color="rgb(73, 189, 101)"
                        monney={0.207}
                        info="Current Viral SMM balance"
                    />
                    <HistoryStatitical
                        color="rgb(244, 152, 32)"
                        monney={0.207}
                        info="Current Viral SMM balance"
                    />
                    <HistoryStatitical
                        color="rgb(158, 73, 230)"
                        monney={0.207}
                        info="Current Viral SMM balance"
                    />
                </div>
            </div>
        </>
    );
};
export default DashBoardStatical;
