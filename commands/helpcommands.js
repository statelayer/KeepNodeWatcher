const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const UrlToFetch = `https://api.ethplorer.io/getTokenInfo/${KeepAddress}?apiKey=freekey`;


module.exports = {
	name: 'help',
	description: 'available commands',
	execute(message) {
	
		message.channel.send(`Start your commands with !watcher. Here are the available commands.

!watcher summary youraddress : various stats about your signing group
!watcher ethbonded youraddress : Get the balance of ethbonded by your group
!watcher collateralratio youraddress : collateral ratio of your group
!watcher coveredbtc youraddress : lotsize covered by your group
!watcher help : display available commands


At "youraddress", put the ethereum adress of your signing group.

This is a work-in-progress, lots more features coming. Feedback welcome, ping me @StateLayer. 
`);

	
		
	},
};
