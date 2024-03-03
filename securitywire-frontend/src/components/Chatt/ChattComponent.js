import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getData } from '../../routes/FetchData';
import '../css/chatt/chatt.css';
import Footer from './footer/Footer';
import axios from 'axios'

const data = [
  { id: 1, name: 'John Doe', mes: 'hello', type: 'sender' },
  { id: 2, name: 'Victor Wayne', mes: 'yes', type: 'reciver' },
  { id: 3, name: 'Jane Doe', mes: 'hello', type: 'sender' },
];

const ChattComponent = ({companyName}) => {
  const { user } = useSelector((state) => state.auth.data.data);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io(`http://localhost:8000`);
    setSocket(socket);
    return () => socket.close();
  }, []);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyName, setreplyName] = useState('');
  const [replyComment, setreplyComment] = useState('');
  const [page, setPage] = useState(1);
  const pageEnd = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/v1/chats`)
      .then((res) => {
        console.log(`data is ${res}`);
        console.log(res.data.comments);
        setComments((r) => (r = res.data.comments));
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [page]);
  const replyController = (val1, val2) => {
    setreplyName(val1);
    setreplyComment(val2);
  };
  // Realtime
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', user._id);
    }
  }, [socket, user._id]);

  useEffect(() => {
    if (socket) {
      socket.on('sendCommentToClient', (msg) => {
        setComments([msg, ...comments]);
      });

      return () => socket.off('sendCommentToClient');
    }
  }, [socket, comments]);

  // infiniti scroll

  // Reply Comments
  useEffect(() => {
    if (socket) {
      socket.on('sendReplyCommentToClient', (msg) => {
        setComments([msg, ...comments]);
      });
      setreplyName('');
      setreplyComment('');
      return () => socket.off('sendReplyCommentToClient');
    }
  }, [socket, comments]);
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  return (
    <div className="chat">
      {user ? (
        <>
          <div id="chattok" className="chatt-header">
            <Avatar
              alt="Remy Sharp"
              src={user.avatar && user.avatar.url}
              alt={user && user.name}
            />
            <div className="chatt-header-Info">
              <h3>{companyName}</h3>
              <p>(Welcome to Live discusion...)</p>
            </div>

            <div className="chatt-header-right">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          {comments ? (
            <>
              <div className="chat-body">
                {comments
                  .map((comment) => (
                    <>
                      {comment.userId === user._id ? (
                        <p className="chat-message chat-reciver">
                          {comment.replyName ? (
                            <div className="d-flex mainReply">
                              <p className="mr-2 ">{comment.replyName}</p>

                              <p>{comment.replyContent}</p>
                            </div>
                          ) : null}

                          <span>
                            <img
                              className="mr-1"
                              style={{
                                maxHeight: '30px',
                                borderRadius: '50%',
                                border: '1px solid #F8921C',
                              }}
                              src={comment.avatar}
                              alt={comment.name}
                            />
                          </span>
                          <span className="text-black-50 mr-2">
                            {comment.username}
                          </span>
                          {comment.content}
                          <span className="chat-time">
                            <span>{moment(comment.createdAt).fromNow()}</span>

                            <span>
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </span>
                          <span
                            className="dropDown mr-1 ml-2"
                            onClick={() =>
                              replyController(comment.username, comment.content)
                            }
                          >
                            Reply{' '}
                            <i
                              className="fa fa-angle-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </p>
                      ) : (
                        <p className="chat-message ">
                          <span>
                            <img
                              className="mr-1"
                              style={{
                                maxHeight: '30px',
                                borderRadius: '50%',
                                border: '1px solid #F8921C',
                              }}
                              src={comment.avatar}
                              alt={comment.name}
                            />
                          </span>
                          <span className="text-black-50 mr-2">
                            {comment.username}
                          </span>
                          {comment.content}
                          <span className="chat-time">
                            <span>{moment(comment.createdAt).fromNow()}</span>

                            <span>
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </span>
                          <span
                            className="dropDown mr-1 ml-2"
                            onClick={() =>
                              replyController(comment.username, comment.content)
                            }
                          >
                            Reply{' '}
                            <i
                              className="fa fa-angle-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </p>
                      )}
                      <AlwaysScrollToBottom />
                    </>
                  ))
                  .reverse()}
              </div>
            </>
          ) : null}

          <Footer
            user={user}
            socket={socket}
            replyName={replyName}
            replyComment={replyComment}
          />
        </>
      ) : (
        <div className="container my-5">
          <h3>Please Login to start Chatt</h3>
        </div>
      )}
    </div>
  );
};

export default ChattComponent;
