import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { Input } from 'antd';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';
interface SearchInputProps {

}

const SearchInput: React.FC<SearchInputProps> = () => {
    const router = useRouter();
    const syncObj = syncObjectToUrl(router)
    const handleInput = debounce((e) => {
        syncObj({ keyword: e.target.value })
    }, 300)

    const p = useTranslations('Placeholder')

    return <>
        <Input
            style={{
                width: 200
            }}
        defaultValue={router.query.keyword ?? ''} onChange={handleInput} placeholder={p('search')}/>
    </>
}

export default SearchInput
