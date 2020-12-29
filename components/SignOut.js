import { Button } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import firebase from './firebase'


export default function SignOut() {

    const remUser = async(uid) => {
        await firebase.firestore().collection('users').doc(uid).delete()
    }

    const SignOut = () => {
        try {
            remUser(firebase.auth().currentUser.uid)
        }catch(error){
            console.log(error)
        }
        setTimeout(()=>{
            firebase.auth().signOut()
        }, 1000)
    }

  return (
      <>
      <Button onClick={SignOut}>SignOut</Button>
      </>
  )
}
