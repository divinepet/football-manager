import { Link } from 'react-router-dom';

const games = [
  { id: '1', name: 'Игра 1' },
  { id: '2', name: 'Игра 2' },
  { id: '3', name: 'Игра 3' },
];

export default function Home() {
  return (
    <div>
      <h1>Список игр</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}