import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
interface VpsPriceProps {
    profile: string,
    profiles: any
}

const VpsPrice: React.FC<VpsPriceProps> = ({ profile, profiles }) => {

  //  useEffect(()=>{
  //      if(profiles?.data != undefined){
  //          profiles?.data?.map((pf:any)=>{
  //              console.log("Profile",pf)
  //          })
  //      }
  //  }, [profiles])
    return <>16$</>
}

export default VpsPrice
