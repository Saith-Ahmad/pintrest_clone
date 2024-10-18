import Image from 'next/image';
import React from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

// Define the type for userInfo
interface UserInfoProps {
  info: {
    email: string;
    userName: string;
    userImage?: string; // Optional property
  } | null; // Allow null if no user info is available
}

function Userinfo({ info }: UserInfoProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const onLogoutClick = async () => {
        await signOut({ redirect: false }); // Prevent redirecting automatically
        router.push("/"); // Now navigate to home after signing out
    };
    

    return (
        <div className='flex flex-col items-center'>
            <Image 
                src={info?.userImage || "/man.png"}
                alt='userImage'
                width={100}
                height={100}
                className='rounded-full'
            />
            <h2 className='text-[30px] font-semibold'>{info?.userName}</h2>
            <h2 className='text-gray-400'>{info?.email}</h2>
            <div className='flex gap-4'>
                <button className='bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full'>Share</button>
                {/* Ensure session and user are defined */}
                {session && session.user && session.user.email === info?.email && (
                    <button 
                        className='bg-gray-200 p-2 px-3 font-semibold mt-5 rounded-full'
                        onClick={onLogoutClick}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

export default Userinfo;
