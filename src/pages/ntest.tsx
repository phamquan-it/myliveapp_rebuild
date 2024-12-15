'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation'

interface PageProps {

}

const Page: React.FC<PageProps> = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    return <>{search}</>
}

export default Page
