import { GetStaticPropsContext } from 'next';
import React from 'react';
interface testProps{
    
}

const test:React.FC<testProps> = () => {
    return <></>;
}

export default test
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
