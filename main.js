const Discord = require('discord.js')
const MailListener = require("mail-listener-fixed2");
const config = require('./config');

const webhookClient = new Discord.WebhookClient({ id: config.webhook.id, token: config.webhook.token });

const mailListener = new MailListener(config.mailSettings);

// Start the listener
mailListener.start();

console.log(`Scraper Started!\nMade by Hyperz#0001`)

// When it gets connected to the server
mailListener.on("server:connected", function() {
    console.log("imapConnected");
});

// If it gets disconnected
mailListener.on("server:disconnected", function() {
    console.log("imapDisconnected");
});

// If it encounters an error
mailListener.on("error", function(err) {
    console.log(err);
    try {
        mailListener.start()
    } catch (e) {
        console.log(`CAUGHT TRY CATCH ERROR (line 47): `, err)
    }
});

mailListener.on("mail", async function(mail, seqno, attributes) {
    let mailAuthor = mail.from.text.split('<')[1]
    if (mailAuthor.includes(config.emailstoLog)) {
        let subject;
        let text;
        if (!mail.subject) {
            subject = 'No subject found.'
        } else {
            subject = mail.subject
        }
        if (!mail.text) {
            text = 'No text found.'
        } else {
            text = mail.text
        }
        const mailEmbed = new Discord.MessageEmbed()
            .setColor('#036ffc')
            .setTitle('New Email!')
            .setDescription(`**Subject:**\n${subject}\n\n**Content:**\n${text}`)
            .setTimestamp()
        try { mailEmbed.setThumbnail(config.webhook.image) } catch (e) {}
        await webhookClient.send({
            username: 'Northmen Emails [NEWS]',
            avatarURL: config.webhook.image,
            embeds: [mailEmbed]
        }).catch(e => {
            console.log(`Webhook Sending Error: `, e)
        });
    }
});

process.on('unhandledRejection', (err) => {
    console.log(`FATAL ERROR: `, err.stack)
});