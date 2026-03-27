export function getScreenshots(locale: string) {
  // PL falls back to EN screenshots (no PL-specific screenshots yet)
  const screenshotLocale = locale === 'pl' ? 'en' : locale;
  const isHu = screenshotLocale === 'hu';
  return {
    home: `/images/screenshots/${screenshotLocale}/home.png`,
    aac: `/images/screenshots/${screenshotLocale}/aac.png`,
    games: isHu ? `/images/screenshots/hu/jatek.png` : `/images/screenshots/en/games.png`,
    coloring: isHu ? `/images/screenshots/hu/kifesto.png` : `/images/screenshots/en/coloring.png`,
    music: isHu ? `/images/screenshots/hu/zene.png` : `/images/screenshots/en/music.png`,
    emotions: isHu ? `/images/screenshots/hu/erzelmek.png` : `/images/screenshots/en/emotions.png`,
    schedule: isHu ? `/images/screenshots/hu/napirend.png` : `/images/screenshots/en/schedule.png`,
    calm: isHu ? `/images/screenshots/hu/nyugi.png` : `/images/screenshots/en/calm.png`,
  };
}
