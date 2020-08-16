const axios = require('axios').default;
const KeepAddress = `0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC`;
const coingeckoethbtc = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth`;


module.exports = {
	name: 'collateralratio',
	description: 'display all available commands',
	execute(message, args) {
	
	axios.get(coingeckoethbtc).then(function (response) {
	
	const ethbtcratio=response.data.bitcoin.eth;
	
	const address=args[0];
	console.log(address);
	console.log(ethbtcratio);

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
			console.log(result.data)
			if(result.data.data==undefined){
				message.channel.send('that address has no bonded eth');
				return;
			}

			else{
				const bondAmount= (result.data.data.deposits[0].bondedECDSAKeep.bondAmount);
				const lotSize=((result.data.data.deposits[0].lotSize)/100000000);
				console.log(bondAmount);
                var collateralratio=(bondAmount/(lotSize)/ethbtcratio*100).toFixed(2);
                var btceth=ethbtcratio.toFixed(2);
                message.channel.send(`Your signing group has a collateral ratio of ${collateralratio} %

`);
			}

		  });

		});
		  
	},
};