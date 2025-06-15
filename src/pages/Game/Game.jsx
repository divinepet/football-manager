import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTeamLogo, getTimeFromDate } from '../../utils/dateUtils';
import './Game.css'
import { LandPlot, User } from 'lucide-react';
import TabSlider from '../components/TabSlider/TabSlider';

export default function Game() {
  const { gameId } = useParams(); // Получаем gameId из URL

  const [h2h, setH2h] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shadowSize = '60px'

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const baseUrl1 = 'https://webws.365scores.com/web/games/h2h';
        const baseUrl2 = 'https://webws.365scores.com/web/game';

        const [res1, res2] = await Promise.all([
          fetch(`${baseUrl1}?gameId=${gameId}`),
          fetch(`${baseUrl2}?gameId=${gameId}`)
        ]);

        if (!res1.ok || !res2.ok) {
          throw new Error('Один из запросов не удался');
        }

        const [h2hJson, { game }] = await Promise.all([
          res1.json(),
          res2.json()
        ]);

        setH2h(h2hJson);
        setGame(game);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  console.log(game)
  return (
    <>
      <div className='match-item inner-match-item'>
        <div className='top-line'>{game.competitionDisplayName}</div>

        <div className="middle-line">

          <div className="team-wrapper left">
            <div className="team">
              <div className="team-logo" style={{
                background: `url(${getTeamLogo(game.homeCompetitor.id)}) no-repeat center / contain`,
                filter: `drop-shadow(0 0 ${shadowSize} ${game.homeCompetitor.color})`
              }}></div>
              <div className="team-title">{game.homeCompetitor.shortName ? game.homeCompetitor.shortName : game.homeCompetitor.name}</div>
            </div>
          </div>

          <div className='middle-info'>
            <div className="time">{getTimeFromDate(game.startTime)}</div>
          </div>

          <div className="team-wrapper right">
            <div className="team">
              <div className="team-logo" style={{
                background: `url(${getTeamLogo(game.awayCompetitor.id)}) no-repeat center / contain`,
                filter: `drop-shadow(0 0 ${shadowSize} ${game.awayCompetitor.color})`
              }}></div>
              <div className="team-title">{game.awayCompetitor.shortName ? game.awayCompetitor.shortName : game.awayCompetitor.name}</div>
            </div>
          </div>

        </div >

        <div className='bottom-line'>
          <div className="referee"><User size={16} />{game.officials[0].name}</div>
          <div className="stadium"><LandPlot size={16} />{game.venue.name}</div>
        </div>

      </div >

      <TabSlider />
    </>

  );
}