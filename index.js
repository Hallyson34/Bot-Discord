const fs = require('node:fs');

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Requiring system variables
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

//Requiring to updating commands
const refreshCommands = require('./deploy-commands');
refreshCommands();

//Creating a new Collection of commands
client.commands = new Collection();

//Read all commands files from 'commands' folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Create a client.command dynamically 
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

//Create Listener for execute dynamically commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	//When "/semanaltasks" is called, grab the cache channel and export
	if(interaction.commandName === "semanaltasks"){
		await getCacheChannel();
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

//Grab cache channel, append messages to an array and export that
async function getCacheChannel() {
	//Create cache for channel "atualizacao-semanal"
	const channel = await client.channels.cache.get("968146786453708890");

	//Array that recieve messages objects
	const Messages = [];

	//Read 50 messages in the channel and console the amount of messages readed
	await channel.messages.fetch({ limit: 100 }).then(async (messages) => {
		//Iterate through the messages here with the variable "messages".
		messages.forEach( async(message) => {
			if(!message.author.bot){
				let author = await getAuthorDisplayName(message);
				//Create a template object for each message and add to array Messages
				Messages.push(new Msg(author, message.content, message.createdTimestamp));
			}			
		});
	});

	//export data from read messages
	module.exports = Messages;
}

const getAuthorDisplayName = async (msg) => {
	const member = await msg.guild.members.fetch(msg.author);
	return member ? member.nickname : msg.author.username;
  }

//Class that will be used to organize messages readeds
class Msg {
	constructor(usr, content, data){
        this.usr = usr;
		this.content = content;
        this.data = data; 
    }
}
