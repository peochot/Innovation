const NCTService = require('../services/NCT');

module.exports.videos=function(req,res){
  NCTService.getVideos(req.query.keyword)
  .then(function(repos) {
    res.send(repos.Data);
    console.log(repos);
  })
  .catch(function (reason) {
    res.statusCode(403).send(reason);
  });
};
module.exports.songs=function(req,res){
  NCTService.getSongs(req.query.keyword)
  .then(function(repos) {
    res.send(repos.Data);
    console.log(repos);
  })
  .catch(function (reason) {
    res.statusCode(403).send(reason);
  });
};
module.exports.playlists=function(req,res){
  NCTService.getPlayLists(req.query.keyword)
  .then(function(repos) {
    res.send(repos.Data);
    console.log(repos);
  })
  .catch(function (reason) {
    res.statusCode(403).send(reason);
  });
};
