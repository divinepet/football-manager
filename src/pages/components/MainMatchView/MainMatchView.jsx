import { Link } from 'react-router-dom'
import './MainMatchView.css'
import { getTimeFromDate, getTeamLogo } from '../../../utils/dateUtils'

function MainMatchView({ match }) {

    const shadowSize = '50px'

    return (
        <Link to={`/game/${match.id}`} className="match-link">

            <div className='match-item'>
                <div className='top-line'>{match.competitionDisplayName}</div>

                <div className="middle-line">

                    <div className="team-wrapper left">
                        <div className="team">
                            <div className="team-logo" style={{
                                background: `url(${getTeamLogo(match.homeCompetitor.id)}) no-repeat center / contain`,
                                filter: `drop-shadow(0 0 ${shadowSize} ${match.homeCompetitor.color})`
                            }}></div>
                            <div className="team-title">{match.homeCompetitor.shortName ? match.homeCompetitor.shortName : match.homeCompetitor.name}</div>
                        </div>
                    </div>

                    <div className="time">{getTimeFromDate(match.startTime)}</div>

                    <div className="team-wrapper right">
                        <div className="team">
                            <div className="team-logo" style={{ 
                                background: `url(${getTeamLogo(match.awayCompetitor.id)}) no-repeat center / contain`,
                                filter: `drop-shadow(0 0 ${shadowSize} ${match.awayCompetitor.color})`
                                }}></div>
                            <div className="team-title">{match.awayCompetitor.shortName ? match.awayCompetitor.shortName : match.awayCompetitor.name}</div>
                        </div>
                    </div>

                </div >
            </div >
        </Link>
    )
}

export default MainMatchView