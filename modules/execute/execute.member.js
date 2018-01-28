//login (Member login *if available*)

const mongojs = require('mongojs');
const db = mongojs("expensomate", ["Group", "Member"]);

var rejectIt = function(message, code) {
    var toSend = new Error(message)
    toSend.statusCode = code;
    return toSend;
};

var memberCreate = function(member, Group, memberData) {
    return new Promise(function(resolve, reject) {
        db.Member.findOne({
            username: memberData.username
        }, function(err, members) {
            if (!err) {
                console.log("member", members);
                if (members != null) {
                    db.Member.find({
                        username: memberData.username
                    }, function(err, response) {
                        if (!err) {
                            db.Group.findOne({
                                _id: mongojs.ObjectId(members.groupId)
                            }, function(error, result) {
                                if (!error && result != null) {
                                    resolve(result);
                                } else {
                                    var toSend = rejectIt("Error in creating Member", 400)
                                    reject(toSend);
                                }
                            })
                        } else {
                          var toSend = rejectIt("Error in creating Member", 400)
                          reject(toSend);
                        }
                    })
                } else {
                  var toSend = rejectIt("Error in creating Member", 400)
                  reject(toSend);
                }
            } else {
              var toSend = rejectIt("Error in creating Member", 400)
              reject(toSend);
            }
        })
    })
}



var memberLogin = function(inputData, Group, member, memberLoginResponse) {
    return new Promise(function(resolve, reject) {
        db.Group.findOne({
            _id: mongojs.ObjectId(inputData.groupId)
        }, function(err, groupResponse) {
            if (!err) {
                var username = groupResponse.name.toString() + groupResponse["_id"].toString();
                var password = groupResponse["_id"].toString();
                console.log("username", username);
                console.log("password", password);
                db.Member.update({
                    username: inputData.username
                }, {
                    $set: {
                        'accessToken': memberLoginResponse.id,
                        'memberId': inputData._id.toHexString()
                    }
                }, function(err, response) {
                    if (err) {
                        console.log("error", err);
                        reject(err);
                    } else {
                        console.log("response");
                        resolve(response)
                    }
                })
            } else {
                console.log("fall in group", err);
                reject(err);
            }
        })
    });
}

var findByIdFunction = function(ctx) {
    return new Promise(function(resolve, reject) {
        db.Member.findOne({
            memberId: ctx.args.id
        }, function(err, memberResponse) {
            if (!err) {
                if (ctx.req.headers.authorization && ctx.args.id) {
                    if (ctx.req.headers.authorization == ctx.result.accessToken) {
                          resolve("success");
                    } else {
                        reject(rejectKaro("Not Authorized", 400))
                    }
                } else {
                    reject(rejectKaro("Invalid inputs", 400))
                }
            }
        })
    });
}

module.exports = {};
module.exports.memberCreate = memberCreate;
module.exports.memberLogin = memberLogin;
module.exports.findByIdFunction = findByIdFunction;
