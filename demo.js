const puppeteer = require("puppeteer");

const userList = [
  { nickName: "뇸뇸", gitHubName: "ellapresso", commit: ""},
  { nickName: "말랑", gitHubName: "ljhg1124", commit: ""},
  { nickName: "ㄷㄷ", gitHubName: "x86kernel", commit: ""},
  { nickName: "또르", gitHubName: "9992", commit: ""},
  { nickName: "싸이클러", gitHubName: "msnodeve", commit: ""},
  { nickName: "컴공돌이", gitHubName: "cafemug", commit: ""},
  { nickName: "1컴", gitHubName: "horace-velmont", commit: ""},
  { nickName: "레게힙합소년", gitHubName: "samkookji77", commit: ""},
  { nickName: "방탕성현단", gitHubName: "Seonghy", commit: ""},
  { nickName: "복이", gitHubName: "changbokLee", commit: ""},
  { nickName: "제영", gitHubName: "Ign0reLee", commit: ""},
  { nickName: "해피스마일", gitHubName: "rnhappysmile", commit: ""},
  { nickName: "ccpo", gitHubName: "ccppoo", commit: ""},
  { nickName: "깃토리", gitHubName: "haeyoonjo", commit: ""},
  { nickName: "퐁퐁", gitHubName: "SeongMinSeok", commit: ""},
  { nickName: "깃☆", gitHubName: "WG19", commit: ""},
  { nickName: "하준", gitHubName: "Chanmi-Kim", commit: ""},
  { nickName: "맹코", gitHubName: "Mengkko", commit: ""}
];
Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth() + 1).toString();
  var dd = this.getDate().toString();

  return (
    yyyy +
    "-" +
    (mm[1] ? mm + "-" : "0" + mm[0] + "-") +
    (dd[1] ? dd : "0" + dd[0])
  );
};
const today = new Date().yyyymmdd();
// yyyy-mm-dd 형태로 오늘을 저장
let notCommit = [];
// 빈배열 생성


(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  for(let i =0; i < 19; i++) {
    await page.goto("https://github.com/" + userList[i].gitHubName);
    const todayCommit = await page.$eval(`[data-date='${today}']`, el => el.attributes[6].value);
    userList[i].commit = todayCommit
  }
  await browser.close();

  console.log(today);
  for(const i in userList) {
    if(userList[i].commit != 0) {
      console.log(`${userList[i].nickName}님의 커밋수는 ${userList[i].commit}회 입니다.`)
    } else {
      notCommit.push(userList[i].nickName)
    }
  }
  console.log('--------------------------')
  for(const i in notCommit) {
    console.log(`${notCommit[i]}님`)
  }
  console.log('커밋하지 않으셨습니다. 분발해주세요!!!')
})();




