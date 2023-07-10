const params = getParams($argument);

const url = "https://www.ipip5.com/today/api.php?type=json";

$httpClient.get(url, (error, response, data) => {
  if (error) {
    console.log(error);
    $done();
  } else {
    const result = JSON.parse(data);
    const today = result.today;
    let events = result.result;

    events = events.filter((event) => event.year !== "2023");

    events.sort((a, b) => parseInt(b.year) - parseInt(a.year));


const count = parseInt(params.count) || 5; 
events = events.slice(0, count);

    if (events.length > 0) {
      const eventList = events.map((event) => `📓${event.year}年：${event.title}`).join("\n");
      const notification =`${eventList}`;

      const body = {
        title: "历史上的"+today,
        content: notification,
        icon: params.icon,
        "icon-color": params.color,
        count:count
      };

      $done(body);
    } else {
      $done({});
    }
  }
});

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}