import { Card, List, Image, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { GetStaticPropsContext } from 'next';
import React from 'react';
const Page = () => {
    return <>
        <div className="p-3" style={{
            height: "calc(100vh - 65px)",
            overflow: "auto"
        }}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 6,
                }}
                dataSource={[
                    {
                        title: 'Ubuntu',
                        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUXYtZGaSVpgszvcdic5jZKt2rhQZqPGEng&s'
                    },
                    {
                        title: 'Debian',
                        icon: 'https://www.svgrepo.com/show/353640/debian.svg'
                    },
                    {
                        title: 'CentOS',
                        icon: 'https://cdn.icon-icons.com/icons2/2699/PNG/96/centos_logo_icon_167761.png'
                    },
                    {
                        title: 'Ferora',
                        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Fedora_icon_%282021%29.svg'
                    },
                    {
                        title: 'Pop!_OS',
                        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WSC6L3K-Yeh3E3BqTwMNowjyZuFLbq6EIA&s'
                    },
                    {
                        title: 'Arch Linux',
                        icon: "https://img.icons8.com/?size=48&id=uIXgLv5iSlLJ&format=png"
                    },
                ]}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card className="flex" hoverable>
                            <div className="flex justify-between">
                                <div>
                                    <Image width={50} preview={false} src={item.icon} alt="" />
                                    <Title level={3}>{item.title}</Title>
                                </div>

                            </div>
                        </Card>
                    </List.Item>
                )}
            />
            <Input.TextArea rows={20} defaultValue="" />
            <Button type="primary" className="my-2" block>Save</Button>

        </div>
    </>
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
