import './MainMatchView.css'

function MainMatchView({ match }) {

    function getTeamLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_68,h_68,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v4/Competitors/${id}` }
    function getCompetitionLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_120,h_120,c_limit,q_auto:eco,dpr_2,d_Countries:Round:2.png/v5/Competitions/light/${id}` }
    function getPlayerLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_61,h_61,c_limit,q_auto:eco,dpr_2,d_Athletes:default.png,c_thumb,g_face,z_0.65/v13/Athletes/${id}` }

    const time = new Date(match.startTime).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-часовой формат
    });

    console.log(match)

    return (
        <div className='match-item'>
            <div className='top-line'>{match.competitionDisplayName}</div>
            {/* <div className='middle-line'>
                <div className='team home-team'>
                    <div className='team-logo' style={{ background: `url(${getTeamLogo(match.homeCompetitor.id)})  no-repeat center / contain` }}></div>
                    <div className='team-title'>{match.homeCompetitor.name}</div>
                </div>
                <div className='time'>{time}</div>
                <div className='team away-team'>
                    <div className='team-logo' style={{ background: `url(${getTeamLogo(match.awayCompetitor.id)})  no-repeat center / contain` }}></div>
                    <div className='team-title'>{match.awayCompetitor.name}</div>
                </div>
            </div> */}
            <div className="middle-line">
                <div className="team-wrapper left">
                    <div className="team">
                        <div className="team-logo" style={{ background: `url(${getTeamLogo(match.homeCompetitor.id)}) no-repeat center / contain` }}></div>
                    <div className="team-title">{match.homeCompetitor.shortName ? match.homeCompetitor.shortName : match.homeCompetitor.name}</div>
                </div>
            </div>

            <div className="time">{time}</div>

            <div className="team-wrapper right">
                <div className="team">
                    <div className="team-logo" style={{ background: `url(${getTeamLogo(match.awayCompetitor.id)}) no-repeat center / contain` }}></div>
                <div className="team-title">{match.awayCompetitor.shortName ? match.awayCompetitor.shortName : match.awayCompetitor.name}</div>
            </div>
        </div>
</div >
        </div >
    )
}

export default MainMatchView