import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'; // 画面遷移にReact Routerを使用する場合

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // React Routerのフック

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('ログイン成功:', user);
      // ログイン成功後の処理 (例: ホーム画面へ遷移)
      navigate('/home'); // React Routerを使った画面遷移の例
    } catch (error: any) {
      console.error('ログイン失敗:', error);
      let errorMessage = 'ログインに失敗しました。';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'メールアドレスの形式が正しくありません。';
          break;
        case 'auth/user-not-found':
          errorMessage = '登録されていないメールアドレスです。';
          break;
        case 'auth/wrong-password':
          errorMessage = 'パスワードが間違っています。';
          break;
        default:
          errorMessage = 'メールアドレスまたはパスワードが正しくありません。';
      }
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>旅行Webアプリ</h1>
      <h2>ログイン</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p>
        新規登録は<Link to="/regist">こちらへ</Link>
      </p>
    </div>
  );
};

export default LoginPage;