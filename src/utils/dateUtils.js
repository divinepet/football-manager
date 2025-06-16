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

export function getTimeFromDate(date) {
  return new Date(date).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // 24-часовой формат
    });
}

export function getTeamLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_68,h_68,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v4/Competitors/${id}` }
export function getCompetitionLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_120,h_120,c_limit,q_auto:eco,dpr_2,d_Countries:Round:2.png/v5/Competitions/light/${id}` }
export function getPlayerLogo(id) { return `https://imagecache.365scores.com/image/upload/f_png,w_61,h_61,c_limit,q_auto:eco,dpr_2,d_Athletes:default.png,c_thumb,g_face,z_0.7/v13/Athletes/${id}` }