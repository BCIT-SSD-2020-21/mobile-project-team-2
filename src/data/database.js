import firebase from 'firebase';


// USER Functions
export function createUser(userEmail) {
    firebase.database(`users/${userEmail}`).set(
        {
            email: userEmail,
            createdTimestamp: Date.now(),
            lastActiveTimeStamp: null,
            watchList: {},
            stocksOwned: {},
            purchases: {}
        }
    ).then(()=> {
        console.log('user created: ', userEmail);
    }).catch((error) => {
        console.log("createUser error, ", error)
    })
}

export function loginUser(userEmail) {
    firebase.database(`users/${userEmail}`).set(
        {
            lastActiveTimeStamp: Date.now(),
        }
    ).then(()=> {
        console.log('user logged-in: ', userEmail);
    }).catch((error) => {
        console.log("loginUser error, ", error)
    })
}

// STOCK Functions
