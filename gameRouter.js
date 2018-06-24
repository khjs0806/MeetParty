var express = require('express');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://MeetParty:meetp@cluster0-shard-00-00-fwavd.mongodb.net:27017,cluster0-shard-00-01-fwavd.mongodb.net:27017,cluster0-shard-00-02-fwavd.mongodb.net:27017/meet?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const gameModel = require('./gameModel');
var db;

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err);
      return;
   }
   db = database;
});

// 라우터 얻기
var router=express.Router();

router.route('/game')
	.get(showGame)

router.route('/game/:name')
	.get(showGame)
	
		

module.exports = router;



// 전체 도큐먼트 목록 얻기
function showGameList(req, res, next) {
   // 직접 데이터베이스에 접근
	// db.collection('movies').find({}).toArray((err, docs) => {
	// 	if ( err ) {
	// 		return next(err);
	// 	}

	// 	let result = {
	// 		count: docs.length,
	// 		data: docs
	// 	}		
	// 	res.send(result);
	// });

	// 모델 사용 - 콜백 기반
	// movieModel.getMovieList( (err, results) => {
	// 	if ( err ) {
	// 		return next(err);
	// 	}

	// 	let resObj = {
	// 		count: results.length,
	// 		data: results
	// 	}		
	// 	res.send(resObj);
	// });

	gameModel.getGameList().then( results => {
		let resObj = {
			count: results.length,
			data: results
		}		

		res.sendFile(__dirname + '/index3.html');
	}).catch( error => {
		console.log('error : ', error);
		next(error);
	});
}

async function showGame(req, res, next) {
	let name = req.query.name;
	console.log(name);
	gameModel.getGame(name).then( results => {
		console.log("What");
		let resObj = {
			count: results.length,
			data: results
		}		
		console.log("What2");
		res.setHeader("data",JSON.stringify(resObj));
		res.sendFile(__dirname + '/index3.html');
		console.log("What3");
	}).catch( error => {
		console.log("FUCK");
		console.log('error : ', error);
		next(error);
	});
}

function addGame(req, res, next) {
   // TODO : 새 영화 추가

   // 바디 파서
   let name = req.body.name;
   let genre = req.body.genre;
   // 모델에 호출
   gameModel.addGame(name,genre);

   // 결과
   res.send('TODO : 새 영화 추가');
}

function deleteGame(req, res) {
   // TODO : 영화 삭제
}

// 영화 수정
function editGame(req, res) {
   // TODO
}