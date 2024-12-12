import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { Layout, Tag, Select, Card, Button } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import FilterTag from './filter-tag';
import SelectListFilter from './select-list-filter';
import { useTranslations } from 'next-intl';

const { Header, Footer, Content } = Layout;



export default function Filter() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [trigger, setTrigger] = useState('none')
    const [options, setOptions] = useState<string[]>(['platform'])
    const handleRemoveKeyword = (key: string) => {
        setOptions((prevOptions) => prevOptions.filter((option) => option !== key));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            router.push({ query: { ...router.query, keyword } })
        }
    };
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            console.log('Clicked outside the element!');
            setTrigger("none")
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
            ([key]) => key
        ))
    }, [router.query])
    const filterOptions = [
        { label: 'Vps', value: "vps" },
        { label: 'Platform', value: "platform" },
        { label: 'User', value: 'user' },
        { label: 'Status', value: 'status' },
        { label: 'Date', value: 'date' },
    ]
    const filter = filterOptions.filter((opt) => options.indexOf(opt.value) == -1)
    const af = useTranslations("AppFilter")
    return (
        <div>
            <p>Hello world</p>
            <Layout>
                <Header className="flex items-center">
                    <Button type="default"
                        onClick={() => {
                            setOpen(true)
                        }}
                        size="large" className="mx-2 !border-0 !shadow-none" icon={<FilterOutlined className="!text-3xl" />}></Button>
                    <div>
                        {options.map((opt) => (
                            <FilterTag key={opt} props={{
                                className: "!border-0 !py-2 !px-2",
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
                            <Card title={trigger} styles={{
                                header: {
                                    padding: 0,
                                    minHeight: 30
                                },
                                title: {
                                    fontSize: 14,
                                    marginLeft: 10
                                },
                                body:{ padding: 0 }
                            }} className={(trigger == "none") ? "hidden" : ''} extra={
                                <Button icon={<CloseOutlined />} className="!border-0" onClick={() => {
                                    setTrigger("none")
                                }}></Button>}>
                                <SelectListFilter closePopup={() => {
                                    setTrigger("none");
                                }} filterBy={trigger} />
                            </Card>
                        </div>
                        <Select
                            open={open}
                            style={{ width: 200 }}
                            suffixIcon={null}
                            showSearch
                            //   className={(trigger != "none") ? "-translate-y-24" : ''}
                            placeholder={'Filter'}
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
                                setTrigger(e + '')
                                console.log(e)
                            }}
                            notFoundContent={(<>
                                <span className="text-slate-700">Tìm kiếm có chứa: {`"${keyword}"`}</span>
                            </>)}
                            options={filter}
                        />
                    </div>
                </Header>

                <Content>
                    {options.map((opt) => (
                        <Tag
                            className="py-1 border-0"
                            closable={true}
                            key={opt}
                        >
                            {opt}
                        </Tag>
                    ))}

                </Content>

                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}
