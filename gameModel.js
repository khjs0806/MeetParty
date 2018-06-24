var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://MeetParty:meetp@cluster0-shard-00-00-fwavd.mongodb.net:27017,cluster0-shard-00-01-fwavd.mongodb.net:27017,cluster0-shard-00-02-fwavd.mongodb.net:27017/meet?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
var ObjectID = require('mongodb').ObjectID;

var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }
   db = database;
});

class GameModel {
   // 전체 도큐먼트 목록 얻기
   getGameList(callback) {
      // 콜백 기반
      // return db.collection('movies').find({}).toArray((err, docs) => {
      //    if ( err ) {
      //       return callback(err);
      //    }

      //    callback(null, docs);
      // });      

      // 프라미스 기반
      // return new Promise( (resolve, reject) => {
      //    db.collection('movies').find({}).toArray()
      //    .then( result => {
      //       resolve(result);
      //    })
      //    .catch( error => {
      //       reject(error);
      //    });
      // });       

      // 프라미스 기반2
      return db.collection('meet').find({}).toArray()
   }

   getGame(gname) {
      return db.collection('meet').find({name:{$regex:gname}}).toArray()
   }

   addGame(name, genre) {
       // TODO
   }
}

module.exports = new GameModel()