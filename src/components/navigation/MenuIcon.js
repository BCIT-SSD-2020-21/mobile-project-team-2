import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function MenuIcon() {
    const navigation = useNavigation();
  
    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    },[]);
  
    return (
        <TouchableOpacity onPress={openDrawer}>
            <EvilIcons name="navicon" size={30} color="black" style={{marginLeft:10}} />
        </TouchableOpacity>
    );
};