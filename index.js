const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const sqlite=require("sqlite3").verbose();


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



client.once('ready', () => {
	console.log('Ready!');

let db= new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);	

});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	let db= new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE);
	db.run('CREATE TABLE IF NOT EXISTS data(username TEXT NOT NULL, ratio INTEGER NOT NULL, address TEXT NOT NULL)');


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'setalert') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
	
		message.channel.send(`Great ! You've set up an alert and I'll DM you if your collateral ratio ever goes below ${args[0]}%.`);
		
		db.run(`INSERT INTO data VALUES(?,?,?)`, [message.author, args[0], args[1]], function(err) {
			if (err) {
			  return console.log(err.message);
			}
			// get the last insert id
		  });
		
		  // close the database connection
		  db.close();

		return;
	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

client.login(token);
