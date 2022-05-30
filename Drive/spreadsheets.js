const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials.json');

//id geted by the url of spreadsheet
const docID = '1LQ-vMY0QhYFbKaTv7DE_NT6IITX6FeDLxoYytnOPj30';

const main = async (name, todo, done, date) => {
    try{
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(credentials);
        await doc.loadInfo(); 
        const sheet = doc.sheetsByTitle[name];
        const sheetRows = await sheet.getRows();
        
        if(sheetRows.length > 0){
            const nowDate = new Date(date);
            const lastDate = new Date(sheetRows[sheetRows.length-1].Data);

            if(nowDate > lastDate)
                await sheet.addRow({ 'To Do': todo, 'Done': done, 'Data': date});

        } else {
            await sheet.addRow({ 'To Do': todo, 'Done': done, 'Data': date});
        }
    } catch (err){
        console.log(err);
    }
    
}

module.exports = main;

