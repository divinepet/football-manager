export default function FieldImage({ bg, fg }) {
    return (
        <svg
            viewBox="0 0 400 600"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            style={{ borderRadius: '20px'}}
        >
            {/* Фон поля */}
            <rect width="100%" height="100%" fill={bg} rx="24" ry="24"/>

            {/* Границы поля */}
            <rect x="0" y="0" width="400" height="600" fill="none" stroke={fg} stroke-width="4" rx="24" ry="24" />

            {/* Центральная линия (верх поля) */}
            <line x1="0" y1="0" x2="400" y2="0" stroke={fg} stroke-width="2" />

            {/* Центральный круг (больше) */}
            <circle cx="200" cy="0" r="70" fill="none" stroke={fg} stroke-width="2" />

            {/* <!-- Штрафная --> */}
            <rect x="100" y="500" width="200" height="100" fill="none" stroke={fg} stroke-width="2" />

            {/* <!-- Вратарская --> */}
            {/* <rect x="150" y="560" width="100" height="40" fill="none" stroke={fg} stroke-width="2" /> */}

            {/* <!-- Угловые дуги --> */}
            {/* <path d="M0,600 A10,10 0 0,1 10,600" fill="none" stroke={fg} stroke-width="2" />
            <path d="M400,600 A10,10 0 0,0 390,600" fill="none" stroke={fg} stroke-width="2" /> */}
        </svg>
    )
}