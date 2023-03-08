$(document).ready(function () {	
	
	let stakingContract;
	let tokenContract;
	let provider;
	async function initConnect() {


		provider = new ethers.providers.Web3Provider(window.ethereum)	
		signer = provider.getSigner();
		let contractAddress = "0x1d37C581aF4d09DaBaae4975BbDd933E83a3E990";
		let abi = [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "stakingToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "interestToken",
						"type": "address"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [],
				"name": "Staking__NeedsMoreThanZero",
				"type": "error"
			},
			{
				"inputs": [],
				"name": "Staking__TransferFailed",
				"type": "error"
			},
			{
				"inputs": [],
				"name": "Withdraw__TransferFailed",
				"type": "error"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"name": "claim_event",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"name": "stake_event",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"name": "withdraw_event",
				"type": "event"
			},
			{
				"inputs": [],
				"name": "INTEREST_RATE",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "claimReward",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "claimable",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "earned",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "getStaked",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "getStakedAccount",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "s_interestEarned",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "s_interestToken",
				"outputs": [
					{
						"internalType": "contract IERC20",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "s_stakeBalances",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "s_staketime",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "s_stakingToken",
				"outputs": [
					{
						"internalType": "contract IERC20",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "s_userInterestPaidHistory",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "stake",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "updateStakeTime",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "withdraw",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

		stakingContract = new ethers.Contract( contractAddress , abi , signer );
		let tokenContractAddress = "0xEf7D8390d939a8770a51054885936E7Eb6148E48";
		let tokenABI = [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "decimals",
				"outputs": [
					{
						"internalType": "uint8",
						"name": "",
						"type": "uint8"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "subtractedValue",
						"type": "uint256"
					}
				],
				"name": "decreaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "addedValue",
						"type": "uint256"
					}
				],
				"name": "increaseAllowance",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

		tokenContract = new ethers.Contract( tokenContractAddress , tokenABI , signer );

		
		//------------------------------------- METAMASK BOILERPPLATE------------------//
	
		window.ethereum.on('chainChanged', handleChainChanged);
		window.ethereum.on('accountsChanged', handleAccountsChanged);

		}

	
	function handleChainChanged(_chainId) {
	  // We recommend reloading the page, unless you must do otherwise
	  console.log("changed chain, We recommend reloading the page"+_chainId)
	}
	
	function handleAccountsChanged(accounts) {
	  // We recommend reloading the page, unless you must do otherwise
	  console.log("acccount changed, We recommend reloading the page "+ accounts)
	}
	
	$("#connect").click(async function async() {
		initConnect();
		await provider.send("eth_requestAccounts", []);
		signer = provider.getSigner()
		console.log(signer);
		$("#connect").text(await signer.getAddress());
		

	});


	// $("#get_status").click(async function async() {
	// 	console.log("transferring")
	// 	await provider.send("eth_requestAccounts", []);
	// 	status_t = "this wallet connected : " + provider.getSigner();
	// 	$("#status").text(JSON.stringify(status_t));

	// });
	// $("#add_candidate").click(async function async() {
		
	// 	let name = $('#candidate_name').val();
	// 	let tx = await contract.addCandidate(name);
	// 	console.log(tx)	

	// });

	$("#approve").click(async function async() {
		let amount = $('#approve_value').val();
		console.log("amount : "+amount);
		let tx1 = await tokenContract.approve(stakingContract.address, amount);
		console.log(tx1);
	});

	$("#stake").click(async function async() {
		let amount = $('#stake_value').val();
		console.log("amount : "+amount);
		let tx2 = await stakingContract.stake(amount);
		console.log(tx2);
		$("#stake_status").html("Staking in progress!");
		// A filter that matches my Signer as the author
		let filter = stakingContract.filters.stake_event(signer.address);
		console.log(filter);
		stakingContract.once(filter, (author, msg) => {
    		console.log(msg + "for address :"+author);
			$("#stake_status").html("Successfully staked!");
		});
	});

	$("#withdraw").click(async function async() {
		
		let amount = $('#withdraw_value').val();
		// console.log("amount : "+amount)
		// let tx1 = await tokenContract.approve("0x0eDAc18ee491aDea7889FC1ff6f187BA40bc2F70", amount)
		let tx2 = await stakingContract.withdraw(amount);
		console.log(tx2);
		$("#withdraw_status").html("Withdrawal in progress!");
		// A filter that matches my Signer as the author
		let filter = stakingContract.filters.withdraw_event(signer.address);
		console.log(filter);
		stakingContract.once(filter, (author, msg) => {
    		console.log(msg + "for address :"+author);
			$("#withdraw_status").html("Successfully withdrawn! Please check your wallet for updated balance.");
		});
	});

	$("#claim_reward").click(async function async() {
		let tx = await stakingContract.claimReward();
		console.log(tx);
		$("#claim_reward_status").html("Claim in progress!");
		// A filter that matches my Signer as the author
		let filter = stakingContract.filters.claim_event(signer.address);
		stakingContract.once(filter, (author, msg) => {
    		console.log(msg + "for address :"+author);
			$("#claim_reward_status").html("Successfully claimed! Please check your wallet for updated balance.");
		});
	});

	$("#claimable").click(async function async() {
		//let address = $('#address_claimable').val();
		let count = await stakingContract.claimable();
		$("#claimable_status").text(parseInt(count));
		console.log(count);
	});


	$("#total_reward_earned").click(async function async() {
		//let address = $('#address_total_reward_earned').val();
		let count = await stakingContract.earned();
		$("#total_reward_earned_status").text(parseInt(count));
		console.log(count);
	});

	$("#get_staked").click(async function async() {
		//let address = $('#address_get_staked').val();
		let count = await stakingContract.getStaked();
		$("#get_staked_status").text(count);
		console.log(count);
	});

	// $("#add_voter").click(async function async() {
	// console.log("add voter")
	// 	let name = $('#voter_wallet').val();
	// 	let tx = await contract.addVoter(name);
	// 	console.log(tx)	
	
	// });


	// $("#get_list").click(async function async() {
		

	// 	let count = await contract.getCandidateCount();
			
	// 	var candidates = "";
	// 	$("#candidate_buttons").empty();
	// 	for (var i = 0; i < count; i++) {

	// 		let canidateNm = await contract.candidates(i);
				
	// 		candidates = canidateNm + ", " + candidates;
	// 		var r = $('<button value="' + canidateNm + '">' + canidateNm + '</button>');
	// 		r.click(function () { vote(this); });
	// 		console.log(r);
	// 		$("#candidate_buttons").append(r);
	// 	}
	// 	$("#candidates").text("click on button below to vote");
	// });
	// async function vote(nm) {
	// 	console.log(nm.value);
	// 	const tx = await contract.vote(nm.value); 
	// 	console.log(tx)
	// }
	// $("#start").click(async function async() {
	// 	const tx = await contract.startElection(); 
	// 	console.log(tx)
		
	// });
	
	
	// $("#vote").click(async function async() {

		
	// });
	// $("#get_leader").click(async function async() {
		

	// });
	// $("#end").click(async function async() {

	// 	const tx = await contract.endElection(); 
	// 	console.log(tx)
		
	// });

	// $("#get_winner").click(async function async() {
	// 	let winner = await contract.getWinner();
	// 	$("#get_winner").text(winner);
		
	// });

	// $("#restart").click(async function async() {
	// 	let tx = await contract.restartElection();
	// 	console.log(tx)	
	
	// });
	
	
	$("#sign").click(async function async() {
		await provider.send("eth_requestAccounts", []);
		signer = provider.getSigner();
		const sign = await ethereum.request({ method: 'personal_sign', params: [await signer.getAddress(), "please sign me"] });
		console.log(sign);
	
	});
	//client -> Sign(Address, "message") ------> sigedPayload, message ----> verify(payload, message) -> address
	


});

