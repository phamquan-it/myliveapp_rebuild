import syncObjectToUrl, { removeEmptyStringProperties } from '@/helpers/syncObjectToUrl';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Sync = () => {
    const  router = useRouter()
    useEffect(() => {
       console.log(router.query) 
    }, [router])
    const synObj = syncObjectToUrl(router) 
    return <>
        <Button type="primary" onClick={()=>{
            synObj({name:''}) 
        }}></Button>        
    </>
}
export default Sync;

