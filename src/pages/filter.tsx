import Filter, { AppFilter } from '@/components/filters/filter';
import { GetStaticPropsContext } from 'next';
import React from 'react';
const Page = () => {
    return <div className="pt-4">
        <Filter filterList={[
            AppFilter.PLATFORM,
            AppFilter.USER,
            AppFilter.VPS,
            AppFilter.PAYMENT_STATUS
        ]} />
    </div>
}

export default Page
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default,
        },
    };
}

