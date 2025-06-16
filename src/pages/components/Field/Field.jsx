import FieldImage from '../FieldImage/FieldImage'
import { useState } from 'react';
import './Field.scss'
import { getPlayerLogo } from '../../../utils/dateUtils';
import { getTeamLogo } from '../../../utils/dateUtils';

export default function Field({ game }) {
    const [activeTeam, setActiveTeam] = useState(0);

    // Создаём мапу, где ключ - id, а значение - сам объект игроков для быстрого поиска
    const playersBaseMap = Object.fromEntries(
        game.members.map(player => [player.id, player])
    );

    function renderLineup(teamPlayers) {
        return teamPlayers
            .filter(player => player.status === 1)
            .map(player => {
                const leftOffset = player.yardFormation.fieldSide
                const bottomOffset = player.yardFormation.fieldLine;

                console.log(player.yardFormation)

                return (
                    <div key={player.id} className='player-item' style={{
                        left: leftOffset + '%',
                        transform: `translate(-${leftOffset}%,${bottomOffset}%)`,
                        bottom: bottomOffset + '%'
                    }}>
                        <div className='player-image' style={{
                            background: `url(${getPlayerLogo(playersBaseMap[player.id]?.athleteId)}) no-repeat center / contain`
                        }}></div>
                        <div className='player-name'>{playersBaseMap[player.id]?.shortName || 'Без имени'}</div>
                    </div>
                );
            });
    }

    return (
        <div className='field-wrapper'>

            <div className='team-selector'>
                <div className={`tab ${activeTeam === 0 ? 'active' : ''}`} onClick={() => setActiveTeam(0)}>
                    <div className='tab-inner'>
                        <div className='tab-logo' style={{ background: `url(${getTeamLogo(game.homeCompetitor.id)}) no-repeat center / contain` }}></div>
                        {game.homeCompetitor.shortName || game.homeCompetitor.name}
                    </div>

                </div>
                <div className={`tab ${activeTeam === 1 ? 'active' : ''}`} onClick={() => setActiveTeam(1)}>
                    <div className='tab-inner'>
                        <div className='tab-logo' style={{ background: `url(${getTeamLogo(game.awayCompetitor.id)}) no-repeat center / contain` }}></div>
                        {game.awayCompetitor.shortName || game.awayCompetitor.name}
                    </div>
                </div>
                <div className="slider" style={{ left: `${activeTeam * 50}%` }} />
            </div>

            <div className='field'>

                <div className='players'>
                    {activeTeam === 0 && renderLineup(game.homeCompetitor.lineups.members)}
                    {activeTeam === 1 && renderLineup(game.awayCompetitor.lineups.members)}
                </div>

                <FieldImage bg='#262636' fg='#ffffff' />

            </div>
        </div>

    )
}