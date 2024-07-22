import { Platform } from "@/@type";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import { RootState } from "@/libs/redux/store/store";
import { Image, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlatformSelect = () => {
  const { platforms, isPending, isSuccess } = useSelector(
    (state: RootState) => state.platformSlice
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    dispatch(fetchPlatform()).then((value: any) => {
      setValue("1#Youtube");
    });
  }, []);
  return (
    <Select
      className="!w-52"
      value={value}
      loading={isPending}
      onChange={(value) => {
        setValue(value);
        console.log(value);
      }}
      showSearch
      options={platforms.map((platform) => ({
        label: (
          <>
            <div className="flex items-center gap-1">
              <Image src={platform.icon} alt="" width={25} preview={false} />
              <span>{platform.name}</span>
            </div>
          </>
        ),
        value: `${platform.id}#${platform.name}`,
      }))}
      style={{ width: 200 }}
    />
  );
};
export default PlatformSelect;
