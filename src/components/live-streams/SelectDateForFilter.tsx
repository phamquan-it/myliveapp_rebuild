import { DatePicker, DatePickerProps, GetProps } from 'antd';
import React from 'react';
interface SelectDateForFilterProps {

}

const SelectDateForFilter: React.FC<SelectDateForFilterProps> = () => {

    type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

    const { RangePicker } = DatePicker;
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    return <>
        <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={onOk}
        />
    </>
}

export default SelectDateForFilter
