import styles from '../styles/Home.module.css'
import { Button, Feed, Form, Input, Visibility } from 'semantic-ui-react'
import firebase from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'
import { useEffect, useRef, useState } from 'react'

export default function ChatRoom() {

    const messageRef = firebase.firestore().collection('messages')
    const query = messageRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, {idField: 'id'});

    const usersRef = firebase.firestore().collection('users')
    const query1 = usersRef.orderBy('displayName');
    const [users] = useCollectionData(query1, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const dummy = useRef()

    const sendMessage = async(e) => {
        e.preventDefault()
        const {uid, photoURL} = firebase.auth().currentUser
        users?.map(res=>{
            if(res.id == uid){
                 messageRef.add({
                    text: formValue,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid,
                    photoURL,
                    displayName: res.displayName
                })
            }
        })
        setFormValue('')
        dummy.current.scrollIntoView()
    }

    const handleUpdate = () => {
        //console.log("atBottom")
        dummy.current.scrollIntoView()
    }

    const checkInput = () => {
        if(formValue == "" || formValue == null){
            return true
        }else{
            return false
        }
    }

    const didMountRef = useRef(false)
    useEffect(() => {
      if (didMountRef.current) {
        handleUpdate()
      } else didMountRef.current = true
    })


    const handleChanging = (e) => {
        setFormValue(e.target.value)
    }

  return (
      <div className={styles.ChatRoom}>
        <Visibility>
        <Feed >
            {messages && messages.map(msg=>{
            return (<ChatMessage key={msg.id} message={msg} />)
            })}
        </Feed>
        <div ref={dummy} />
        </Visibility>

        <Form className={styles.chatForm} onSubmit={checkInput && sendMessage}>
            <Input className={styles.chatInput} value={formValue} onChange={(e)=>{
                handleChanging(e)
                }}>
                
            </Input>
            <Button disabled={checkInput()} className={styles.chatButton} type='submit'>Send</Button>
        </Form>
      </div>
  )
}
