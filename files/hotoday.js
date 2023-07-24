const params = getParams($argument);
const platform = params.platform || '今日头条';
const count = parseInt(params.count) || 6; 
let platformValue;

switch (platform) {
  case '微博':
    platformValue = 'KqndgxeLl9';
    break;
  case '知乎':
    platformValue = 'mproPpoq6O';
    break;
  case '微信':
    platformValue = 'WnBe01o371';
    break;
  case '今日头条':
    platformValue = 'x9ozB4KoXb';
    break;
  case '澎湃':
    platformValue = 'wWmoO5Rd4E';
    break;
  case '百度':
    platformValue = 'Jb0vmloB1G';
    break;
  case '36氪':
    platformValue = 'Q1Vd5Ko85R';
    break;
  case '少数派':
    platformValue = 'NaEdZZXdrO';
    break;
  case '财新':
    platformValue = 'x9ozBY7oXb';
    break;
  case 'ZAKER':
    platformValue = '5VaobJgoAj';
    break;
  case '新京报':
    platformValue = 'YqoXQ8XvOD';
    break;
  case '南方周末':
    platformValue = 'ENeYQBweY4';
    break;
  case '科普中国':
    platformValue = 'DgeyxkwdZq';
    break;
  case '威锋网':
    platformValue = 'n4qv90roaK';
    break;
  case '起点小说':
    platformValue = 'VaobmGneAj';
    break;
  case '纵横小说':
    platformValue = 'b0vmYyJvB1';
    break;
  case '北美票房':
    platformValue = 'n6YoVPadZa';
    break;
  default:
    platformValue = '';
}

const url = `https://tophub.today/n/${platformValue}`;

$httpClient.get(url, (error, response, body) => {
  if (error) {
    $notification.post('获取热榜失败', error, '');
    $done();
    return;
  }

  const hotSearchList = parseHotSearchList(body);
  const notificationTitle = `${platform}热榜`;
  const notificationSubtitle = '';

  let notificationContent = '';
  for (let i = 0; i < hotSearchList.length && i < count; i++) {
    const keyword = hotSearchList[i];
    notificationContent += `${i + 1}🔥${keyword}\n`;
  }

  $done({
    title: notificationTitle,
    content: notificationContent,
    icon: params.icon,
    'icon-color': params.color,
    platform: params.platform,
    count: params.count
  });
});

function parseHotSearchList(html) {
  const regex = /<td class="al"><a href="\/l\?e=[^"]+"[^>]+>([^<]+)<\/a><\/td>\s+<td>([^<]*)<\/td>/g;
  const hotSearchList = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const keyword = match[1];
    hotSearchList.push(keyword);
  }

  return hotSearchList;
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
