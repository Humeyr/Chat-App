import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';

const Auth = ({ setIsAuth }) => {
  // giriş yap butonuna tıklanınca
  const handleClick = () => {
    signInWithPopup(auth, provider).then((res) => {
      // kullanıcı giriş yaptığına dair kanıtı içeren
      // token' ı localstorage'a kaydettik
      localStorage.setItem('token', res.user.refreshToken);

      // yetkilendirmeyi doğruladık
      setIsAuth(true);
    });
  };

  return (
    <div className="auth">
      <h1>Chat</h1>
      <p>Sign in to continue</p>
      <button onClick={handleClick}>
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Auth;