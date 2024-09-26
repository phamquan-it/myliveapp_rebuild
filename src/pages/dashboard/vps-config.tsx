import SearchInput from '@/components/filters/SearchInput';
import AddVpsConfig from '@/components/vps/AddVpsConfig';
import { Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React from 'react';
interface PageProps {

}

const Page: React.FC<PageProps> = () => {

    const t = useTranslations('MyLanguage')
    const columns = [
        {
            title: t('entryno'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Profile',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Can take on',
            dataIndex: 'can_take_on',
            key: 'can_take_on',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];



    return (
        <>
            <Title level={2} className='text-center'>Live config</Title>
            <div className="flex justify-between py-3">
                <SearchInput />
                <AddVpsConfig />
            </div>

            <Table className='border rounded overflow-hidden' dataSource={[]} columns={columns} />
        </>
    )
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
