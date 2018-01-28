var request = require('request');
var mongojs = require('mongojs');
var Promise = require('bluebird');
var db = mongojs("expensomate", ["Member", "Expense"]);

var executeMember = require('../../modules/execute/execute.member.js')

var rejectIt = function(message, code) {
    var toSend = new Error(message)
    toSend.statusCode = code;
    return toSend;
};


function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


module.exports = function(Member) {
    var app = require('../../server/server')
    // Member.disableRemoteMethod("find", true);
    // Member.disableRemoteMethod("update", true);
    // Member.disableRemoteMethod("count", true);
    // Member.disableRemoteMethod("delete", true);
    // Member.disableRemoteMethod("deleteById", true);
    Member.disableRemoteMethod("findById", true);
    Member.disableRemoteMethod("exists", true);
    Member.disableRemoteMethod("upsert", true);
    Member.disableRemoteMethod("updateAll", true);
    Member.disableRemoteMethod("createChangeStream", true);
    Member.disableRemoteMethod("findOne", true);
    Member.disableRemoteMethod("updateAttributes", true);
    Member.disableRemoteMethod("__get__expense", false);
    Member.disableRemoteMethod('__count__accessTokens', false);
    Member.disableRemoteMethod('__create__accessTokens', false);
    Member.disableRemoteMethod('__delete__accessTokens', false);
    Member.disableRemoteMethod('__destroyById__accessTokens', false);
    Member.disableRemoteMethod('__findById__accessTokens', false);
    Member.disableRemoteMethod('__updateById__accessTokens', false);
    Member.disableRemoteMethod('__get__accessTokens', false);
    Member.disableRemoteMethod("confirm", true);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //login (Member login *if available*)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    Member.afterRemote("login", function(ctx, result, next) {
            console.log("ctx", ctx.args.credentials);
            console.log("result", result)
            var res = result;
            if (res != undefined) {
                db.Member.findOne({
                    username: ctx.args.credentials.username
                }, function(err, doc) {
                    if (doc) {
                        executeMember.memberLogin(doc, app.models.Group, app.models.Member, res).then(function(response) {
                            console.log("response", response);
                        }).catch(function(err) {
                            console.log("error", err);
                            next(err);
                        })
                        next();
                    } else {
                        console.log("error", err);
                        next(err);
                    }
                })
            } else {
                var toSendError = new Error('invalid input');
                toSendError.statusCode = 400;
                next(toSendError)
            }
        })
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Member.afterRemote("findById", function(ctx, result, next) {
        executeMember.findByIdFunction(ctx).then(function(response) {
            console.log("response", response);
            next();
        }).catch(function(err) {
            console.log("err", err)
            next(err);
        })
    })

    Member.beforeRemote("*.__create__expenses", function(ctx, result, next) {
        if (!ctx.args.data.hasOwnProperty("amount")) {
            var toSend = new Error("please enter a valid amount");
            toSend.statusCode = 400;
            next(toSend);
        } else {
            next();
        }
    });

}
