import { Card, Dropdown, MenuProps, Tag, TagProps, Tooltip } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import CheckboxListFilter from './checkbox-list-filter';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import TagDialog from './tag-dialogs/tag-dialog';
import SearchTextTruncate from './text-truncates/search-text-truncate';
import { AppFilter } from './filter';
import RadioListFilter from './radio-list-filter';
interface FilterTagProps {
    props: TagProps,
    children: string
}

const FilterTag: React.FC<FilterTagProps> = ({ props, children }) => {
    const t = useTranslations("AppFilter")
    const platformData = usePlatformData()
    const vpsData = useQuery({
        queryKey: ['queryKey'],
        queryFn: () => axiosInstance.get<any>('vps-provider/getvps', { params: { language: "en" } })
    });
    const userData = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/users', { params: { language: 'en' } })
    })


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
                <Tooltip title={`Tìm kiếm có chứa: ${router.query?.keyword ?? ''}`}>
                    <Tag key={children} {...props} className={`${props.className} flex`} onClose={() => {
                        const filterObj = router.query
                        delete filterObj.keyword
                        router.push({ query: filterObj })

                    }}>Tìm kiếm có chứa: &nbsp; <SearchTextTruncate text={`${router.query?.keyword ?? ''}`} /></Tag>
                </Tooltip>
            </>
        case AppFilter.PLATFORM:
            return <div>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<div className="w-48">
                        <CheckboxListFilter
                            withIcon={"image"}
                            filterBy={AppFilter.PLATFORM}
                            dataFilter={platformData?.data?.data?.platforms}
                            onFinish={(values) => {
                                const platform = values.filterRender.filter((platform: any) => (platform.value)).map((pl: any) => pl.id);
                                syncObj({ platform });
                                closeDialog();
                            }} renderLabel={'name'} name='tag-platform-filter' />
                    </div>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ platform: '' }) }}
                    props={{ ...props }} >
                    {t('platform')}:
                </TagDialog>
            </div>
        case AppFilter.VPS:
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<div className="w-48">
                        <CheckboxListFilter
                            filterBy={AppFilter.VPS}
                            dataFilter={vpsData.data?.data}
                            onFinish={(values) => {
                                const vps = values.filterRender
                                    .filter((vp: any) => (vp.value))
                                    .map((vps: any) => vps.vps_vps_provider);
                                syncObj({ vps });
                                closeDialog();
                            }} renderLabel={'name'} name='vps-filter' />
                    </div>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ vps: '' }) }}
                    props={{ ...props }}>
                    {t('vps')}:
                </TagDialog>
            </>
        case AppFilter.USER:
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<>
                        <CheckboxListFilter
                            filterBy={AppFilter.USER}
                            dataFilter={userData?.data?.data?.data} onFinish={(values) => {
                                const user = values.filterRender
                                    .filter((u: any) => (u.value))
                                    .map((u: any) => u.id);
                                syncObj({ user });
                                closeDialog();
                            }} renderLabel={'email'} name={'user-filter'} />
                    </>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ user: '' }) }}
                    props={{ ...props }}>
                    {t('user')}
                </TagDialog>
            </>
        case AppFilter.STREAM_STATUS:
            return <>
                <TagDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    dialogRender={(<div className="w-48">
                        <RadioListFilter name="statusFilter"
                            renderLabel="name"
                            dataFilter={[
                                { id: 'initalize', name: "Initalize" },
                                { id: 'scheduling', name: "Scheduling" },
                                { id: 'running', name: "Runing" },
                                { id: 'stopped', name: "Stopped" },
                                { id: 'error', name: "Error" },
                            ]}
                            onFinish={(values) => {
                               syncObj({ status: values.filter })
                               closeDialog()
                            }} />

                    </div>)}
                    filterBy={children}
                    removeOnClose={() => { syncObj({ status: '' }) }}
                    props={{ ...props }}>
                    {t('status')}
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

