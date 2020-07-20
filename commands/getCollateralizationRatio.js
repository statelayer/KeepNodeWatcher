const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const coingeckoethbtc = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth`;


module.exports = {
	name: 'collateralratio',
	description: 'eth btc collateral ratio',
	execute(message, args) {
	
	axios.get(coingeckoethbtc).then(function (response) {
	
	const ethbtcratio=response.data.bitcoin.eth;
	
	const address=args[0];
	console.log(address);
	console.log(args[1]);
	console.log(ethbtcratio);


		axios({
			url: 'https://api.thegraph.com/subgraphs/name/suntzu93/tbtc',
			method: 'post',
			data: {
			  query: `
			  {
		  bondedECDSAKeeps(where: {state: ACTIVE , keepAddress: "${address}" }) {
			keepAddress
			bondAmount
			timestamp
			state
		  }
		}
		
			  `
			}
		  }).then((result) => {

			if(result.data.data==undefined){
				message.channel.send('that address has no bonded eth');
				return;
			}

			if(isNaN(args[1])){
				return;
			}
			else{
				const bondAmount= result.data.data.bondedECDSAKeeps[0].bondAmount;
				console.log(bondAmount);
				var collateralratio=(bondAmount/(args[1])/ethbtcratio*100).toFixed(2);
				message.channel.send(`Your current collateral ratio is ${collateralratio}%`);
			}

		  });

		});
		  
	},
};
