import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './regist.css';

const Regist: React.FC = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // React Routerのフックを使用して画面遷移を行う

    const handleRegist = (e: React.FormEvent) => {
        e.preventDefault();
        
        // パスワード確認
        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 新規登録成功
                const user = userCredential.user;
                console.log('新規登録成功:', user);
                alert('新規登録が完了しました！');

                // 新規登録後の処理 (例: ホーム画面へ遷移)
                navigate('/dashboard'); // React Routerを使った画面遷移の例
            })
            .catch((error) => {
                // エラー処理
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('新規登録エラー:', errorCode, errorMessage);
                
                // エラーメッセージの日本語化
                let errorMsg = 'エラーが発生しました';
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errorMsg = 'このメールアドレスは既に使用されています';
                        break;
                    case 'auth/weak-password':
                        errorMsg = 'パスワードが弱すぎます（6文字以上必要）';
                        break;
                    case 'auth/invalid-email':
                        errorMsg = '無効なメールアドレスです';
                        break;
                }
                alert(errorMsg);
            });
    };

    return (
        <div className="regist">
            <h1>新規登録</h1>
            <form onSubmit={handleRegist}>
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
                        placeholder="6文字以上のパスワード"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">パスワード確認:</label>
                    <input 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="パスワードを再入力"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">新規登録</button>
            </form>
            <p>
                既にアカウントをお持ちの方は
                <Link to="/login">ログイン</Link>
                してください。
            </p>
            <Link to="/">ホームに戻る</Link>
        </div>
    );
};

export default Regist;