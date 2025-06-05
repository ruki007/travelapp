import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase'; // Firebaseの認証とデータベースをインポート
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import './Home.css';

interface TripPlan {
  id: string;
  title: string;
  startDate: Timestamp;
}

const Home: React.FC = () => {
    const [nextTrip, setNextTrip] = useState<TripPlan | null>(null);
    const [daysLeft, setDaysLeft] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNextTrip = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setLoading(false);
                    return;
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0); // 今日の0時に設定
                
                // 今日以降の旅行計画を取得するクエリ
                const tripsRef = collection(db, "tripplans");
                const tripsQuery = query(
                    tripsRef, 
                    where("userId", "==", user.uid),
                    where("startDate", ">=", Timestamp.fromDate(today))
                );
                
                const tripsSnapshot = await getDocs(tripsQuery);
                let closestTrip: TripPlan | null = null;
                let minDiff = Infinity;
                
                tripsSnapshot.forEach(doc => {
                    const data = doc.data();
                    const tripStartDate = data.startDate.toDate();
                    const diffTime = Math.abs(tripStartDate.getTime() - today.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays < minDiff) {
                        minDiff = diffDays;
                        closestTrip = {
                            id: doc.id,
                            title: data.title,
                            startDate: data.startDate
                        };
                    }
                });
                
                if (closestTrip) {
                    setNextTrip(closestTrip);
                    setDaysLeft(minDiff);
                }
            } catch (error) {
                console.error("旅行計画の取得に失敗しました", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchNextTrip();
    }, []);


    //旅の投稿の1部分を取得する。
const [tweetplace, setTweetPlace] = useState<string>('');
const [tweettitle, setTweetTitle] = useState<string>('');
const [tweetphotoURL, setTweetPhotoURL] = useState<string>('');

    useEffect(() =>
    {
        const fetchTWeetData = async()=>{


            try {
                const user = auth.currentUser;
                if (!user) return;

                const tweetRef = collection(db, "tweets");
                const tweetQuery = query(
                    tweetRef,
                    where("userId", "==", user.uid)
                );

                const tweetSnapshot = await getDocs(tweetQuery);
                if (!tweetSnapshot.empty) {
                    const tweetData = tweetSnapshot.docs[0].data();
                    setTweetPlace(tweetData.place || '');
                    setTweetTitle(tweetData.title || '');
                    setTweetPhotoURL(tweetData.photoURL || '');
                }
            } catch (error) {
                console.error("ツイートデータの取得に失敗しました", error);
            }
        }

fetchTWeetData();
    }, []);

    


    return (
        <div className="home-container">
            <h1>こんたび~旅をもっと快適に~</h1>
            <div className="userhome">
                <Link to="/userhome" className="userhome">
                    <button className="userhome-btn">ユーザーホーム</button>
                </Link>
            </div>
            
            <div className="next journey">
                <h2>次の旅まであと</h2>
                {loading ? (
                    <p>読み込み中...</p>
                ) : nextTrip ? (
                    <>
                        <p className="days-left">{daysLeft}日</p>
                        <p className="journey-title">{nextTrip.title}</p>
                        <p className="journey-date">
                            {nextTrip.startDate.toDate().toLocaleDateString('ja-JP', {
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric'
                            })}
                        </p>
                        <Link 
                            to={`/plancheck/${nextTrip.id}`} 
                            className="plan-check-link"
                        >
                            <button className="plan-check-btn">計画を確認する</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="no-plans">え!旅まだ決まってないの?</p>
                        <p className="journey">旅は道連れ、世は情。まずは計画から!</p>
                        <Link to="/create-plan" className="plan-link">
                            <button className="plan-btn">旅の計画を立てる</button>
                        </Link>
                    </>
                )}
            </div>

            <div className="tweet-section">
                <h2>つぎ、どこ行く?~みんなのおすすめ~</h2>
                {tweetplace && tweettitle ? (
                    <div className="tweet-card">
                        <img src={tweetphotoURL} alt="旅の写真" className="tweet-photo" />
                        <h3 className="tweet-title">{tweettitle}</h3>
                        <p className="tweet-place">{tweetplace}</p>
                    </div>
                ) : (
                    <p className="no-tweet">まだ旅の投稿がありません。</p>
                )}

                <div className="tweet-links">
                    <Link to="/tweet" className="tweet-link">
                        <button className="tweet-btn">みんなの投稿を見る</button>
                    </Link>
                </div>
                <Link to="/tweetcreate" className="home-link">
                    <button className="home-btn">投稿する</button>
                </Link>
            </div>

            <div className="past-new-plan">
                <h2>過去の旅行計画</h2>
                <p className="past-plan">過去の旅行計画を確認したり、新しい計画を立てたりしましょう。</p>
                <Link to="/past-plans" className="past-plans-link">

                    <button className="past-plans-btn">過去の計画を見る</button>
                </Link>
                <Link to="/create-plan" className="new-plan-link">

                    <button className="new-plan-btn">新しい計画を立てる</button>
                </Link>
                
                </div>
            
        </div>


    );
};

export default Home;