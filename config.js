module.exports = {
    //Webhook Configuration
    webhook: {
        id: "WEBHOOK_ID",
        token: "WEBHOOK_TOKEN",
        image = "https://cdn.discordapp.com/attachments/924712773324247082/930951236713336912/petoskey_gamers.png" //Image URL for Webhook avatar
    },

    //What emails to log?
    emailstoLog: "noreply@northmen",

    //Email Congiguration (Logging in options & all that)
    mailSettings: {
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
        mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
        attachments: false, // download attachments as they are encountered to the project directory
        attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
    }
}