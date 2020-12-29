import { Button } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import firebase from './firebase'


export default function Login() {

    const addUser = async(uid, displayName, photoURL) => {
        await firebase.firestore().collection('users').doc(uid).set({
            displayName: displayName,
            photoURL: photoURL,
        })
    }

    const logUserIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(user=>{
            try{
                addUser(user.user.uid, user.user.displayName, user.user.photoURL)
            }catch(error){
                console.log(error)
            }
        })
    }

  return (
      <>
      <Button onClick={logUserIn}>Login</Button>
      </>
  )
}
