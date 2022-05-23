const { SlashCommandBuilder } = require('@discordjs/builders');
const fsPromises = require('fs').promises;
const path = require('path');
const Petiano = require("../petiano");

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

//verify date format recieved by user
async function verifyDate(interaction, date){
    
    try {
        //pattern date
        const regex_date = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

        if(!regex_date.test(date) || parseInt(date.slice(0,2)) > 31 || parseInt(date.slice(3,5)) > 12)
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

//Main function
async function creatingDocument(date) {

    date = date.slice(6,10) + "/" + date.slice(3,5) + "/" + date.slice(0, 2);

    const petianos = await creatingObject(date);

    creatingJSON(petianos);
}

//Function that creates an Array with Petiano objects 
function creatingObject(date){
    const messages  = require("../index");
    
    date = new Date(date);
    let petianos = [];

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

//Recieve an object and update JSON file(petianos.json)
async function creatingJSON(obj){
    try{
        //Updating file that contains petianos
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'petianos.json'),
            JSON.stringify(obj)
        );
    } catch(err){
        console.log(err);
        await interaction.reply("Erro na atualização do arquivo");
    }
}

