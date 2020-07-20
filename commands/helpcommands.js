const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const UrlToFetch = `https://api.ethplorer.io/getTokenInfo/${KeepAddress}?apiKey=freekey`;


module.exports = {
	name: 'help',
	description: 'available commands',
	execute(message) {
	
	message.channel.send(`Start your commands with !watcher. Here are the available commands.

!watcher ethbonded youradress : Get the balance of ethbonded by your group
!watcher collateralratio youradress BTC : collateral ratio of your group
!watcher help : display available commands

at "youradress", put the ethereum adress of your signing group
at "BTC" , put the amount of BTC custodied by your signing group`);

	
		
	},
};
