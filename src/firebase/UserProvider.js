import React, { useState, useEffect, createContext } from 'react';
import { auth } from "./config";



const UserContext = createContext();

const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);	 
    })
   return subscriber; // unsubscribe on unmount
  }, []);

  console.log("authUser", user) 


export default UserContext;



