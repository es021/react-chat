/**** APP INIT *****************************************/
var express = require('express');
var app = express();
var db = require('./model/DB.js');
var db_chat = require('./model/Chat.js');

const SERVER = "http://localhost";
const PORT = "3000";
const PORT_REACT_APP = "8080";


/*** API ********************************************/
function dbHandler(response, db_result) {
    response.send(db_result);
}

app.all('/*', function (req, res, next) {

    var allowedOrigins = [SERVER + ":" + PORT_REACT_APP, SERVER];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// date in format 6/20/16
// encodeURIComponent("6/20/16")  => 6%2F20%2F16
app.get('/v1/chat/date/:date', function (req, res) {
    var date = decodeURIComponent(req.params.date);
    var sql = db_chat.getByDate(date);
    db.query(sql, res, dbHandler);
});

/** cur_id wont be included in response **/
app.get('/v1/chat/page/:page', function (req, res) {
    var page = req.params.page;
    var sql = db_chat.getByPage(page);
    db.query(sql, res, dbHandler);
});

/** cur_id wont be included in response **/
app.get('/v1/chat/next/:cur_id', function (req, res) {
    var id = req.params.cur_id;
    var sql = db_chat.getByID(id, db_chat.NEXT);
    db.query(sql, res, dbHandler);
});

/** cur_id wont be included in response **/
app.get('/v1/chat/prev/:cur_id', function (req, res) {
    var id = req.params.cur_id;
    var sql = db_chat.getByID(id, db_chat.PREV);
    db.query(sql, res, dbHandler);
});

app.get('/v1/chat/search/:param', function (req, res) {
    var param = req.params.param;
    var sql = db_chat.searchChat(param);
    console.log(sql);
    db.query(sql, res, dbHandler);
});

app.get('/v1/chat/:from-:to', function (req, res) {
    X(req.params);
    var sql = "";
    db.query(sql, res, dbHandler);
});


app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});