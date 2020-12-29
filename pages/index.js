import styles from '../styles/Home.module.css'
import { Segment } from 'semantic-ui-react'
import ChatRoom from '../components/ChatRoom.js'
import Login from '../components/Login'
import SignOut from '../components/SignOut'
import UsersList from '../components/UsersList.js'
import firebase from '../components/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'


export default function Home() {

  const [user] = useAuthState(firebase.auth())

  return (
        <div className={styles.gridColumn}>
            <div className={styles.rails}  position='left'>
              <Segment className={styles.innerRail} >{user ? <UsersList /> : <></>}</Segment>
            </div>
            {user ? <ChatRoom /> : <></>}
            <div className={styles.rails} position='right'>
              <Segment className={styles.innerRail} >{user ? <SignOut /> : <Login />}</Segment>  
            </div>
        </div>
  )
}
