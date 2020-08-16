const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const coingeckoethbtc = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth`;

const axios = require('axios').default;


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

});

client.on('message', message => {

	if (!message.content.startsWith(prefix) ) return;

	let db= new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE);

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'run') {

		setInterval(function(){	let sql = `SELECT username, ratio, address FROM data`;
		
			var ratiosToDelete=new Array();
			//check if anyone's collateral ratio is lower than the amount they asked
			//if yes, send an alert tot the person
			//start again 30 seconds later
			
			db.all(sql, function(err,rows){
				if(err) return cb(err);
				
				rows.forEach(function (row) { 
				const username=row.username;
				const ratio=row.ratio;
				const address=row.address;
				axios.get(coingeckoethbtc).then(function (response) {
	
					const ethbtcratio=response.data.bitcoin.eth;
				
						axios({
							url: 'https://api.thegraph.com/subgraphs/name/suntzu93/tbtc',
							method: 'post',
							data: {
							  query: `
							  {
								deposits(where:{keepAddress:"${address}"}){
								  bondedECDSAKeep {
									id
									bondAmount
								  }
								  id
								  state
								  lotSize
								}
							  }
						
						
							  `
							}
						  }).then((result) => {
							if(result.data.data==undefined){
							}
				
							else{
								const bondAmount= (result.data.data.deposits[0].bondedECDSAKeep.bondAmount);
								const lotSize=((result.data.data.deposits[0].lotSize)/100000000);								var collateralratio=(bondAmount/(lotSize)/ethbtcratio*100).toFixed(2);
								var btceth=ethbtcratio.toFixed(2)
								if(collateralratio<ratio){
									let person1 = username.slice(2, -1); 
									console.log(person1);
									client.users.fetch(person1).then((user) => {
										user.send(`Your current collateral ratio (${collateralratio}%) is lower than the treshold you set an alert for (${ratio}%)`
										);
									});									
									
									db.run(`DELETE FROM data WHERE username LIKE '%${username}%' AND ratio=${ratio} AND address='${address}'`, function(err) {
										if (err) {
										  return console.error(err.message);
										}
									  });
								}
								;}
				
						  });
				
						});

				}); 
				return;
			});	 }, 30000);
		 

	}

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

client.login(token);
