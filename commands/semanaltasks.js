const { SlashCommandBuilder } = require('@discordjs/builders');
const Petiano = require("../petiano");

petiano = new Petiano("Hallyson", "data");

//Não tá funcionando
module.exports = {
    data: new SlashCommandBuilder()
        .setName('semanaltasks')
        .setDescription('Le as mensagens até a data especificada e cria um documento'),
    async execute(interaction) {
        await interaction.reply('Documento atualizado!');
    }
};