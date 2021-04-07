
import * as firebase from 'firebase'

export const resetPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Please check your email...')
        }).catch((e) => {
            alert(e)
        })    
};