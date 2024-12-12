import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Tag, TagProps } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
interface TagDialogProps {
    children?: ReactNode | string
    isDialogOpen: boolean
    setIsDialogOpen: any
    filterBy?: string,
    props?: TagProps,
    removeOnClose?: () => void
    dialogRender?: ReactNode
}

const TagDialog: React.FC<TagDialogProps> = ({ filterBy, props, removeOnClose, dialogRender, isDialogOpen, setIsDialogOpen, children }) => {
    const router = useRouter()
    const elementRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            console.log('Clicked outside the element!');
            setIsDialogOpen(false)
        }
    };
    useEffect(() => {
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    const hideDialog = () => {

        setIsDialogOpen(!isDialogOpen)
    }
    return <>
        <span className="relative">
            <div ref={elementRef} className={`absolute -top-2 start-0 ${isDialogOpen ? '' : "hidden"}`}>
                <Card className="shadow-md" title={filterBy} style={{ zIndex: 1000 }} styles={{
                    header: {
                        minHeight: 40,
                        padding: 0,
                    },
                    title: {
                        fontSize: 14,
                        marginLeft: 10,
                        fontWeight: 600
                    },
                    body: {
                        padding: 0
                    }
                }} extra={<Button onClick={hideDialog} icon={<CloseOutlined />} className="!mx-1" ></Button>}>
                    {dialogRender}
                </Card>
            </div>
            <span onClick={() => {
                setIsDialogOpen(true)
            }} >
                <Tag key={filterBy} {...props} onClose={removeOnClose}>
                    {children}
                </Tag>
            </span>

        </span>


    </>
}

export default TagDialog
