import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Alert } from 'react-native';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const resetPassword =  (email) => {

    if(!validateEmail(email)) {
        throw Error("Invalid email. Please try it again.")
    }    

    firebase.auth().sendPasswordResetEmail(email)
        .then(function (user) {
            alert('Please check your email...')
        }).catch(function (e) {
                alert(e)
        })    
};