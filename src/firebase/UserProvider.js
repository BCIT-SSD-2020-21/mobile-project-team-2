import React, { Component, createContext } from 'react';
import { auth } from "../firebase/config";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };



    
}
