const params = getParams($argument);
const cat = parseInt(params.cat) || Number.MAX_SAFE_INTEGER;
const url = "https://www.kbb.com/cars/";
const regex = /"masterListName":"(.*?)".*?"topVehicles":\[(.*?)\]/gs;
const carRegex = /"name":"(.*?)",/g;

$httpClient.get(url, function (error, response, data) {
  if (error) {
    console.log("Error:", error);
    $done();
  } else {
    const results = [];
    let match;
    let categoryCounter = 1;
    while ((match = regex.exec(data))) {
      const category = match[1];
      const carMatches = match[2].match(carRegex);
      const carNames = carMatches.map((m, index) => {
        const carName = m.replace(carRegex, "$1");
        return `${index + 1}. ${carName}`;
      });
	  
if (categoryCounter <= cat) {
      results.push(`🚘•${category}\n${carNames.join("\n")}`);
}

      categoryCounter++;
    }

    const notificationText = results.join("\n");
    const body = {
      title: "ConsumerReports-Cars",
      content: notificationText,
      icon: params.icon,
      "icon-color": params.color,
      cat: params.cat
    };
    $done(body);
  }
});

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
