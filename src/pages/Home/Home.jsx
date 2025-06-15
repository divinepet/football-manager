import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css'
import '../components/MainMatchView/MainMatchView'
import MainMatchView from '../components/MainMatchView/MainMatchView';
import { getDisplayDateLabel } from '../../utils/dateUtils';


const games = [
  { id: '1', name: 'Игра 1' },
  { id: '2', name: 'Игра 2' },
  { id: '3', name: 'Игра 3' },
];

export default function Home() {

  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAll = async () => {
      try {
        const baseUrls = [
          'https://webws.365scores.com/web/games/fixtures?competitors=131,132,134',
          'https://webws.365scores.com/web/games/fixtures?competitors=5061,2378,5050,5054,2379,5028,2372',
          'https://webws.365scores.com/web/games/fixtures?competitions=5096', // FIFA Club World Cup
          'https://webws.365scores.com/web/games/fixtures?competitions=572' // UEFA Champions League
        ];

        // Преобразуем urls, добавляя параметр timezone
        const urls = baseUrls.map(baseUrl => {
          const url = new URL(baseUrl);
          url.searchParams.set('timezoneName', 'Europe/Moscow');
          return url.toString();
        });

        // Делаем все fetch запросы параллельно
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const gamesArrays = await Promise.all(
          responses.map(res =>
            res.json().then(json => Array.isArray(json.games) ? json.games : [])
          )
        );

        // Объединяем, удаляем дубликаты по id
        const allGames = gamesArrays.flat();
        const uniqueById = new Map();
        allGames.forEach(game => {
          if (!uniqueById.has(game.id)) {
            uniqueById.set(game.id, game);
          }
        });

        // Сортировка по дате
        const sorted = Array.from(uniqueById.values()).sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );

        setGameData(sorted);

      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  // Группируем и сортируем одним проходом
  const groupedMatches = gameData.reduce((acc, match) => {
    const dateKey = match.startTime.slice(0, 10); // "YYYY-MM-DD"
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(match);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedMatches).sort();

  return (
    <>
    <div className='main-wrapper'>
      {sortedDates.map(date => (
        <div className="date-group" key={date}>
          <div className='date-title'>{getDisplayDateLabel(date)}</div>

          {groupedMatches[date]
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map(match => (
              <MainMatchView key={match.id} match={match} />
            ))}
        </div>
      ))}
      </div>
    </>
  );
}