"use client"
import React, { useEffect, useState } from 'react'

import { doc, getDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/shared/firebaseConfig';

import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation'
import PinImage from '@/app/components/pinDetails/PinImage';
import PinInfo from '@/app/components/pinDetails/PinInfo';

interface PinId{
    pinid :string
}

interface PinDetail {
    id:string,  
    email?: string;  
    desc?: string;
    image?: string;
    link?: string;
    title?: string;
    userImage?: string;
    userName?: string;
}


function PinDetail({params} : {params :PinId}) {
  const router=useRouter();
  const db=getFirestore(app);
  const [pinDetail, setPinDetail] = useState<PinDetail | null>(null); // Use null initially or PinDetail type

  useEffect(() => {
    if (params.pinid) {
        getPinDetail(params.pinid);
    } 
},[]); 


const getPinDetail = async (id : string) => {
    try {
        const docRef = doc(db, 'pintrest-post', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPinDetail(docSnap.data() as PinDetail);
        } else {
            throw new Error("No document Found");
        }
    } catch (error : any) {
        console.log("Error fetching pin detail:", error.message); // Improved error logging
    }
};

  return (
    <>
    {pinDetail ? (
        <div className='bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
            <HiArrowSmallLeft className='text-[60px] font-bold ml-[-50px] 
            cursor-pointer hover:bg-gray-200 rounded-full p-2'
            onClick={() => router.back()} />
            <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
            rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16'>
                <PinImage pinDetail={pinDetail} /> {/* Pass pinDetail here */}
                <div className="">
                    <PinInfo pinDetail={pinDetail} />
                </div>
            </div>
        </div>
    ) : null}
</>
  )
}

export default PinDetail