const rp = require('request-promise');
const fs =require('fs');
const path = require("path");
import refresh from 'passport-oauth2-refresh';
import libmime from 'libmime';

const UserMailService = function() {
    var server = "https://www.googleapis.com/gmail/v1/users/me/messages/send";

    var _getBase64 = function(str) {
        return new Buffer(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    }

    var send = function(accessToken, targetEmail, user, subject, content, mimeType, filename, fileData) {
      let from =libmime.encodeWord(`${user.firstName} ${user.lastName} <${user.email}>`,'Q')
      let mail =[
      `Content-Type: multipart/mixed; boundary="foo_bar_baz"\r\n`,
      `MIME-Version: 1.0\r\n`,
      `to: ${targetEmail}\r\n`,
      `from: ${from}\r\n`,
      `reply-to: ${user.email}\r\n`,
      `subject: ${subject}\r\n\r\n`,
      `--foo_bar_baz\r\n`,
      `Content-Type: text/html; charset="UTF-8"\r\n`,
      `MIME-Version: 1.0\r\n`,
      `Content-Transfer-Encoding: 7bit\r\n\r\n`,
      `${content}\r\n\r\n`,
      `--foo_bar_baz\r\n`,
      `Content-Type: ${mimeType}\r\n`,
      `MIME-Version: 1.0\r\n`,
      `Content-Transfer-Encoding: base64\r\n`,
      `Content-Disposition: attachment; filename="${filename}"\r\n\r\n`,
      `${fileData}\r\n\r\n`,
      `--foo_bar_baz--`].join('');
      //console.log(mail);
      mail=_getBase64(mail);
      let requestOptions = composeOptions(accessToken, mail);
      //return;
      return rp(requestOptions).catch((err) => {
        if(err.statusCode === 401){
          console.log("Refresh");
          refresh.requestNewAccessToken('google', user.google.refreshToken, function(err, accessToken) {
            if(err || !accessToken) {
              return Promise.reject("Cant refresh token")
            }
            user.google.accessToken = accessToken;
            user.markModified('google');
            user.save().then(() => {
              console.log("Saved new access token");
              return rp(composeOptions(accessToken, mail));
            });
          });
        }
        console.log("Error when sent mail", err.statusCode);

      });
    }
    var composeOptions=function(accessToken, mail) {
      return {
        url : server,
        method : "POST",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: mail
        })
      };
    }
    var readFile = function() {
      const location = path.join(__dirname, '../../uploads/2b5d75737ff29977fb429387122bb53a');
      const file = fs.readFileSync(location);
      const fileData = new Buffer(file).toString('base64');

      /*new Buffer(bitmap).toString('base64');
         console.log(fs.createReadStream(location));
         */
      return fileData;
    }
    return {
        send: send,
        readFile: readFile
    }
}();

module.exports = UserMailService;
