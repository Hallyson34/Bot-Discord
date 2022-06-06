const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');

const main = async (name, todo, done, date) => {
    try{
        const docID = await verificaPlanilhaID(date)
        const doc = new GoogleSpreadsheet(docID);
        await doc.useServiceAccountAuth(credentials);
        await doc.loadInfo(); 
        const sheet = doc.sheetsByTitle[name];

        if(sheet){
            const sheetRows = await sheet.getRows();
    
            if(sheetRows.length > 0){

                const dateMessage = date;

                date = date.slice(6,10) + "/" + date.slice(3,5) + "/" + date.slice(0, 2);
                const nowDate = new Date(date);

                //last date in sheet
                let ldate = sheetRows[sheetRows.length-1].Data;
                ldate = ldate.slice(6,10) + "/" + ldate.slice(3,5) + "/" + ldate.slice(0, 2);
                const lastDate = new Date(ldate);

                if(nowDate > lastDate)
                    await sheet.addRow({ 'To Do': todo, 'Done': done, 'Data': dateMessage});

            } else {
                await sheet.addRow({ 'To Do': todo, 'Done': done, 'Data': date});
            }
        }
    } catch (err){
        console.log(err);
    }
}

//Verify wich sheet id will be used
function verificaPlanilhaID(date){
    if(date.slice(6,10) == '2022'){
        if(parseInt(date.slice(3,5)) < 7)
            return '1LQ-vMY0QhYFbKaTv7DE_NT6IITX6FeDLxoYytnOPj30'
        else
            return '1_TQwya6lMlkfwx7125G7YWMyAwo8hOYjPO7BUjFhoIs'
    } else if (date.slice(6,10) == '2023'){
        if(parseInt(date.slice(3,5)) < 7)
            return '1dbYXQSirhUxzcOs3RyULu9xoNu8oGsO1pzb4tZ7mhWw'
        else
            return '1wpkhB1WKUf_a2WmebS8NqOKxwLqXnTvJ6_Zmmf7KrFo'
    } else {
        console.log('Planilha não criada, atualize imediatamente!')
    }
}


module.exports = main;

