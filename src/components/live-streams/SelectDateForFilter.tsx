import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { DatePicker, DatePickerProps, GetProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
interface SelectDateForFilterProps {

}

const SelectDateForFilter: React.FC<SelectDateForFilterProps> = () => {

    type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
    const syncObj = syncObjectToUrl(useRouter())
    const { RangePicker } = DatePicker;
 

    return <>
        <RangePicker
            format="YYYY-MM-DD"
            onChange={(value, dateString) => {
                syncObj({
                    startTime: dateString[0]??'',
                    endTime: dateString[1]??''
                })
            }}
            allowClear={true}
        />
    </>
}

export default SelectDateForFilter
