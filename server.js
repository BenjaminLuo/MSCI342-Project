let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));



app.post('/api/addInterest', (req, res) => {
	// let string = JSON.stringify(recipes);

	let connection = mysql.createConnection(config);

	let user_place = req.body.place;
	let user_activity = req.body.activity;
	let user_time = req.body.time;
	let user_id = req.body.userID;


	let sql = `INSERT INTO user_activity (location, action, time, user_id)  
	VALUES (?, ?, ?, ?)`;
	console.log(sql);
	let data = [user_place, user_activity, user_time, user_id];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log("Sent items:" + data);
		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});

app.post('/api/contactUs', (req, res) => {
	let connection = mysql.createConnection(config);

	let name = req.body.name;
	let body = req.body.body;
	let email = req.body.email;
	let user_id = req.body.userID;

	let sql = `INSERT INTO contact_us (name, body, email, user_id1) VALUES (?, ?, ?, ?)`;
	connection.query(sql, [name, body, email, user_id], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end();
});

app.post('/api/getUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `SELECT * from user_settings WHERE user_id=${req.body.userID}`;

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		res.send(results[0]);
	});

	connection.end();
});

app.post('/api/updateUserSettings', (req, res) => {
	let connection = mysql.createConnection(config);

	let sql = `
		UPDATE user_settings 
		SET ${req.body.fieldToChange}="${req.body.newVal}"
		WHERE user_id=${req.body.userID}`;

	connection.query(sql, [], (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end();
});


app.post('/api/searchActivity', (req, res) => {
	// let string = JSON.stringify(recipes);

	let connection = mysql.createConnection(config);

	let user_place = req.body.place;
	let user_activity = req.body.activity;
	let user_time = req.body.time;
	let user_id = req.body.userID;

	let sql = `SELECT * FROM user_activity ua, user u WHERE u.id = ua.user_id`;
	let data = [];

	if (user_place) {
		sql = sql + ` AND ua.location = ?`;
		data.push(user_place);
	}
	if (user_activity) {
		sql = sql + ` AND ua.action = ?`;
		data.push(user_activity);
	}
	if (user_time) {
		sql = sql + ` AND ua.time = ?`;
		data.push(user_time);

	}

	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log("Sent items:" + data);
		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});



app.post('/api/addCalendar', (req, res) => {
	// let string = JSON.stringify(recipes);

	let connection = mysql.createConnection(config);

	let user_eventName = req.body.eventName;
	let user_startTime = req.body.startTime;
	let user_endTime = req.body.endTime;
	let user_id = req.body.userID;


	let sql = `INSERT INTO user_calendar (event, start, end, user_id)  
	VALUES (?, ?, ?, ?)`;
	console.log(sql);
	let data = [user_eventName, user_startTime, user_endTime, user_id];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		console.log("Sent items:" + data);
		console.log(results);
		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});




app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server
