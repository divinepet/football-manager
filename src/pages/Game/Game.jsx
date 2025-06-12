import { useParams } from 'react-router-dom';

export default function Game() {
  const { gameId } = useParams();

  return (
    <div>
      <h1>Игра #{gameId}</h1>
      <p>Это страница для отображения информации об игре.</p>
    </div>
  );
}