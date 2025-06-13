export function getDisplayDateLabel(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const normalize = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const today = normalize(now);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const target = normalize(date);

  if (target.getTime() === today.getTime()) return 'Сегодня';
  if (target.getTime() === tomorrow.getTime()) return 'Завтра';
  if (target.getTime() === dayAfterTomorrow.getTime()) return 'Послезавтра';

  const dayOfWeek = today.getDay(); // 0 — воскресенье
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - dayOfWeek));

  if (target < endOfWeek) {
    return date.toLocaleDateString('ru-RU', { weekday: 'long' });
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}