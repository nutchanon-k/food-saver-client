// src/components/TestStoreAccess.jsx
import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase'; // Ensure the import path is correct

const TestStoreAccess = () => {
  useEffect(() => {
    const fetchStore = async () => {
      try {
        console.log('Attempting to fetch store with ID: 5 from Firestore');
        const storeDocRef5 = doc(firestore, 'stores', '5');
        const storeSnap5 = await getDoc(storeDocRef5);

        if (storeSnap5.exists()) {
          const storeData5 = storeSnap5.data();
          console.log('Store 5 Data:', storeData5);
        } else {
          console.log('Store with ID 5 not found in Firestore.');
        }

        console.log('Attempting to fetch store with ID: 51 from Firestore');
        const storeDocRef51 = doc(firestore, 'stores', '51');
        const storeSnap51 = await getDoc(storeDocRef51);

        if (storeSnap51.exists()) {
          const storeData51 = storeSnap51.data();
          console.log('Store 51 Data:', storeData51);
        } else {
          console.log('Store with ID 51 not found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching store from Firestore:', error);
      }
    };

    fetchStore();
  }, []);

  return <div>Check the console for Firestore stores data.</div>;
};

export default TestStoreAccess;
