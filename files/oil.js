const apiurl = "https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=%E6%B1%9F%E8%8B%8F";

$httpClient.get(apiurl, function(error, response, data) {
  if (error) {
    console.log(error);
    $done();
  } else {
    var obj = JSON.parse(data);
    console.log(obj);
    var prov = obj.result.prov+"油价";
    var p0 = "⛽0号柴油: " + "¥" + obj.result.p0 + "    ";
    var p92 = "⛽92号汽油: " + "¥" + obj.result.p92 + "    ";
    var p95 = "⛽95号汽油: " + "¥" + obj.result.p95 + "    ";
    var p98 = "⛽98号汽油: " + "¥" + obj.result.p98 + "    ";
    var time = obj.result.time;
    var content = p92 + "\n" + p95 + "\n" + p98 + "\n" + p0;
    var body = {
      title: prov,
      subtitle: time,
      content: content
    };
    $done(body);
  }
});