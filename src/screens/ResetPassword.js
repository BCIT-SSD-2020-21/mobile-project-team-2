import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Alert } from 'react-native';

export const resetPassword =  (email) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(function (user) {
            alert('Please check your email...')
        }).catch(function (e) {
                alert(e)
        })    
};