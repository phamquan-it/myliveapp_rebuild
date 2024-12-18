'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation'
import { Button, DatePicker } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';

interface PageProps {

}

const Page: React.FC<PageProps> = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const buddhistLocale: typeof en = {
        ...en,
        lang: {
            ...en.lang,
            fieldDateFormat: 'YYYY-MM-DD',
            fieldDateTimeFormat: 'YYYY-MM-DD HH:mm',
            yearFormat: 'YYYY',
            cellYearFormat: 'YYYY',
        },
    };
    return <><DatePicker.RangePicker
        renderExtraFooter={() => (<>
            <Button type="link">Today</Button>
        </>)}
        locale={buddhistLocale}
        showTime
    /></>
}

export default Page
