import Image from 'next/image';
import React from 'react';

interface PinImageProps {
  pinDetail: {
    id: string;  
    email?: string;  
    desc?: string;
    image?: string;
    link?: string;
    title?: string;
    userImage?: string;
    userName?: string;
  };
}

function PinImage({ pinDetail }: PinImageProps) {
  return (
    <div>
      <Image 
        src={pinDetail.image || "/man.png"}
        alt={pinDetail.title || "image"}
        width={1000}
        height={1000}
        className='rounded-2xl'
      />
    </div>
  );
}

export default PinImage;
