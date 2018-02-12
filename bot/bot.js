"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("./../conf");
var botbuilder_linebot_connector_1 = require("botbuilder-linebot-connector");
var connector = new botbuilder_linebot_connector_1.LineConnector({
    hasPushApi: false,
    autoGetUserProfile: false,
    // your line
    channelId: process.env.channelId || config.channelId,
    channelSecret: process.env.channelSecret || config.channelSecret,
    channelAccessToken: process.env.channelAccessToken || config.channelAccessToken
});
exports.default = (bot) => {
    bot.dialog("/", [
        function (s) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("s.message", s.message);
                // builder.Prompts.text(s, "name?");
                try {
                    let u = yield connector.getUserProfile(s.message.from.id);
                    console.log("u" + u);
                    if (u === undefined) {
                        s.send("who said:" + s.message.text);
                    }
                    else {
                        s.send("hello " + u.displayName);
                    }
                }
                catch (e) {
                    s.send("can`t get user profile!");
                }
            });
        },
    ]);
};
