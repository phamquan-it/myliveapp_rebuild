import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Layout, Tag, Select, Card, Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { LuListFilter } from "react-icons/lu";
import FilterTag from './filter-tag';
import SelectListFilter from './select-list-filter';
import { MessageKeys, useTranslations } from 'next-intl';
import { IoFilterOutline } from 'react-icons/io5';

const { Header, Footer, Content } = Layout;


export enum AppFilter {
    PLATFORM = "platform",
    USER = "user",
    VPS = "vps",
    STREAM_STATUS = "status",
    DATE = "date",
    NONE = "none"
}


interface FilterProps {
    filterList?: AppFilter[]
}

const Filter: React.FC<FilterProps> = ({ filterList = [] }) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [trigger, setTrigger] = useState<AppFilter>(AppFilter.NONE)
    const [options, setOptions] = useState<AppFilter[]>([])
    const handleRemoveKeyword = (key: string) => {
        setOptions((prevOptions) => prevOptions.filter((option) => option !== key));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && keyword != "") {
            console.log('Enter key pressed');
            router.push({ query: { ...router.query, keyword } })
        }
    };
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            //  console.log('Clicked outside the element!');
            setTrigger(AppFilter.NONE)
        }
    };
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        setKeyword((router.query?.keyword != undefined ? router.query?.keyword + '' : ''))
        setOptions(Object.entries(router.query).map(
            ([key]) => key as AppFilter
        ))
    }, [router.query])

    const t = useTranslations("AppFilter")
    const filterOptions = [
        { label: t('vps'), value: AppFilter.VPS },
        { label: t('platform'), value: AppFilter.PLATFORM },
        { label: t('user'), value: AppFilter.USER },
        { label: t('status'), value: AppFilter.STREAM_STATUS },
    ].filter(option =>
        filterList.includes(option.value)
    );
    const filter = filterOptions.filter((opt) => options.indexOf(opt.value) == -1)
    const p = useTranslations("Placeholder")
    return (
        <div className="flex items-center">
            <Button type="default"
                onClick={() => {
                    setOpen(true)
                }}
                size="large" className="mx-2 !border-0 !shadow-none" icon={<LuListFilter className="!text-3xl" />}></Button>
            <div className="flex items-center">
                {options.map((opt) => (
                    <FilterTag key={opt} props={{
                        className: "!py-2 !px-2  text-slate-800 ",
                        closable: true,
                        onClose: () => {
                            handleRemoveKeyword(opt)
                        }
                    }}>
                        {opt}
                    </FilterTag>
                ))}
            </div>
            <div className="relative">

                <div ref={elementRef} className="absolute top-4" style={{ zIndex: 1000 }}>
                    <Card title={t(trigger)} styles={{
                        header: {
                            padding: 0,
                            minHeight: 40
                        },
                        title: {
                            fontSize: 14,
                            marginLeft: 10
                        },
                        body: { padding: 0 }
                    }} className={`${(trigger == "none") ? "hidden" : ''}`} style={{ minWidth: 200 }} extra={
                        <Button icon={<CloseOutlined />} className="!border-0" onClick={() => {
                            setTrigger(AppFilter.NONE)
                        }}></Button>}>
                        <SelectListFilter closePopup={() => {
                            setTrigger(AppFilter.NONE);
                        }} filterBy={trigger} />
                    </Card>
                </div>
                <Select
                    open={open}
                    style={{ width: 200 }}
                    suffixIcon={null}
                    showSearch
                    placeholder={p("filter")}
                    variant="borderless"
                    onKeyDown={handleKeyDown}
                    value={null}
                    onSearch={(text) => {
                        setKeyword(text)
                    }}
                    onDropdownVisibleChange={(open) => {
                        setOpen(open)
                    }}
                    onChange={(e) => {
                        setTrigger(e + '' as AppFilter)
                        console.log(e)
                    }}
                    notFoundContent={(<>
                        <span className="text-slate-700">Tìm kiếm có chứa: {`"${keyword}"`}</span>
                    </>)}
                    options={filter}
                />
            </div>
        </div>
    );
}
export default Filter
