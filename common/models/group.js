'use strict';

const mongojs = require('mongojs');
var memberCreate = require('../../modules/execute/execute.member.js')
var db = mongojs("expensomate", ["Group", "Member"])

module.exports = function(Group) {
    var app = require('../../server/server.js');
    // Group.disableRemoteMethod("create", true);
    Group.disableRemoteMethod("find", true);
    Group.disableRemoteMethod("exists", true);
    Group.disableRemoteMethod("upsert", true);
    Group.disableRemoteMethod("count", true);
    Group.disableRemoteMethod("delete", true);
    Group.disableRemoteMethod("deleteById", true);
    Group.disableRemoteMethod("updateAll", true);
    Group.disableRemoteMethod("createChangeStream", true);
    Group.disableRemoteMethod("findOne", true);
    Group.disableRemoteMethod("__find__members", false);
    Group.disableRemoteMethod("__updateById__members", false);
    Group.disableRemoteMethod("__delete__members", false);
    Group.disableRemoteMethod("__destroyById__members", false);
    Group.disableRemoteMethod('__count__accessTokens', false);
    Group.disableRemoteMethod('__create__accessTokens', false);
    Group.disableRemoteMethod('__delete__accessTokens', false);
    Group.disableRemoteMethod('__destroyById__accessTokens', false);
    Group.disableRemoteMethod('__findById__accessTokens', false);
    Group.disableRemoteMethod('__updateById__accessTokens', false);
    Group.disableRemoteMethod('__get__accessTokens', false);

    Group.beforeRemote("*.__create__members", function(ctx, result, next) {

      console.log(ctx.args.data);

        if (!ctx.args.data.hasOwnProperty("email")) {
            var toSend = new Error("please enter the valid email");
            toSend.statusCode = 400;
            next(toSend);
        } else if (!ctx.args.data.hasOwnProperty("username")) {
            var toSend = new Error("please enter the valid username");
            toSend.statusCode = 400;
            next(toSend);
        } else if (!ctx.args.data.hasOwnProperty("phone")) {
            var toSend = new Error("please enter a valid phone");
            toSend.statusCode = 400;
            next(toSend);
        } else {
            next();
        }
    });


    Group.afterRemote("*.__create__members", function(ctx, result, next) {
        console.log("ctx,args.data", ctx.args.data);
        var member = app.models.Member;
        memberCreate.memberCreate(member, Group, result).then(function(response) {
            console.log("repsonse", response)
            next();
        }).catch(function(err) {
            console.log("error", err);
            next(err);
        })
    });
    // })
}
