import FieldImage from '../FieldImage/FieldImage'
import { useState } from 'react';
import './Field.scss'
import { getPlayerLogo } from '../../../utils/dateUtils';
import { getTeamLogo } from '../../../utils/dateUtils';
import ExpandableSection from '../ExpandableSection/ExpandableSection';

export default function Field({ game }) {
    const [activeTeam, setActiveTeam] = useState(0);

    const playersBaseMap = Object.fromEntries(
        game.members.map(player => [player.id, player])
    );

    console.log(game.homeCompetitor.lineups.members)

    function renderLineup(teamPlayers) {
        return teamPlayers
            .filter(player => player.status === 1)
            .map(player => {
                const leftOffset = player.yardFormation.fieldSide
                const bottomOffset = player.yardFormation.fieldLine;

                return (
                    <div key={player.id} className='player-item' style={{
                        left: leftOffset + '%',
                        transform: `translate(-${leftOffset}%,${bottomOffset}%)`,
                        bottom: bottomOffset + '%'
                    }}>
                        <div className='player-image' style={{ background: `url(${getPlayerLogo(playersBaseMap[player.id]?.athleteId)}) no-repeat center / contain` }}></div>
                        <div className='player-name'>{playersBaseMap[player.id]?.shortName || 'Без имени'}</div>
                    </div>
                );
            });
    }

    function renderPlayerList(teamPlayers, filterFn, showReason = false) {
        return teamPlayers
            .filter(filterFn)
            .map(player => {
                const playerData = playersBaseMap[player.id];
                const playerImage = `url(${getPlayerLogo(playerData?.athleteId)}) no-repeat center / contain`;

                return (
                    <div className="player-list-item" key={player.id}>
                        <div className="player-image" style={{ background: playerImage }}></div>
                        <div className="player-right">
                            <div className="player-name">{playerData?.name}</div>
                            {showReason && <div className="player-reason">Reason</div>}
                        </div>
                    </div>
                );
            });
    }

    function renderSubtitlesList(teamPlayers) {
        return teamPlayers
            .filter(player => player.status === 2)
            .map(player => {
                const playerImage = `url(${getPlayerLogo(playersBaseMap[player.id]?.athleteId)}) no-repeat center / contain`

                return (
                    <div className='player-list-item' key={player.id}>
                        <div className='player-image' style={{ background: playerImage }}></div>
                        <div className='player-right'>
                            <div className='player-name'>{playersBaseMap[player.id]?.name}</div>
                        </div>

                    </div>
                );
            });
    }

    function renderMissingList(teamPlayers) {
        return teamPlayers
            .filter(player => player.status !== 1 && player.status !== 2)
            .map(player => {
                const playerImage = `url(${getPlayerLogo(playersBaseMap[player.id]?.athleteId)}) no-repeat center / contain`

                return (
                    <div className='player-list-item' key={player.id}>
                        <div className='player-image' style={{ background: playerImage }}></div>
                        <div className='player-right'>
                            <div className='player-name'>{playersBaseMap[player.id]?.name}</div>
                            <div className='player-reason'>Reason</div>
                        </div>

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
                    {renderLineup(activeTeam === 0
                            ? game.homeCompetitor.lineups.members
                            : game.awayCompetitor.lineups.members
                    )}
                </div>
                <FieldImage bg='#262636' fg='#ffffff' />
            </div>

            <ExpandableSection title="Запасные">
                <div className='subtitles'>
                    {renderPlayerList(activeTeam === 0
                            ? game.homeCompetitor.lineups.members
                            : game.awayCompetitor.lineups.members
                    , player => player.status === 2)}
                </div>
            </ExpandableSection>

            <ExpandableSection title="Отсутствуют">
                <div className='missing'>
                    {renderPlayerList(activeTeam === 0
                            ? game.homeCompetitor.lineups.members
                            : game.awayCompetitor.lineups.members
                    , player => player.status !== 1 && player.status !== 2, true)}
                </div>
            </ExpandableSection>


        </div>

    )
}