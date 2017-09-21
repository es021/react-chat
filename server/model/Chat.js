var db = require('./DB.js');

/*
 *  Format
 * {"id":1,"date":"6/20/16","time":"8:29:28 AM","unixtimestamp":1466404168,"sender":"Siti Huwaida","message":"Salam Sahang\r"}
 */

var Chat = function () {
    this.LIMIT = 20;
    this.SEARCH_LIMIT = 10;
    this.MIN_SEARCH_RELEVANCE = 0.2;

    this.DB_NAME = "react_chat";
    this.COL_ID = "id";
    this.COL_DATE = "date";
    this.COL_TIME = "time";
    this.COL_UNIX_DT = "unixtimestamp";
    this.COL_SENDER = "sender";
    this.COL_MESSAGE = "message";
    this.NEXT = "next";
    this.PREV = "prev";
};


Chat.prototype.getByDate = function (date) {
    var sql = "SELECT * FROM ?? WHERE ?? >= ? LIMIT ?, ?";
    var params = [this.DB_NAME, this.COL_DATE, date, 0, this.LIMIT];
    sql = db.con.format(sql, params);
    return sql;
};

Chat.prototype.searchChat = function (param) {
    /*
     var sql = "SELECT chat.*, MATCH(??) AGAINST (?) as relevance ";
     sql += "FROM ?? chat ";
     sql += "WHERE MATCH (??) AGAINST(? IN BOOLEAN MODE) ";
     sql += "HAVING relevance > ? ORDER BY relevance DESC ";
     sql += "LIMIT ?, ?";
     
     var params = [this.COL_MESSAGE, param,
     this.DB_NAME,
     this.COL_MESSAGE, "+" + param + "*",
     this.MIN_SEARCH_RELEVANCE,
     0, this.SEARCH_LIMIT];
     */

    var sql = "SELECT chat.* ";
    sql += "FROM ?? chat ";
    sql += "WHERE MATCH (??) AGAINST(? IN BOOLEAN MODE) ";
    sql += "LIMIT ?, ?";

    var params = [this.DB_NAME,
        this.COL_MESSAGE, "+" + param + "*",
        0, this.SEARCH_LIMIT];

    sql = db.con.format(sql, params);
    return sql;
};

Chat.prototype.getByPage = function (page) {

    var start = (page - 1) * this.LIMIT;

    var sql = "SELECT * FROM ?? ORDER BY ?? ASC LIMIT ?, ?";

    var params = [this.DB_NAME, this.COL_ID,  start, this.LIMIT];
    sql = db.con.format(sql, params);
 

    return sql;
};

Chat.prototype.getByID = function (id, direction) {
    var sql = "";
    if (direction === this.NEXT) {
        sql = "SELECT * FROM ?? WHERE ?? > ? ORDER BY ?? ASC LIMIT ?, ?";
    } else if (direction === this.PREV) {
        sql = "SELECT * FROM ?? WHERE ?? < ? ORDER BY ?? DESC LIMIT ?, ?";
    }

    var params = [this.DB_NAME, this.COL_ID, id, this.COL_ID, 0, this.LIMIT];
    sql = db.con.format(sql, params);

    return sql;
};

module.exports = new Chat();

