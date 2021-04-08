import React from 'react';
import { TouchableOpacity } from 'react-native';
import { userSignOut } from '../../firebase/service';
import { AntDesign } from '@expo/vector-icons';

export default function LogOut({color}) {

    return (
      <TouchableOpacity onPress={() => userSignOut()}>
        <AntDesign name="logout" size={28} color={color} style={{marginRight: 15}} />
    </TouchableOpacity>
    );
};