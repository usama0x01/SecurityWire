import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';

const messages = [
  {
    "text": "Hello there",
    "id": "1",
    "sender": {
      "name": "Ironman",
      "uid": "user1",
      "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    },
  },
]

<ChatBox
  messages={messages}
/>
