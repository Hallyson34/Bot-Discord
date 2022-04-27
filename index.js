const fs = require('node:fs');

// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Requiring system variables
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

//Updating commands, can comments these lines after develop
const refreshCommands = require('./deploy-commands');
refreshCommands;

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

	if(interaction.commandName === "semanaltasks"){
		//Create cache for channel "atualizacao-semanal"
		const channel = client.channels.cache.get("968146786453708890");
		//Read 50 messages in the channel and console the amount of messages readed
		channel.messages.fetch({ limit: 50 }).then(messages => {
			console.log(`Received ${messages.size} messages`);

			//Iterate through the messages here with the variable "messages".
			messages.forEach(message => console.log(message.createdAt));
		})		
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
