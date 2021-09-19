const axios = require('axios');
const fs = require('fs');
const {parse} = require('node-html-parser');
const path = require('path');
const Discord = require('./Bot');

let check = (url, selector, name) =>  {
    Discord.logChannel?.send(`<a:loading:889137135268007978> **${name.toLowerCase()}** kontrol ediliyor...`).catch(console.error);   
    axios.get(url).then(response => {
        let content = parse(response.data).querySelector(selector);
        if(fs.existsSync(path.resolve(`./data/${name.toLowerCase()}.html`))) {
            let oldContent = fs.readFileSync(path.resolve(`./data/${name.toLowerCase()}.html`), 'utf-8');
            if(oldContent !== content.innerHTML) {
                    Discord.announcementChannel?.send(`<a:yes:889137114837557299>**Yeni Duyuru**\n\n ${name.toLowerCase()} yeni bir duyuru paylaştı. Kontrol etmek için tıkla: ${url}`);
                    fs.writeFileSync(path.resolve(`./data/${name.toLowerCase()}.html`), content.innerHTML);
            } else {
                Discord.logChannel?.send(`<a:no:889137038346055700>Yeni **${name.toLowerCase()}** duyurusu yok.`);
            }
        } else {
            // file doesn't exist, create it
            fs.writeFileSync(path.resolve(`./data/${name.toLowerCase()}.html`), content.innerHTML);
        }
        
        
    })
}
let Checker = (url, selector, name) => {
    if(Discord.Bot.isReady()) {
        check(url,selector,name);
    } else {
        setTimeout(() => {
            check(url, selector, name)
        }, 10 * 1000);
    }
}
module.exports = Checker;