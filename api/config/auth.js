var url = "http://localhost:3000/";

if (process.env.PORT) {
    url = "https://hidden-peak-51879.herokuapp.com/";
}

//Move this to heroku config

module.exports = {
  'facebookAuth' : {
      API_ID: "601802039996133",
      API_SECRET: "d1594a016f8fa2cf14970ac60c28f9f3",
      CALLBACK_URL: url + "facebook/callback"
   },
   'twitterAuth' : {
       'consumerKey'       : 'your-consumer-key-here',
       'consumerSecret'    : 'your-client-secret-here',
       'callbackURL'       : url+"twitter/callback"
   },
   'googleAuth' : {
       'clientID'      : '163494853076-ejn8uv5u2v2rk9qiqbaf26omme8qcj5h.apps.googleusercontent.com',
       'clientSecret'  : 'sjrBid9dTm7IuEfnfTaDVQkJ',
       'callbackURL'   :  url+"google/callback"
   },
    'cloudinary': {
        cloud_name: 'dk7k5oewl',
        api_key: '785985275873887',
        api_secret: '2NDYjh6Zx6FGPd3QKqK_ClMJYog'
    }
};
