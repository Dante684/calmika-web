export function getScreenshots(locale: string) {
  const isEn = locale === 'en';
  return {
    home: `/images/screenshots/${locale}/home.png`,
    aac: `/images/screenshots/${locale}/aac.png`,
    games: isEn ? `/images/screenshots/en/games.png` : `/images/screenshots/hu/jatek.png`,
    coloring: isEn ? `/images/screenshots/en/coloring.png` : `/images/screenshots/hu/kifesto.png`,
    music: isEn ? `/images/screenshots/en/music.png` : `/images/screenshots/hu/zene.png`,
    emotions: isEn ? `/images/screenshots/en/emotions.png` : `/images/screenshots/hu/erzelmek.png`,
    schedule: isEn ? `/images/screenshots/en/schedule.png` : `/images/screenshots/hu/napirend.png`,
    calm: isEn ? `/images/screenshots/en/calm.png` : `/images/screenshots/hu/nyugi.png`,
  };
}
