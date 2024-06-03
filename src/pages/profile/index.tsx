import { Select } from "antd";

const Page = () => {
    const options: any[] | undefined = [
        {
            key: 1,
            label: <>1234</>,
            value: "data"
        }
    ]
    return (
        <>
            <Select
                showSearch
                placeholder="请选择"
                optionFilterProp="label"
                options={options}
                filterOption={(input, option) => {
                    const res =
                        option?.label?.toString()?.toLowerCase()?.indexOf?.(input?.toLowerCase()) ??
                        -1;
                    return res >= 0;
                }}
            />
        </>
    );
}
export default Page