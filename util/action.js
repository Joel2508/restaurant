import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)



export const isUserLogged = () =>{
    const [login, setLogin] = useState(null)

    firebase.auth().onAuthStateChanged((user) => {     
        user ? setLogin(true) : setLogin(false)
    })

    return login
}


export const getCurrentUser = () => {

    return firebase.auth().currentUser
}



