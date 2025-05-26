import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Firebaseの設定ファイルをインポート
import './login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // ログイン成功
                const user = userCredential.user;
                console.log('ログイン成功:', user);
            })
            .catch((error) => {
                // エラー処理
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('ログインエラー:', errorCode, errorMessage);
            });
    };

    return (
        <div className="login">
            <h1>ログイン</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">メールアドレス:</label>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">パスワード:</label>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="パスワードを入力"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
            <p>アカウントをお持ちでない方は<Link to="/regist">こちら</Link>から新規登録してください。</p>
            <Link to="/" className="back-link">ホームに戻る</Link>
        </div>
    );
};

export default Login;