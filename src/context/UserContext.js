import React, { useState, useEffect, createContext } from 'react';
import { auth } from "../firebase/config";

const UserContext = createContext()


export default function UserProvider(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
            setUser(authUser);	 
        })
        return subscriber; // unsubscribe on unmount
    }, []);

    console.log("authUser", user) 


    return( 
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )



}





