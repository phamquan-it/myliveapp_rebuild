import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { DatePicker, DatePickerProps, GetProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
interface SelectDateForFilterProps {
    customFilter?: Function
}

const SelectDateForFilter: React.FC<SelectDateForFilterProps> = ({customFilter}) => {

    type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
    const syncObj = syncObjectToUrl(useRouter())
    const { RangePicker } = DatePicker;
 

    return <>
        <RangePicker
            format="YYYY-MM-DD"
            onChange={(value, dateString) => {
                if(customFilter != null && customFilter != undefined && value == null){
                    customFilter(false)
                    return
                }
                syncObj({
                    start_date: dateString[0]??'',
                    end_date: dateString[1]??''
                })
            }}
            allowClear={true}
        />
    </>
}

export default SelectDateForFilter
