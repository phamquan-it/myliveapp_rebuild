import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useRouter } from 'next/router';
const { Option } = Select;

const DateFilter = () => {
    const [custom, setCustom] = useState(false)
    const syncObj = syncObjectToUrl(useRouter())
    const { RangePicker } = DatePicker;
    // Calculate and handle date range changes based on the selection
    const handleSelectChange = (value: any) => {

        const today = moment();
        let startDate;
        let endDate = today.format('YYYY-MM-DD');

        switch (value) {
            case 'current_month':
                startDate = today.startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case '1_month_ago':
                startDate = today.subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case '2_months_ago':
                startDate = today.subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case '3_months_ago':
                startDate = today.subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = today.endOf('month').format('YYYY-MM-DD');
                break;
            case '3_recent_months':
                startDate = today.subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().endOf('month').format('YYYY-MM-DD'); // Reset to current end of month
                break;
            case '6_recent_months':
                startDate = today.subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().endOf('month').format('YYYY-MM-DD');
                break;
            case '1_year_ago':
                // Dynamically calculate the start and end dates for the previous year
                startDate = today.subtract(1, 'year').startOf('year').format('YYYY-01-01');
                endDate = today.subtract(0, 'year').endOf('year').format('YYYY-12-31');
                break;
            case 'custom':
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

    return (
        <div className="inline-block">
            {custom ?
                <SelectDateForFilter customFilter={setCustom} />
                :
                <Select allowClear placeholder="Select date"
                    style={{ width: 250 }}
                    onChange={handleSelectChange}
                >
                    <Option value="current_month">Current Month ({moment().format('MMMM YYYY')})</Option>
                    <Option value="1_month_ago">1 Month Ago ({moment().subtract(1, 'months').format('MMMM YYYY')})</Option>
                    <Option value="2_months_ago">2 Months Ago ({moment().subtract(2, 'months').format('MMMM YYYY')})</Option>
                    <Option value="3_months_ago">3 Months Ago ({moment().subtract(3, 'months').format('MMMM YYYY')})</Option>
                    <Option value="3_recent_months">3 Recent Months</Option>
                    <Option value="6_recent_months">6 Recent Months</Option>
                    <Option value="1_year_ago">1 Year Ago (January - December {moment().subtract(1, 'year').format('YYYY')})</Option>
                    <Option value="custom">Custom</Option>
                </Select>
            }
        </div>
    );
};

export default DateFilter;

