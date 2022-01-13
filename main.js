const Discord = require('discord.js')
const MailListener = require("mail-listener-fixed2");

const webhookurl = { id: "YOUR_WEBHOOK_ID", token: "YOUR_WEBHOOK_TOKEN" };
const webhookClient = new Discord.WebhookClient({ id: webhookurl.id, token: webhookurl.token });
let imageurl = "https://cdn.discordapp.com/attachments/924712773324247082/930951236713336912/petoskey_gamers.png"; // image URL for webhooks
let emailsToLog = "noreply@northmen"; // The email author to log emails from (line 50)

const mailListener = new MailListener({
    username: "demo@gmail.com",
    password: "demo1234",
    host: "imap.gmail.com", // (default to gmail))
    port: 993, // imap port (default to gmail)
    tls: true, // (default to gmail)
    connTimeout: 10000, // Default by node-imap
    authTimeout: 6000, // Default by node-imap,
    debug: console.log, // Or your custom function with only one incoming argument. Default: null
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor (default to gmail)
    searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: false, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: false, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: false, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

// Start the listener
mailListener.start();

console.log(`Scraper Started!\nMade by Hyperz#0001`)

// When it gets connected to the server
mailListener.on("server:connected", function(){
    console.log("imapConnected");
});

// If it gets disconnected
mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
});

// If it encounters an error
mailListener.on("error", function(err){
    console.log(err);
});

mailListener.on("mail", async function(mail, seqno, attributes){
    let mailAuthor = mail.from.text.split('<')[1]
    if(mailAuthor.includes(emailsToLog)) {
        let subject;
        let text;
        if(!mail.subject) {
            subject = 'No subject found.'
        } else {
            subject = mail.subject
        }
        if(!mail.text) {
            text = 'No text found.'
        } else {
            text = mail.text
        }
        const mailEmbed = new Discord.MessageEmbed()
        .setColor('#036ffc')
        .setTitle('New Email!')
        .setDescription(`**Subject:**\n${subject}\n\n**Content:**\n${text}`)
        .setTimestamp()
        try { mailEmbed.setThumbnail(imageurl) } catch(e) {}
        await webhookClient.send({
            username: 'Northmen Emails [NEWS]',
            avatarURL: imageurl,
            embeds: [mailEmbed]
        }).catch(e => {
            console.log(`Webhook Sending Error: `, e)
        });
    }
});

process.on('unhandledRejection', (err) => {
    console.log(`FATAL ERROR: `, err.stack)
});
