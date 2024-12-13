import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Tag, TagProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { AppFilter } from '../filter';
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
            //Clicked outside the element!
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
    const af = useTranslations("AppFilter")

    const titleText = filterBy as AppFilter

    const tagStyle: React.CSSProperties = {
        padding: 5,
        fontFamily:"sans-serif"
    }
    return <>
        <span className="relative">
            <div ref={elementRef} className={`absolute -top-1 start-0 ${isDialogOpen ? '' : "hidden"}`}>
                <Card className={`shadow-md`} title={af(titleText)} style={{ zIndex: 1000 }} styles={{
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
                <Tag style={tagStyle} key={filterBy} {...props} className={`${props?.className} flex`} onClose={removeOnClose}>
                    {children}
                </Tag>
            </span>

        </span>


    </>
}

export default TagDialog
