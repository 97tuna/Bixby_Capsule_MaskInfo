var http = require("http");
var console = require("console");
var config = require("config");
var dates = require('dates');
var secret = require("secret");

const KEY = secret.get('pharmacyINFODECODE');
module.exports.function = function getPlaceInfo(data, self) {
  if(self == undefined)name = "이름없는데이터", year = "1998";
  else {
    var year = self.birthdayInfo.year;
    var name = self.nameInfo.firstName;
  }
  var dayofweek = dates.ZonedDateTime.now().getDayOfWeek();
  var check = false;
  if (data.type == "01")
    check = true;

  var open = "정보없음";
  var closed = "정보없음";
  var phone = "정보없음";

  if (check) {
    var baseurl = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?"
    var Q = data.addr.split(" ")
    var Q1 = Q[0]
    var Q2 = Q[1]
    var query = {
      serviceKey: KEY,
      "Q0": Q1,
      "Q1": Q2,
      "QN": data.name,
      pageNo: 1,
      numOfRows: 100
    }

    var options = {
      format: 'xmljs',
      cacheTime: 0
    }
    var url = baseurl + http.makeQueryString(query)
    var ret = http.getUrl(url, options);

    totalCount = Number(ret.response.body.totalCount);
    
    console.log(totalCount, ret.response.body);

    if (totalCount != 0) {
      item = ret.response.body.items;
      if (totalCount > 1) {
        phone = item.item[0].dutyTel1;
        var topen = item.item[0]["dutyTime" + dayofweek + "s"];
        var tclosed = item.item[0]["dutyTime" + dayofweek + "c"]
        if(topen == undefined)topen = "정보없음"
        if(tclosed == undefined)tclosed = "정보없음"
      }
      else if (totalCount == 1) {
        phone = item.item.dutyTel1
        var topen = item.item["dutyTime" + dayofweek + "s"]
        var tclosed = item.item["dutyTime" + dayofweek + "c"]
        if(topen == undefined)topen = "정보없음"
        if(tclosed == undefined)tclosed = "정보없음"
      }
      if(topen != "정보없음")open = topen.slice(0, 2) + ":" + topen.slice(2, 4);
      if(tclosed != "정보없음")closed = tclosed.slice(0, 2) + ":" + tclosed.slice(2, 4);
    }
  }

  data["phone"] = phone;
  data["opentime"] = open;
  data["closedtime"] = closed;
  data["point"] = {
    longitude: data["lng"],
    latitude: data["lat"]
  };
  delete data.$id;
  delete data.$type;

  //5부제
  if(self != undefined){
    var yearnum = year % 10;
    if (yearnum == 0) yearnum = 10;
    if ((check || data.type == "03") && (dayofweek == 6 || dayofweek == 7)) {
      data["buy"] = name + "님은 구매 가능하십니다."
    }
    else if (yearnum == dayofweek || yearnum == dayofweek + 5) {
      data["buy"] = name + "님은 구매 가능하십니다."
    }
    else {
      data["buy"] = name + "님은 구매 불가능하십니다."
    }
    yearnum = yearnum % 5;
    canbuy = "금월화수목"[yearnum];
    if(check || data.type == "03")data["buyday"] = "5부제 구매여부 ("+ canbuy+ ", 주말 중 구매 가능)"
    else data["buyday"] = "5부제 구매여부 ("+ canbuy+ " 구매 가능)"
  }
  else{
    data["buyday"] = "5부제 구매여부"
    if(dayofweek >= 6){
      if(check || data.type == "03")data["buy"] = "평일에 구매하지 못한 분만 구매 가능"
      else data["buy"] = "오늘은 마스크 판매를 하지 않습니다."
    }
    else{
      l = Number(dayofweek);
      r = (Number(dayofweek) + 5) % 10;
      if(l > r){
        tmp = l;
        l = r;
        r = tmp;
      }
      data["buy"] = "출생연도 끝자리가 " + l + ", " + r + "만 구매 가능"
    }
  }

  return data;
}