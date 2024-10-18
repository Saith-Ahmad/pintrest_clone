import React from 'react'
import PinItem from './PinItem';

interface PinsListProps {
    pins: PinType[]; // Expect an array of PinType
}

interface PinType {
    id : string,
    email?: string;  
    desc?: string;  
    image?: string;
    link?: string;
    title?: string;
    userImgae?: string;
    userName?: string;
}

export default function Pinlist({pins}:PinsListProps) {
  return (
    <div className='mt-7 px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-auto'>
        {pins.map((item,index)=>(
           
               <PinItem pin={item} />
           
        ))}
    </div>
  )
}
