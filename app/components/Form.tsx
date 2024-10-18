"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import app from "../shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export default function Form() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [file, setFile] = useState<File | null>(null); // Set initial state to null
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();
  const [loading, setloading] = useState<boolean>(false);
  const onSave = () => {
    setloading(true)
    uploadFile()
    router.push('/')
  }

  const uploadFile = async () => {
    try {
        if (file) { 
            const storageRef = ref(storage, `pintrest/${file.name}`);
            await uploadBytes(storageRef, file); 
            const url = await getDownloadURL(storageRef)
            const postData = {
              id : postId,
              title,
              desc,
              link,
              image : url,
              userName : session?.user?.name,
              email : session?.user?.email,
              userImgae : session?.user?.image,
            }
            await setDoc(doc(db,'pintrest-post', postId), postData)
            setloading(false)
        } else {
            console.error("error in data uploading");
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};



  

  return (
    <div className="bg-white p-16 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => onSave()}
          className="bg-red-500 p-2 text-white font-semibold px-3 rounded-lg">
          {loading ? (
            <Image
              src="/loading-indicator.png"
              width={30}
              height={30}
              alt="loading"
              className="animate-spin"
            />
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={setFile} />

        <div className="col-span-2">
          <div className="w-[100%]">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Add your title"
              className="text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <h2 className="text-[12px] mb-8 w-full  text-gray-400">
              The first 40 Charaters are what usually show up in feeds
            </h2>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell everyone what your pin is about"
              className=" outline-none  w-full mt-8 pb-4 text-[14px]
             border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              placeholder="Add a Destination Link"
              className=" outline-none  w-full  pb-4 mt-[90px]
            border-b-[2px] border-gray-400 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
