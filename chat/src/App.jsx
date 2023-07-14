import { useState, useRef } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
  const [room, setRoom] = useState(null);

  // inputa yazılanı izlemek için
  const inputRef = useRef();

  // çıkış yapa tıklanılınca çalışır:
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  // eğer ki yetkisi yoksa giriş sayfasına yönlendir
  if (!isAuth) {
    return (
      <div className="container">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  // eğer ki kullanıcın yetkisi varsa ekran basılır:
  return (
    <div className="container">
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room-container">
          <h1>Chat Room</h1>
          <p>Which room do you want to join? </p>
          <input ref={inputRef} type="text" />
          <button
            onClick={() => setRoom(inputRef.current.value)}
            id="enter"
          >
            Join
          </button>
          <button id="leave" onClick={handleLogout}>
            Leave
          </button>
        </div>
      )}
    </div>
  );
}

export default App;