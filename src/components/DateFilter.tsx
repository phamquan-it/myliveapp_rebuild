import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { subtractDate } from '@/helpers/formatDate';
const { Option } = Select;
export enum DateFilterEnum {
    CURRENT_MONTH = 'current_month',
    ONE_MONTH_AGO = '1_month_ago',
    TWO_MONTH_AGO = '2_months_ago',
    THREE_MONTH_AGO = '3_months_ago',
    THREE_RECENTS_MONTH = '3_recent_months',
    SIX_RECENTS_MONTH = '6_recent_months',
    ONE_YEAR_AGO = '1_year_ago',
    CUSTOM = 'custom'
}
const DateFilter = () => {
    const [custom, setCustom] = useState(false)
    const syncObj = syncObjectToUrl(useRouter())
    const { RangePicker } = DatePicker;
    // Calculate and handle date range changes based on the selection
    const p = useTranslations("Placeholder")
    const handleSelectChange = (value: any) => {

        const today = moment();
        let startDate;
        let endDate = today.format('YYYY-MM-DD');

        switch (value) {
            case DateFilterEnum.CURRENT_MONTH:
                startDate = today.startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case DateFilterEnum.ONE_MONTH_AGO:
                startDate = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case DateFilterEnum.TWO_MONTH_AGO:
                startDate = today.subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case DateFilterEnum.THREE_MONTH_AGO:
                startDate = today.subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case DateFilterEnum.THREE_RECENTS_MONTH:
                startDate = today.subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().endOf('month').format('YYYY-MM-DD'); // Reset to current end of month
                break;
            case DateFilterEnum.SIX_RECENTS_MONTH:
                startDate = today.subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().endOf('month').format('YYYY-MM-DD');
                break;
            case DateFilterEnum.ONE_YEAR_AGO:
                // Dynamically calculate the start and end dates for the previous year
                startDate = today.subtract(1, 'year').startOf('year').format('YYYY-01-01');
                endDate = today.subtract(0, 'year').endOf('year').format('YYYY-12-31');
                break;
            case DateFilterEnum.CUSTOM:
                setCustom(true)
                break;
            default:
                syncObj({
                    start_date: '',
                    end_date: ''
                })
                return
        }
        syncObj({
            start_date: startDate,
            end_date: endDate
        })
    };
    const df = useTranslations("Datefilter")
    return (
        <div className="inline-block">
            {custom ?
                <SelectDateForFilter customFilter={setCustom} />
                :
                <Select allowClear placeholder={df('selectDate')}
                    style={{ width: 200 }}
                    onChange={handleSelectChange}
                >
                    <Option value={DateFilterEnum.CURRENT_MONTH}>{subtractDate(0)}</Option>
                    <Option value={DateFilterEnum.ONE_MONTH_AGO}>1 {df('monthago')} ({subtractDate(1)})</Option>
                    <Option value={DateFilterEnum.ONE_MONTH_AGO}>2 {df('monthago')} ({subtractDate(2)})</Option>
                    <Option value={DateFilterEnum.ONE_MONTH_AGO}>3 {df('monthago')} ({subtractDate(3)})</Option>
                    <Option value={DateFilterEnum.THREE_RECENTS_MONTH}>3 {df('recent_month')}</Option>
                    <Option value={DateFilterEnum.SIX_RECENTS_MONTH}>6 {df('recent_month')}</Option>
                    <Option value={DateFilterEnum.ONE_YEAR_AGO}>1 {df('yearago')} {moment().subtract(1, 'year').format('YYYY')}</Option>
                    <Option value={DateFilterEnum.CUSTOM}>{df("custom")}</Option>
                </Select>
            }
        </div>
    );
};

export default DateFilter;

