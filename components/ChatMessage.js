import { Feed } from 'semantic-ui-react';
import styles from '../styles/Home.module.css'

export default function ChatMessage(props) {

    const {text, uid, photoURL, displayName, createdAt} = props.message

    function tConvert (time) {
        // Check correct time format and split into components
        time = time?.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
      }

  return (
        <Feed.Event>
        <Feed.Label>
            <img src={photoURL} />
        </Feed.Label>
        <Feed.Content>
            <Feed.Summary>
            <Feed.User>{displayName}</Feed.User>
            </Feed.Summary>
            <Feed.Extra className={styles.chatText} text>
                {text}
            </Feed.Extra>
            <Feed.Meta>
            <Feed.Date className={styles.chatDate}>{createdAt?.toDate().toString().split('G')[0].split(" ")[0] + " " + createdAt?.toDate().toString().split('G')[0].split(" ")[1] + " " + createdAt?.toDate().toString().split('G')[0].split(" ")[2] + " " + tConvert(createdAt?.toDate().toString().split('G')[0].split(" ")[4])}</Feed.Date>
            </Feed.Meta>
        </Feed.Content>
        </Feed.Event>
  )
}
