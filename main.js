const Checker = require('./functions/Checker');
const Config = require('./util/Config');

const CronJob = require('cron').CronJob;

let cron = new CronJob("*/5 * * * *", () => {
    Config.get("checks").forEach(check =>{
        Checker(check.url, check.selector, check.name);
    })
});
cron.start();
Config.get("checks").forEach(check =>{
    Checker(check.url, check.selector, check.name);
})