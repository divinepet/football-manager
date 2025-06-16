import FieldImage from '../FieldImage/FieldImage'
import { useState } from 'react';
import './Field.scss'

export default function Field() {
    const [activeTeam, setActiveTeam] = useState(0);

    return (
        <div className='field-wrapper'>

            <div className='team-selector'>
                <div
                    className={`tab ${activeTeam === 0 ? 'active' : ''}`}
                    onClick={() => setActiveTeam(0)}
                >
                    T1
                </div>
                <div
                    className={`tab ${activeTeam === 1 ? 'active' : ''}`}
                    onClick={() => setActiveTeam(1)}
                >
                    T2
                </div>
                <div className="slider" style={{ left: `${activeTeam * 50}%` }} />
            </div>


            <div className='field scrollable'>
                <FieldImage bg='#262636' fg='#ffffff' />
                <div className='players'>
                    {activeTeam === 0 && <div>Tab1</div>}

                    {activeTeam === 1 && <div>Tab2</div>}
                </div>
            </div>
        </div>

    )
}