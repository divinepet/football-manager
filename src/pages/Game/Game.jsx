import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTeamLogo, getTimeFromDate } from '../../utils/dateUtils';
import './Game.scss'
import { LandPlot, User } from 'lucide-react';
import ExpandableSection from '../components/ExpandableSection/ExpandableSection';
import HeadToHeadMatchView from '../components/HeadToHeadMatchView/HeadToHeadMatchView';
import Field from '../components/Field/Field';

export default function Game() {
	const { gameId } = useParams(); // Получаем gameId из URL

	const [h2h, setH2h] = useState(null);
	const [game, setGame] = useState(null);
	const [loading, setLoading] = useState(true);

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

				setH2h(h2hJson.game.h2hGames);
				setGame(game);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchGameData();
	}, [gameId]);

	if (loading) return <div className='loader'></div>;

	return (
		<div className='game-page'>
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

					<div className="time">{getTimeFromDate(game.startTime)}</div>

					<div className="team-wrapper right" style={{ justifyContent: 'center !important' }}>
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
					<div className="referee"><User size={16} />{game.officials?.[0]?.name}</div>
					<div className="stadium"><LandPlot size={16} />{game.venue.name}</div>
				</div>

			</div >

			<ExpandableSection title="Личные встречи">
				<div className="h2h">
					{h2h.length === 0 && <div style={{textAlign: 'center'}}>Команды не играли ранее</div>}
					{h2h.length > 0 &&
						h2h.map((match) => <HeadToHeadMatchView key={match.id} match={match} />)}
				</div>
			</ExpandableSection>

			<ExpandableSection title="Состав">
				{game.members
					? <Field game={game} />
					: <div style={{textAlign: 'center'}}>Состав ещё не определён</div>
				}
				
			</ExpandableSection>
		</div>

	);
}