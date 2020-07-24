const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;


module.exports = {
	name: 'coveredbtc',
	description: 'lot size',
	execute(message, args) {
	
	var address=args[0];
	
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

			if(result.data.data.deposits==undefined){
				message.channel.send('that address has no bonded eth');
				return;
			}

			else{
				const lotSize=(result.data.data.deposits[0].lotSize)/100000000;
				message.channel.send(`Your signing is group is covering ${lotSize} BTC`);
			}

		  });
		  
	},
};