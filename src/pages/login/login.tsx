import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // React Routerのフック

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('ログイン成功:', user);
      // ログイン成功後の処理 (例: ホーム画面へ遷移)
      navigate('/dashboard'); // ログイン後はダッシュボードへ
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
    <div className="login">
      <h1>ログイン</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は<Link to="/regist">こちら</Link>から新規登録してください。
      </p>
      <Link to="/" className="back-link">ホームに戻る</Link>
    </div>
  );
};

export default Login;