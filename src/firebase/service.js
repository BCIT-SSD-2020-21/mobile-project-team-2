import { firebase } from './config';

export const userSignOut = () => {
    // const [error, setError] = useState('')
    firebase.auth().signOut()
        .then(() => setError("User SignedOut"))
        .catch((error) => console.log(error.message))
 }

