import './HeadToHeadMatchView.scss'
import { getTeamLogo } from '../../../utils/dateUtils';

export default function HeadToHeadMatchView({ match }) {

    console.log(match)

    const formatted = new Date(match.startTime).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='h2h-wrapper'>

            <div className='h2h-team left'>
                <div className='team-name'>{match.homeCompetitor.name}</div>
                <div className='team-logo' style={{
                    background: `url(${getTeamLogo(match.homeCompetitor.id)}) no-repeat center / contain`
                }}
                ></div>
            </div>

            <div className='h2h-middle'>
                <div className='score'>{match.homeCompetitor.score}:{match.awayCompetitor.score}</div>
                <div className='date'>{formatted}</div>
            </div>

            <div className='h2h-team right'>
                <div className='team-name'>{match.awayCompetitor.name}</div>
                <div className='team-logo' style={{
                    background: `url(${getTeamLogo(match.awayCompetitor.id)}) no-repeat center / contain`
                }}></div>
            </div>

        </div>
    )
}