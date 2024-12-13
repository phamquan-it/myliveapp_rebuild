import Filter from '@/components/filters/filter';
import { GetStaticPropsContext } from 'next';
import React from 'react';
const Page = () => {
    return <div className="pt-4">
        <Filter />
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

