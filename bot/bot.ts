
import * as builder from "botbuilder"
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

export default (bot: builder.UniversalBot) => {
    bot.dialog("/", [
        async function (s) {
            console.log("s.message", s.message)
            // builder.Prompts.text(s, "name?");
            try{
                let u = await connector.getUserProfile(s.message.from.id)
                console.log("u" + u)
                if (u === undefined) {
                    s.send("who said:" + s.message.text)
                } else {
                    s.send("hello " + u.displayName)
                }
            }catch(e){
                s.send("can`t get user profile!")
            }
        },
        // function (s, r) {
        //     s.userData.name = r.response;
        //     console.log("after name", s.userData);
        //     builder.Prompts.number(s, "age?");
        // },
        // function (s, r) {
        //     console.log("after age", s.userData);
        //     s.userData.age = r.response;
        //     s.endDialog("bady " + s.userData.name);
        // }
    ]);
}
