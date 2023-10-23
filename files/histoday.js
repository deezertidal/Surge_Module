const params = getParams($argument);

const url = "https://lishishangdejintian.bmcx.com/";

$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.log(error);
    $done();
  } else {
    const sanitizedData = data.replace(/&nbsp;/g, ' ');
    handleResponse(sanitizedData);
  }
});

function handleResponse(data) {
  const regex = /(\d{4}年)(\d{1,2}月\d{1,2}日) <a href='\/\d+__lishishangdejintianchaxun\/' target='_blank'>(.*?)<\/a>/g;
  const matches = [...data.matchAll(regex)];

  if (matches.length > 0) {
    const today = new Date().getFullYear();
    const events = [];

    for (const match of matches) {
      events.push(`${match[1]} ${match[3]}`);
    }

    const count = parseInt(params.count) || 6;
    const notification = events.slice(0, count).join("\n");

    const body = {
      title: "历史上的今天" ,
      content: notification,
      icon: params.icon,
      "icon-color": params.color,
      count: count
    };

    $done(body);
  } else {
    $done({});
  }
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
