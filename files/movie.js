const params = getParams($argument);
const url = "https://movie.douban.com/cinema/nowplaying/suzhou/";

$httpClient.get(url, function (error, response, data) {
  if (error) {
    console.log("请求失败:", error);
    $done();
    return;
  }

  const movieData = extractMovieData(data);
  const movieTitles = movieData.titles.slice(0, 9);
  const movieScores = movieData.scores.slice(0, 9);
  const movieActors = movieData.actors.slice(0, 9);

  let panelContent = "";
  for (let i = 0; i < movieTitles.length; i++) {
    const score = movieScores[i] === "0" ? "暂无" : movieScores[i];
    const actors = movieActors[i] || "暂无";
    panelContent += "🎞️"+movieTitles[i] + "🤡" + actors+ "🍿" + score  + "\n";
  }

  // 显示面板内容
  const body = {
    title: "热映电影评分",
    content: panelContent,
    icon: params.icon,
    "icon-color": params.color
  };
  $done(body);
});

function extractMovieData(html) {
  const pattern = /data-title="(.*?)"\s+data-score="(.*?)"[^>]+data-actors="(.*?)"/g;
  let matches;
  const titles = [];
  const scores = [];
  const actors = [];
  while ((matches = pattern.exec(html)) !== null) {
    const title = matches[1].trim();
    const score = matches[2].trim();
    const actorData = matches[3].trim();
    const actorList = actorData.split(" / ");
    titles.push(title);
    scores.push(score);
    actors.push(actorList);
  }
  return { titles: titles, scores: scores, actors: actors };
}

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
