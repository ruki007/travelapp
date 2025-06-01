import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>トラベント~旅行予定管理アプリ~</h1>
            <p>旅行計画を簡単に作成・管理できるアプリケーションです。</p>
            
            <div className="auth-buttons">
                <Link to="/login" className="auth-link">
                    <button className="login-btn">ログイン</button>
                </Link>
                <Link to="/regist" className="auth-link">
                    <button className="regist-btn">新規登録</button>
                </Link>
            </div>
            
            <div className="features">
                <h2>主な機能</h2>
                <ul>
                    <li>旅行計画の作成と管理</li>
                    <li>行きたい場所のブックマーク</li>
                    <li>旅程の共有</li>
                    <li>予算管理</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;