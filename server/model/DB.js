var mysql = require('mysql');

var DB = function () {
    this.con = null;
    this.init("localhost", "root", "", "ip");
};

DB.prototype.init = function (host, user, password, database) {
    console.log("DB - Init");
    var obj = this;
    this.con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        charset : 'utf8mb4'
    });

    this.con.connect(function (err) {
        if (err) {
            throw err;
        }

        console.log("DB - Connected");
    });
};

DB.prototype.query = function (sql, response, dbHandler) {
    this.con.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {

            if (response !== undefined && dbHandler !== undefined) {
                dbHandler(response, result);
            }
        }
    });
};

module.exports = new DB();