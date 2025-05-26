import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>トラベント~旅行予定管理アプリ~</h1>
            <div className ="auth-buttons">
  <Link to="/login" className="auth-link">
                    <button className="login-btn">ログイン</button>
                </Link>
                <Link to="/regist" className="auth-link">
                    <button className="regist-btn">新規登録</button>
                </Link>



            </div>
          
        </div>
    );
};



export default Home;