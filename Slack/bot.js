// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App, LogLevel } = require("@slack/bolt");
const fs = require("fs");

const app = new App({
    token: "secret",
    signingSecret: "secret",
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG,
});

// app.message(async ({ message, say }) => {
//     fs.appendFile("log.txt", message.text);
// });
app.message(async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    fs.appendFileSync("log.txt", message.user + ":" + message.text + "\n");
});

(async () => {
    //Start up the app
    const server = await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running!", server.address());
})();
//https://api.slack.com/apps/A0209T789RN/oauth?
// https://api.slack.com/authentication/token-types#bot
