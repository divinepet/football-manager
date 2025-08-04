import { Link } from 'react-router-dom'
// import './MainMatchView.css'
import './MainMatchView.scss'
import { getTimeFromDate, getTeamLogo } from '../../../utils/dateUtils'

function MainMatchView({ match }) {

    function getTournament() {

        console.log(match.competitionId)

        if (match.competitionId === 5096) {
            return 'fcwc';
        }
        if (match.competitionId === 11) {
            return 'laliga';
        }
        if (match.competitionId === 572) {
            return 'ucl';
        }
        if (match.competitionId === 472) {
            return 'usc';
        }
        if (match.competitionId === 5421) {
            return 'wc_eu';
        }
        if (match.competitionId === 613) {
            return 'wc_am';
        }
        

        return ''
    }

    const shadowSize = '50px'

    return (
        <Link to={`/game/${match.id}`} className="match-link">

            <div className={`match-item outer-match-item ${getTournament()}`}>
                <div className='top-line'>{match.competitionDisplayName}</div>

                <div className="middle-line">

                    <div className="team-wrapper left">
                        <div className="team">
                            <div className="team-logo" style={{
                                background: `url(${getTeamLogo(match.homeCompetitor.id)}) no-repeat center / contain`,
                                // filter: `drop-shadow(0 0 ${shadowSize} ${match.homeCompetitor.color})`
                            }}></div>
                            <div className="team-title">{match.homeCompetitor.shortName ? match.homeCompetitor.shortName : match.homeCompetitor.name}</div>
                        </div>
                    </div>

                    <div className="time">
                        {getTimeFromDate(match.startTime)}
                        </div>

                    <div className="team-wrapper right">
                        <div className="team">
                            <div className="team-logo" style={{ 
                                background: `url(${getTeamLogo(match.awayCompetitor.id)}) no-repeat center / contain`,
                                // filter: `drop-shadow(0 0 ${shadowSize} ${match.awayCompetitor.color})`
                                }}></div>
                            <div className="team-title">{match.awayCompetitor.shortName ? match.awayCompetitor.shortName : match.awayCompetitor.name}</div>
                        </div>
                    </div>

                </div >
                <div className={`overlay ${getTournament()}`}></div>
            </div >
        </Link>
    )
}

export default MainMatchView