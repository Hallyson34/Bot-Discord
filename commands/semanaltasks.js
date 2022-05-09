const { SlashCommandBuilder } = require('@discordjs/builders');

//Main function
function creatingDocument(date) {
    const Petiano = require("../petiano");
    petiano = new Petiano("Hallyson", "data");
    console.log(date);

    messagesFiltered = filteringMessages();
}

//Function that filter messages
function filteringMessages(){
    const messages  = require("../index");
    console.log(`1\n${messages[0].content}\n\n2${messages[1].content}\n`);

    return messages;
}

//verify date format 
async function verifyDate(interaction, date){
    
    try {
        //pattern date
        const regex_date = /\d{1,2}\D\d{1,2}\D\d{4}/g;

        if(!regex_date.test(date))
            throw new Error('formato de data inválido!');    
        else
            //call main function
            await creatingDocument(date);

        await interaction.reply('Documento atualizado!');

    } catch (err) {
        console.log(err);
        await interaction.reply("Formato de data inválido");
    }
    
}

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