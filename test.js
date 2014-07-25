//调用
var db = require("mysql.js");
//查询
exports.get = function(req, res){
    db.query("select * from user",,function(err, users){
	    return res.render('userList',{users	:	users);
    });
};
