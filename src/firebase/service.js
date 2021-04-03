import { firebase } from './config';

export const userSignOut = () => {
    // const [error, setError] = useState('')
    firebase.auth().signOut()
        .then(() => setError("User SignedOut"))
        .catch((error) => console.log(error.message))
 }

// export const getStockQuantity = async({email, symbol}) => {

//     const users = firebase.firestore().collection('users')
//     users.where('email', '==', email)
//     .get()
//     .then((snapShot) => {
//         snapShot.forEach((doc) => {
//             console.log(doc.id, " => ", doc.data());

//             const {positions } = doc?.data()
//             positions?.map( pos => {  
//                 const positions = firebase.firestore().collection('positions')
//                 positions.where(firebase.firestore.FieldPath.documentId(), "==", pos)
//                         .where("symbol", "==", symbol)
//                         .get()
//                         .then((snapShot) => {
//                             snapShot.forEach((doc) => {
//                                 if(doc) {
//                                     const {quantity} = doc.data()
//                                     return quantity
//                                 }
//                         })
//                     })									

//                 })            
		
//         })
//     })

    
//     // return null if not finding a match
//     return null;
// }

const getQuantity = async({pos, symbol}) => {
    let ret = null

    try {
        const positions = firebase.firestore().collection('positions')
                            .where(firebase.firestore.FieldPath.documentId(), "==", pos)
                            .where("symbol", "==", symbol)

        var positionSnapShot = await positions.get()

        positionSnapShot.forEach((doc) => {
            if(doc) {
                const {quantity} = doc.data()
                ret = quantity
            }
        })
    }
    catch (err) {
        console.log('Error getting documents', err);
    }   
    console.log('getQuantity', ret);

    return ret
}


export const getStockQuantity = async({email, symbol}) => {

    let ret = null
    try {
        const users = firebase.firestore()
            .collection('users')
            .where('email', '==', email)
            
        var userSnapShot = await users.get()
        userSnapShot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())

            const {positions } = doc?.data()
                positions?.map( async(pos) => {  
                    ret  =  await getQuantity({pos, symbol})                         		
            })      
        })
    }
    catch (err) {
        console.log('Error getting documents', err);
    }            

    // return null if not finding a match
    console.log('getStockQuantity', ret);
    return ret;
}
