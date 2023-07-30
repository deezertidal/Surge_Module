var body = $response.body.replace(/"vipType":\d/g, '"vipType":1').replace(/"vipTime":\d+/g, '"vipTime":3090701170482');
var modifiedBody = {};
modifiedBody["body"] = body;
$done(modifiedBody);