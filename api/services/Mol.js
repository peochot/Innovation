const rp = require('request-promise');
const md5 = require('md5');
//&sort=&mekuti=false&hakusanakentta=sanahaku&hakusana=&alueet=Uusima&ilmoitettuPvm=3 2/24h 3/4 paiva 4/vikko
const MolService = function() {
    var server = "http://www.mol.fi/paikkapilotti/tpt-mobile-ws/tyopaikat";

    var _request = function(endpoint,req) {
      var requestOptions = {
        url : endpoint,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
        },
        method : "GET",
        qs : req
      };
      return rp(requestOptions);
    }
    var getJobLists = function(area) {
        return _request(server,{
              alueet: area,
              englanti:"true",
              sort:"ilmoitusnumero desc",
              ilmoitettuPvm:"1"
            });
    }
    var getJobDetail = function(id) {
        return _request(server.concat("/",id),{});
    }

    return {
        getJobLists: getJobLists,
        getJobDetail:getJobDetail
    }
}();

module.exports = MolService;
