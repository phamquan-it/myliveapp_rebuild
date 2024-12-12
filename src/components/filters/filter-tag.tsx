import { Card, Dropdown, MenuProps, Tag, TagProps } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import TagDialog from './tag-dialogs/platform-dialog';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import CheckboxListFilter from './checkbox-list-filter';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
interface FilterTagProps {
    props: TagProps,
    children: string
}

const FilterTag: React.FC<FilterTagProps> = ({ props, children }) => {
    const platformData = usePlatformData()
    const elementRef = useRef<HTMLDivElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            console.log('Clicked outside the element!');
        }
    };
    useEffect(() => {
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const closeDialog = () => {
        setIsDialogOpen(false)
    }
    const router = useRouter()
    const syncObj = syncObjectToUrl(router)

    switch (children) {
        case 'keyword':
            return <>
                <Tag key={children} {...props} onClose={() => {
                    const filterObj = router.query
                    delete filterObj.keyword
                    router.push({ query: filterObj })

                }}>Tiêu để có chứa: {`${router.query?.keyword ?? ''}`}</Tag>
            </>
        case 'platform':
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<>
                        <CheckboxListFilter dataFilter={platformData?.data?.data?.platforms} onFinish={(values) => {
                            const platform = values.filterRender.filter((platform: any) => (platform.value)).map((pl: any) => pl.id)
                            syncObj({ platform })
                            closeDialog()
                        }} renderLabel={'name'} />
                    </>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ platform: '' }) }}
                    props={{ ...props }} >
                    Platform
                </TagDialog>
            </>
        case 'vps':
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<>
                        <CheckboxListFilter dataFilter={platformData?.data?.data?.platforms} onFinish={(values) => {
                            const platform = values.filterRender.filter((platform: any) => (platform.value)).map((pl: any) => pl.id)
                            syncObj({ platform })
                            closeDialog()
                        }} renderLabel={'name'} />
                    </>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ vps: '' }) }}
                    props={{ ...props }}>
                    test
                </TagDialog>
            </>
        case 'user':
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<>
                        <CheckboxListFilter dataFilter={platformData?.data?.data?.platforms} onFinish={(values) => {
                            const platform = values.filterRender.filter((platform: any) => (platform.value)).map((pl: any) => pl.id)
                            syncObj({ platform })
                            closeDialog()
                        }} renderLabel={'name'} />
                    </>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ user: '' }) }}
                    props={{ ...props }}>
                    test
                </TagDialog>
            </>


        default:
            return <>
                <Tag key={children} {...props}
                    onClose={() => {
                        router.push({ query: {} })
                    }}
                >
                    <span>
                        {children}
                    </span>
                </Tag>
            </>
    }
}

export default FilterTag
function synObjectToUrl(router: NextRouter) {
    throw new Error('Function not implemented.');
}

