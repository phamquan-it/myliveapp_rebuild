import React from 'react';
import MultiSelectFilter from './multi-select-filter';
import { Button, Form } from 'antd';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';

const Page = () => {
    const [form] = Form.useForm()
    const data = usePlatformData()
    return (
        <>
            <MultiSelectFilter dataFilters={data?.data?.data?.platforms} onMultiSelectFilterly={(values) => {
                console.log(values)
            }} useFormFilter={form} />
            <Button type="primary" onClick={() => {
                form.submit()
            }}></Button>
        </>
    )
}

export default Page
