import { Card, List, Image, Input, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
const Page = () => {
    return <>
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
                    icon: 'https://static-00.iconduck.com/assets.00/centos-icon-2048x2048-39pfdqnc.png'
                },
                {
                    title: 'Ferora',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Fedora_icon_%282021%29.svg'
                },
                {
                    title: 'Pop!_OS',
                    icon: 'https://static-00.iconduck.com/assets.00/pop-os-icon-2048x2048-mjad7yws.png'
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
    </>
}

export default Page
