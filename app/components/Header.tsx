'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../shared/firebaseConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);

  const saveUser = async () => {
    if (session?.user) {
      // Ensure session.user.email is a string
      const email = session.user.email;

      if (email) { // Check if email is defined
        const userDocRef = doc(db, "user", email);
        await setDoc(userDocRef, {
          userName: session.user.name,
          email: email, // Now guaranteed to be a string
          userImage: session.user.image,
        });
      } else {
        console.error("User email is not available.");
      }
    }
  };

  const handleCreateButton = () => {
    if(session){
      router.push('/pin-builder')
    }else{
      signIn()
    }
  }


  useEffect(() => {
    saveUser();
  }, [session]);

  return (
    <div className='flex justify-between gap-3 md:gap-2 items-center p-6'>
      <Image src='/logo.png' alt='logo' width={60} height={60} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' />
      <button className='bg-black text-white p-3 px-6 rounded-full text-[25px] hidden md:block'>Home</button>
     <button className='font-semibold p-3 px-6 rounded-full text-[25px] hover:scale-110 ' onClick={()=>handleCreateButton()}>Create</button>
      <div className='bg-[#e9e9e9] p-3 px-6 gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[34px] text-gray-500' />
        <input type="text" placeholder='Search' className='bg-transparent outline-none w-full text-[25px]' />
      </div>
      <HiSearch className='text-[25px] text-gray-500 md:hidden' />
      <HiBell className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
      <HiChat className='text-[25px] md:text-[60px] text-gray-500 cursor-pointer' />
      {
        session?.user ?
          <Image src={session?.user?.image ?? "/default-user-image.png"} alt='user-image' width={60} height={60} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' 
          onClick={()=>router.push(`/user/${session?.user?.email}`)}
          />
          :
          <button className='font-semibold p-3 px-6 rounded-full text-[25px]' onClick={() => signIn()}>Login</button>
      }
    </div>
  )
}

export default Header;
