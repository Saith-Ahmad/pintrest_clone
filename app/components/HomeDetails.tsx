'use client'
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import app from '../shared/firebaseConfig';
import Pinlist from './pins/PinsList';

interface PinType {
    id: string,
    email?: string;  
    desc?: string;
    image?: string;
    link?: string;
    title?: string;
    userImgae?: string;
    userName?: string;
}



function HomeDetails() {
    const [pins, setPins] = useState<PinType[]>([]);
    const db = getFirestore(app);

    

    useEffect(() => {
        getUserPins();
        console.log("Useeffect runs")
    }, []);

   

    const getUserPins = () => {
        const q = query(collection(db, 'pintrest-post'));
        const unsubscribe = onSnapshot(q, (querySnapShot) => {
            const pinsArray: PinType[] = [];
            querySnapShot.forEach((doc) => {
                pinsArray.push(doc.data() as PinType);
            });
            setPins(pinsArray);
        });
    
        return () => unsubscribe(); // Cleanup listener on unmount
    };
    
    
    return (
        <>
            <Pinlist pins={pins}/>
        </>
    );
}

export default HomeDetails;
