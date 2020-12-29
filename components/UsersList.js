import { Dropdown, List, Label, Modal, Input, Button, Header } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import firebase from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { env } from '../next.config'
import { useCallback, useState } from 'react'



export default function UsersList() {
    const [open, setOpen] = useState(false)
    const [newNick, setNewNick] = useState("")

    const usersRef = firebase.firestore().collection('users')
    const query = usersRef.orderBy('displayName');
    const [users] = useCollectionData(query, {idField: 'id'});

    const bannedRef = firebase.firestore().collection('banned')
    const query1 = bannedRef.orderBy('displayName');
    const [banned] = useCollectionData(query1, {idField: 'id'});

    const modsRef = firebase.firestore().collection('moderators')
    const query2 = modsRef.orderBy('displayName');
    const [mods] = useCollectionData(query2, {idField: 'id'});

    const userColor = useCallback((item) => {
      if (banned?.find(item2 => item2.id == item.id)) return 'black';
      if (item.id == env.ownerUID) return 'red';
      if (mods?.find(item3 => item3.id == item.id)) return 'blue';
      return 'grey';
    }, [banned, mods]);

    const userText = useCallback((item) => {
      if (banned?.find(item2 => item2.id == item.id)) return 'Banned';
      if (item.id == env.ownerUID) return 'Owner';
      if (mods?.find(item3 => item3.id == item.id)) return 'Moderator';
      return 'User';
    }, [banned, mods]);

    const curUser = useCallback((item) => {
      if (item.id == firebase.auth().currentUser.uid){return true}else{return false};
    }, []);

    const changeNickname = () => {
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        displayName: newNick
      })
    }

  return (
    <>
    <List>
    {users && users.map((item, index)=>{
        return (
            <List.Item key={index}>
                <Dropdown pointing="top right" icon={null} text={
                    <Label as='a' color={userColor(item)} image>
                    <img src={item.photoURL} />
                    {item.displayName}
                    <Label.Detail>{userText(item)}</Label.Detail>
                    </Label>
                }>
                <Dropdown.Menu>
            {firebase.auth().currentUser.uid === env.ownerUID ? 
            <>
            {!curUser(item) ? (
              <>
              {userText(item) != "Moderator" ?
              <Dropdown.Item text="Add Moderator" onClick={()=>{
                firebase.firestore().collection('moderators').doc(item.id).set({
                  displayName: item.displayName
                })
              }} />
            :
            <Dropdown.Item text="Remove Moderator" onClick={()=>{
              firebase.firestore().collection('moderators').doc(item.id).delete()
            }} />}
              {userText(item) != "Banned" ?
                (<Dropdown.Item text='Ban' onClick={()=>{
                  firebase.firestore().collection('banned').doc(item.id).set({displayName: item.displayName})
                }} />)
                :(
                <Dropdown.Item text='Unban' onClick={()=>{
                  firebase.firestore().collection('banned').doc(item.id).delete()
                }} />)}
                </>
        )
            :
            <>
            <Dropdown.Item text="Admin Tools" />
            <Dropdown.Divider />
            <Dropdown.Item text="Change Nickname" onClick={()=>{setOpen(true)}} />
            </>
            }
            </>
            :
              !curUser(item) ?
                <Dropdown.Item text={item.displayName} />
              :
                <Dropdown.Item text="Change Nickname" onClick={()=>{setOpen(true)}} />
            }
            </Dropdown.Menu>
            </Dropdown>
            </List.Item>
        )
    })}
  </List>






















  <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Change Nickname</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <form onSubmit={(e)=>{setOpen(false); changeNickname(e)}}>
            {users?.map(res=>{
              if(res.id == firebase.auth().currentUser.uid){
                return (<Input type="text" placeholder={res.displayName} onChange={(e)=>{setNewNick(e.target.value)}} />)
              }
            })}
          </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Change"
          labelPosition='right'
          icon='checkmark'
          onClick={(e) => {setOpen(false); changeNickname(e)}}
          positive
        />
      </Modal.Actions>
    </Modal>
  </>
  )
}
