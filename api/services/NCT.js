const rp = require('request-promise');
const md5 = require('md5');

const NCTService = function() {
    var server = "http://api.m.nhaccuatui.com/mobile/v5.0/api";
    var req ={
      action:"",
      keyword:"",
      time :"",
      deviceinfo:'{"OsName":"ANDROID","OsVersion":"25"}',
      pageindex:"1",
      pagesize:"25",
      secretkey:"",
      token :""
    }
    var _getMD5 = function() {
        return md5(req.action.concat(req.keyword,req.pageindex,req.pagesize,req.token,req.time));
    }
    var _request = function() {
      req.secretkey=[0x6e, 0x63, 0x74, 0x40, 0x6d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65].map(function(chr){return String.fromCharCode(chr)}).join("");
      req.token=[0x6e, 0x63, 0x74, 0x40, 0x61, 0x73, 0x64, 0x67, 0x76, 0x68, 0x66, 0x68, 0x79, 0x74, 0x68].map(function(chr){return String.fromCharCode(chr)}).join("")
      req.time= Math.floor(Date.now() / 1000)+10000;
      req.token=_getMD5();
      var requestOptions = {
        url : server,
        method : "GET",
        json : {},
        qs : req
      };
      return rp(requestOptions);
    }
    var getVideos = function(keyword) {
        req.action="search-video";
        req.keyword=keyword;
        return _request();
    }
    var getPlayLists = function(keyword){
        req.action="search-playlist";
        req.keyword=keyword;
        return _request();
    }
    var getSongs=function(keyword){
        req.action="search-song";
        req.keyword=keyword;
        return _request();
    }

    return {
        getVideos: getVideos,
        getPlayLists:getPlayLists,
        getSongs:getSongs,
    }
}();

module.exports = NCTService;

/*
var NCTService = function() {
    var server = "http://api.m.nhaccuatui.com/mobile/v5.0/api";
    var req ={
      action:"",
      keyword:"",
      time :"",
      deviceinfo:'{"OsName":"ANDROID","OsVersion":"25"}',
      pageindex:1,
      pagesize:100,
      secretkey:[0x6e, 0x63, 0x74, 0x40, 0x6d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65].map(function(chr){return String.fromCharCode(chr)}).join(""),
      token :[0x6e, 0x63, 0x74, 0x40, 0x61, 0x73, 0x64, 0x67, 0x76, 0x68, 0x66, 0x68, 0x79, 0x74, 0x68].map(function(chr){return String.fromCharCode(chr)}).join("")
    }
    var _getMD5 = function() {
        return md5(req.action.concat(req.keyword,req.pageindex,req.pagesize,req.token,req.time));
    }
    var _request = function(callback) {
      req.time= Math.floor(Date.now() / 1000)+10000;
      req.token=_getMD5();
      console.log(req);
      var requestOptions = {
        url : server,
        method : "GET",
        json : {},
        qs : req
      };
      request(requestOptions,callback);
    }
    var getVideos = function(keyword,callback) {
        req.action="search-video";
        req.keyword=keyword;
        _request(callback);
    }
    var getPlayLists = function(keyword,callback){
        req.action="search-playlist";
        req.keyword=keyword;
        _request(callback);
    }
    var getSongs=function(keyword,callback){
        req.action="search-song";
        req.keyword=keyword;
        _request(callback);
    }

    return {
        getVideos: getVideos,
        getPlayLists:getPlayLists,
        getSongs:getSongs,
    }
}();

module.exports = NCTService;

/*
var apiOptions = {
  server : "http://api.m.nhaccuatui.com/mobile/v5.0/api"
};
var req ={
  action:"",
  keyword:"",
  deviceinfo:'{"OsName"=>"ANDROID","OsVersion"=>"21"}',
  time :Math.floor(Date.now() / 1000),
  pageindex:1,
  pagesize:30,
  secretkey:[0x6e, 0x63, 0x74, 0x40, 0x6d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65].map(function(chr){return String.fromCharCode(chr)}).join(""),
  token :[0x6e, 0x63, 0x74, 0x40, 0x61, 0x73, 0x64, 0x67, 0x76, 0x68, 0x66, 0x68, 0x79, 0x74, 0x68].map(function(chr){return String.fromCharCode(chr)}).join("")
}
module.exports.getVideos=function(keyword,callback){
  req.action="search-video";
  req.keyword=keyword;
  req.time=Math.floor(Date.now() / 1000);
  req.token=md5(req.action+keyword+req.pageindex+req.pagesize+req.token+req.time);
  console.log(req.token);
  var requestOptions = {
    url : apiOptions.server,
    method : "GET",
    json : {},
      qs : req
  };
  request(requestOptions, callback);
}
*/
