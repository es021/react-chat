var mysql = require('mysql');

var DB = function () {
    this.con = null;

    if (process.env.NODE_ENV === "development") {
        this.init("localhost", "root", "", "ip");
    } else {
        this.init("localhost", "root", "gundamseed21", "ip");
    }
};

DB.prototype.init = function (host, user, password, database) {
    console.log("DB - Init");
    var obj = this;
    this.con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        charset: 'utf8mb4'
    });
    this.con.connect(function (err) {

        if (err) {
            console.log("DB - Failed To Connect");
            throw err;
        } else {
            console.log("DB - Connected");
        }
    });
};

DB.prototype.query = function (sql, response, dbHandler) {
    this.con.query(sql, function (err, result) {
        if (err) {
            console.log("DB - Error On Query : " + sql);
            console.log(err);

        } else {

            if (response !== undefined && dbHandler !== undefined) {
                dbHandler(response, result);
            }
        }
    });
};

module.exports = new DB();