const { SlashCommandBuilder } = require('@discordjs/builders');

//Main function
function creatingDocument() {
    const Petiano = require("../petiano");
    petiano = new Petiano("Hallyson", "data");

    messagesFiltered = filteringMessages();
}

//Function that filter messages
function filteringMessages(){
    const messages  = require("../index");
    console.log(`1\n${messages[0].content}\n\n2${messages[1].content}\n`);

    return messages;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('semanaltasks')
        .setDescription('Le as mensagens até a data especificada e cria um documento'),
    async execute(interaction) {
        await creatingDocument();
        await interaction.reply('Documento atualizado!');
    }
};