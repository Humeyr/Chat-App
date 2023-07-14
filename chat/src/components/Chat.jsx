import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
  } from 'firebase/firestore';
  import { useEffect, useState } from 'react';
  import { db, auth } from '../firebase/firebaseConfig';
  
  const Chat = ({ room }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesDb = collection(db, 'messages');
    const handleSubmit = (e) => {
      e.preventDefault();

      addDoc(messagesDb, {
        text,
        user: auth.currentUser.displayName,
        room,
        createdAt: serverTimestamp(),
      });
  
      setText('');
    };
  
    // mesajları kolleksiyondan çekme
    useEffect(() => {
      // gerekli filtreleme işlemini yapma
      const queryMessage = query(
        messagesDb,
        where('room', '==', room),
        orderBy('createdAt')
      );
  
      // koleksiyonun değişimini izler
      onSnapshot(queryMessage, (snapshot) => {
        let comingMessages = [];
        snapshot.forEach((doc) => {
          comingMessages.push(doc.data());
        });
  
        setMessages(comingMessages);
      });
    }, []);
  
    console.log(messages);
    return (
      <div className="chat">
        <div className="chat-info">
          <p>{auth.currentUser.displayName}</p>
          <p>{room}</p>
          <a href="/">Change Room</a>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <>
              {/* oturumu açan kişiyle mesajı atan aynıysa */}
              {auth.currentUser.displayName === message.user ? (
                <p className="user-message">{message.text}</p>
              ) : (
                <p className="sender-message">
                  <span>{message.user}</span>
                  <span>{message.text}</span>
                </p>
              )}
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Mesajınızı yazınız.."
            type="text"
          />
          <button>Send</button>
        </form>
      </div>
    );
  };
  
  export default Chat;