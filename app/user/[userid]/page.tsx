'use client'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import app from '../../shared/firebaseConfig';
import Userinfo from '../../components/Userinfo';
import PinsList from '@/app/components/pins/PinsList';

interface ProfileParams {
    userid: string; // or `number` if it's a number
}
interface PinType {
    id : string,
    email?: string;  // If each pin has an id field
    desc?: string;  // Adjust according to your pin structure
    image?: string;
    link?: string;
    title?: string;
    userImgae?: string;
    userName?: string;
    // Add other fields as needed
}



  
interface userInfoType {
    email: string;
    userName: string;
    userImage?: string;
}

function Profile({ params }: { params: ProfileParams }) {
    const [userInfo, setUserInfo] = useState<userInfoType | null>(null); 
    const [pins, setPins] = useState<PinType[]>([]);
    const db = getFirestore(app);

    

    useEffect(() => {
        const email = params.userid.replace('%40', '@');
        getUserInfo(email);
        if (userInfo) {
            getUserPins();
          }
    }, [userInfo]);

    const getUserInfo = async (email: string) => {
        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setUserInfo(docSnap.data() as userInfoType);
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No document found");
        }
    };

    const getUserPins = async () => {
        try {
            if (!userInfo?.email) {
                console.error("User email is not available");
                return;
            }
            
            // Create a Firestore query
            const q = query(collection(db, 'pintrest-post'), where('email', '==', userInfo.email));
            const querySnapShot = await getDocs(q);
            
            // Gather all pins into an array
            const pinsArray: PinType[] = [];
            querySnapShot.forEach((doc) => {
                pinsArray.push(doc.data() as PinType);  // Ensure correct type
            });
            setPins(pinsArray);
            console.log("pins state", pins)
    
        } catch (error) {
            console.error("Error fetching pins:", error);
        }
    };
    
    
    return (
        <>
        {
            userInfo ?
            <>
                
            <Userinfo info={userInfo} />
            <PinsList pins={pins} />
            </>
            :
            
            <></>
        }
        </>
    );
}

export default Profile;
