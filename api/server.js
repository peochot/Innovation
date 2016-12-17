import express from 'express';
import routesApi from './routes/index';
import authController from './controllers/authenthication';
import passport from './config/passport';
import bodyParser from 'body-parser';
import path from 'path';
import {Server} from 'http';
import {ioListener} from './config/socket';
import MolCrawler from './services/MolCrawler';
import MailService from './services/Mail';
import UserMailService from './services/UserMail';
import {CronJob} from 'cron';
import auth from './middlewares/auth';

const app = express();
const server = Server(app);
ioListener(server);

app.set('port',(process.env.PORT||3000));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api',bodyParser.json({limit: '3mb'}));
app.use(passport.initialize());
app.use('/api',auth);
app.use('/api', routesApi);
app.get('/facebook',authController.facebook);
app.get('/facebook/callback',authController.facebookCallback);
app.get('/google',authController.google);
app.get('/google/callback',authController.googleCallback);


app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

const job = new CronJob("15 14 * * *", function() {
   console.log('Start daily job crawler');
  }, function () {
    /* This function is executed when the job stops */
    console.log('Job finished');
  },
  true, /* Start the job right now */
  "Europe/Helsinki" /* Time zone of this job. */
);
server.listen(app.get('port'),function(){
  //MolCrawler.crawl();
  /*const fileData =UserMailService.readFile();
  UserMailService.send("ya29.Ci9pA6GTWXwnqwxJYaBRIH3qftggZl4xTkj4kApEf7-pieS06-YaZgW_gVsAb99_uA",
                      "beochot@gmail.com",'Huy Phan <huyphan1493@gmail.com>',"Yo what up ya ?",
                      'This is a content of my message  <img src=\"https://media4.giphy.com/media/10ECejNtM1GyRy/200_s.gif\"> ',"application/pdf","conkec.pdf",fileData)
                  .then((response)=>{
                    console.log(response);
                  },
                  (err)=>{
                    console.log(err);
                  });*/
  console.log('app is running on port '+app.get('port'));
});
export default server;
