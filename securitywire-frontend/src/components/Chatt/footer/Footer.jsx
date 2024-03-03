import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import '../../css/chatt/footer.css';
const Footer = (props) => {
  const [cancel, setCancel] = useState(false);
  const [text, setText] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    if (emojiObject.emoji !== undefined) setText(text + emojiObject.emoji);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const avatar = props.user.avatar && props.user.avatar.url;
    const username = props.user.name && props.user.name;
    const createdAt = new Date().toISOString();
    const content = text;
    const replyName = props.replyName;
    const replyContent = props.replyComment;
    const userId = props.user._id;
    const socket = props.socket;
    let send = null;

    if (props.replyName !== '') {
      send = 'replyComment';
    }
    socket.emit('createComment', {
      username,
      avatar,
      content,
      replyName,
      replyContent,
      userId,
      send,
      createdAt,
    });
    setText('');
  };
  return (
    <div className="chat-footer">
      <form onSubmit={submitHandler}>
        {props.replyName !== '' ? (
          <input
            type="text"
            placeholder={`Peply to ${props.replyName}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        <button type="submit" className="text-danger">
        </button>
      </form>
      <SendIcon onClick={submitHandler} style={{marginLeft:'10px'}}/>
    </div>
  );
};

export default Footer;
