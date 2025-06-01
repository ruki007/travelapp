import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth,db } from '../../firebase';
// import { useAuth } from '../hooks/auth'; // Firebase Authのカスタムフック (仮定)

interface ItemToBring {
  name: string;
  checked: boolean;
}

const initialItemsToBring: ItemToBring[] = [
  { name: '着替え', checked: false },
  { name: '洗面用具', checked: false },
  { name: 'パスポート', checked: false },
  { name: '充電器', checked: false },
  { name: 'カメラ', checked: false },
  { name: '財布', checked: false },
  { name: '薬', checked: false },
  { name: '本', checked: false },
  { name: '水筒', checked: false },
  { name: '傘', checked: false },
  { name: '帽子', checked: false },
  { name: 'サングラス', checked: false },
  { name: '靴', checked: false },
  { name: '地図', checked: false },
  { name: 'ガイドブック', checked: false },
  { name: 'お土産リスト', checked: false },

];

const CreateTravelPlanPage: React.FC = () => {
  const navigate = useNavigate();
  // const { currentUser } = useAuth(); // ログインユーザー情報 (仮定)
  const currentUser = { uid: 'test-user-uid' }; // 開発用ダミーUID

  const [title, setTitle] = useState<string>(''); // 旅行タイトルを追加
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [itemsToBring, setItemsToBring] = useState<ItemToBring[]>(initialItemsToBring);
  const [budget, setBudget] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleMemberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value && !members.includes(value)) {
      setMembers([...members, value]);
    }
    event.target.value = '';
  };

  const removeMember = (memberToRemove: string) => {
    setMembers(members.filter((member) => member !== memberToRemove));
  };

  const handleLocationInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(event.target.value);
    // ここでAPIを呼び出して候補を取得する処理を実装
  };

  const handleroutesearch = async (query: string) => {
    // ここでAPIを呼び出して場所検索を行う処理を実装
    // 例: const results = await fetchPlaces(query);
    // setLocationQuery(results);
  }


  const handleItemCheck = (index: number) => {
    const newItems = [...itemsToBring];
    newItems[index].checked = !newItems[index].checked;
    setItemsToBring(newItems);
  };

  const handleAddItem = (itemName: string) => {
    if (itemName.trim()) {
      setItemsToBring([...itemsToBring, { name: itemName.trim(), checked: false }]);
    }
  };

  const removeItem = (indexToRemove: number) => {
    setItemsToBring(itemsToBring.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async (isDraft: boolean) => {
    if (!currentUser?.uid) {
      console.error('ユーザーがログインしていません。');
      setSaveError('ログインが必要です。');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const travelPlansCollection = collection(db, 'travelPlans');
      await addDoc(travelPlansCollection, {
        title: title || '無題の旅行', // タイトルがない場合はデフォルト
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        members: members,
        destinations: [locationQuery], // 簡易的に場所検索の値を目的地として保存
        itemsToBring: itemsToBring,
        budget: budget || null,
        createdBy: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDraft: isDraft,
        schedule: [], // スケジュールはまだ未実装のため空配列
        sharedWith: [], // 共有機能はまだ未実装
        prefectureVisited: [], // 都道府県制覇機能はまだ未実装
      });
      setIsSaving(false);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('保存に失敗しました:', error);
      setSaveError('旅行計画の保存に失敗しました。');
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>新規旅行計画を作成</h2>

      {saveError && <p style={{ color: 'red' }}>{saveError}</p>}
      {isSaving && <p>保存中です...</p>}

      <div>
        <label htmlFor="title">タイトル:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>予定日:</label>
        <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
        <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
      </div>

      <div>
        <label>メンバー:</label>
        <input type="text" placeholder="メンバーを追加" onBlur={handleMemberChange} />
        <ul>
          {members.map((member) => (
            <li key={member}>
              {member} <button onClick={() => removeMember(member)}>×</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label>場所:</label>
        <input
          type="text"
          placeholder="場所を入力"
          value={locationQuery}
          onChange={handleLocationInputChange}
        />
        {/* おすすめの場所リストなどは省略 */}
      </div>

      <div>
        <h3>持ち物</h3>
        <ul>
          {itemsToBring.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleItemCheck(index)}
              />
              {item.name} <button onClick={() => removeItem(index)}>×</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="持ち物を追加"
            onBlur={(e) => handleAddItem(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label>予算:</label>
        <input
          type="number"
          value={budget === null ? '' : budget}
          onChange={(e) => setBudget(e.target.value ? parseInt(e.target.value) : null)}
        />
        円
      </div>

      {/* スケジュール入力は省略 */}
      <div>
        <h3>予定</h3>
        <p>（時間ごとの予定、ホテル、観光地登録などはここに表示・入力する予定）</p>
      </div>

      <button onClick={() => handleSave(true)} disabled={isSaving}>
        下書き保存
      </button>
      <button onClick={() => handleSave(false)} disabled={isSaving}>
        保存して完了
      </button>
      <button onClick={() => navigate('/dashboard')} disabled={isSaving}>
        キャンセル
      </button>
    </div>
  );
};

export default CreateTravelPlanPage;