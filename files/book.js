const url = "https://book.douban.com/latest?tag";
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};
const params = getParams($argument);

$httpClient.get({ url: url, headers: headers }, function(error, response, data) {
  if (error) {
    console.log("请求失败:", error);
    $done();
    return;
  }
  handleResponse(data);
});

function handleResponse(data) {
  const bookData = extractBookData(data);
  const books = bookData.slice(0, 9);
  let panelContent = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const title = "📖"+book.title;
    const author = book.author;
    const rating = book.rating || "暂无";
    panelContent += `${i + 1}. ${title}\n作者:${author} 🌟:${rating}\n`;
  }

  const panel = {
    title: "新书速递",
    content: panelContent,
    icon: params.icon,
    "icon-color": params.color
  };

  $done(panel);
}

function extractBookData(html) {
  const pattern = /<h2 class="clearfix">\s+<a class="fleft" href="([^"]+)">([^<]+)<\/a>\s+<\/h2>\s+<p class="subject-abstract color-gray">([^<]+)<\/p>\s+<p class="clearfix w250">[\s\S]*?<span class="font-small color-red fleft">([\d.]+)<\/span>/g;
  let matches;
  const books = [];
  while ((matches = pattern.exec(html)) !== null) {
    const link =matches[1];
    const title = matches[2].replace(/^\d+\.\s/, "") ; 
    const info = matches[3];
    const rating = matches[4];
    const authorMatch = info.match(/\s*(.+) \/ \d{4}-\d{1,2}/);
    const author = authorMatch ? authorMatch[1] : "未知作者";
    books.push({
      title: title,
      author: author,
      rating: rating
    });
  }
  return books;
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
