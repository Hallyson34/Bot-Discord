const { SlashCommandBuilder } = require('@discordjs/builders');
const addSheet = require('../spreadsheets');

//Export command created for use through the BOT
module.exports = {
    data: new SlashCommandBuilder()
        .setName('semanaltasks')
        .setDescription('Le as mensagens até a data especificada e cria um documento')
        .addStringOption(option =>
            option.setName('data')
                .setDescription('Data da última reunião no formato dd/mm/aaaa')
                .setRequired(true)),
    async execute(interaction) {
        const date = interaction.options.getString('data');
        await verifyDate(interaction, date);      
    }
};

//verify date format recieved by user and call main function
async function verifyDate(interaction, date){
    
    try {
        //pattern date
        const regex_date = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

        //verify pattern date
        if(!regex_date.test(date) || parseInt(date.slice(0,2)) > 31 || parseInt(date.slice(3,5)) > 12)
            throw new Error('formato de data inválido!');    

        //format date and filter messages
        else{
            date = date.slice(6,10) + "/" + date.slice(3,5) + "/" + date.slice(0, 2);
            await filteringMessages(date);
        }

        await interaction.reply('Planilha atualizada!');
    

    } catch (err) {
        console.log(err);
        await interaction.reply("Formato de data inválido");
    }
    
}

//Function that filter messages before add to sheet
function filteringMessages(date){
    const messages = require("../index");
    
    date = new Date(date);

    for(i = 0; i < messages.length; i++){
        if(messages[i].data > date.getTime()){

            let username = messages[i].usr;

            let itodo = messages[i].content.indexOf("To Do");

            let idone = messages[i].content.indexOf("Done");

            if(itodo > idone){
                var done = messages[i].content.slice(0, itodo);
                var todo = messages[i].content.slice(itodo);
            } else {
                var todo = messages[i].content.slice(0, idone);
                var done = messages[i].content.slice(idone);
            }

            let data = formatarData(messages[i].data);

            addSheet(username, todo, done, data);
        }
    }
}

//Format date like that: Ex: 05/03/2022
function formatarData(date){
    
    date = new Date(date);

    const addZero = (num) => {
        if (num < 10)
            return "0" + num;
        return num;
    }

    return (addZero(date.getDate()).toString() + "/" + addZero(date.getMonth() + 1).toString() + "/" + date.getFullYear().toString());
}