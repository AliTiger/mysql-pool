var mysql = require("mysql");
var Fiber = require("fibers");
var redis = require('redis');
 
var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : require("../config").mysql_db,
        connectionLimit :40
});
 
exports.getConnection = function(func) {
        pool.getConnection(func);
};
 
exports.query = function(sql, params, func) {
        pool.getConnection(function(err, conn) {
                var q = conn.query(sql, params, func);
                console.log(q.sql);
                conn.release();
        });
};
 
exports.fiber_query = function(sql, params) {
	var fiber = Fiber.current;
 
	exports.query(sql, params, function(err, rows) {
		if( err ) { throw err; }
		fiber.run(rows);
	});
 
	var rows = Fiber.yield();
	return rows;
}
