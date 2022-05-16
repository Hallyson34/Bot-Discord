const { SlashCommandBuilder } = require('@discordjs/builders');
const Petiano = require("../petiano");

//Main function
function creatingDocument(date) {

    date = date.slice(6,10) + "/" + date.slice(3,5) + "/" + date.slice(0, 2);

    petianos = creatingObject(date);

    //creatingJSON(petianos);
}

//Function that creates an Array with Petiano objects 
function creatingObject(date){
    const messages  = require("../index");
    
    date = new Date(date);
    petianos = [];

    for(i = 0; i < messages.length; i++){
        if(messages[i].data > date.getTime()){

            username = messages[i].usr.username;

            idone = messages[i].content.indexOf("Done");

            todo = messages[i].content.slice(0, idone);

            done = messages[i].content.slice(idone);

            data = formatarData(messages[i].data);

            petianos.push(new Petiano(username, todo, done, data));
        }
    }

    return petianos;

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

function formatarData(date){
    
    date = new Date(date);

    const addZero = (num) => {
        if (num < 10)
            return "0" + num;
        return num;
    }

    return (addZero(date.getDate()).toString() + "/" + addZero(date.getMonth() + 1).toString() + "/" + date.getFullYear().toString());
}