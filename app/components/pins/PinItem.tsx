import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PinType {
    id:string,
  email?: string;
  desc?: string;
  image?: string;
  link?: string;
  title?: string;
  userImgae?: string;
  userName?: string;
}

interface PinItemProps {
  pin: PinType; // Expect a single PinType object
}

function PinItem({ pin }: PinItemProps) {
    const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImgae, // typo corrected to userImgae (optional)
  };

  return (
    <div className="" onClick={()=>router.push(`/pin/${pin.id}`)}>
      <div
        className="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer"
        //    onClick={()=>router.push("/pin/"+pin.id)}
      >
        <Image
          src={pin.image || ""}
          alt={pin.title || "Pin image"}
          width={500}
          height={500}
          className="rounded-3xl 
        cursor-pointer relative z-0"
        />
      </div>
      <h2
        className="font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2"
      >
        {pin.title}
      </h2>
      <div
        className="flex gap-3 
       items-center"
      >
        <Image
          src={user.image || ""}
          alt="userImage"
          width={45}
          height={45}
          className="rounded-full"
        />
        <div>
          <h2 className="text-[14px] font-medium">{user.name}</h2>
          <h2 className="text-[12px]">{pin.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default PinItem;
