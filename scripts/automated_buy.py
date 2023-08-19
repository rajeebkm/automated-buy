# from web3 import Web3, AsyncWeb3, AsyncHTTPProvider
# from eth_account import Account
# from dotenv import load_dotenv, dotenv_values
# import logging
# import json
# import asyncio


# # load_dotenv()
# config = dotenv_values("./envs/.env")
# # logging.basicConfig(level=logging.DEBUG)
# # logging.debug(config.get('PRIVATE_KEY'))
# private_key = config.get('WALLET_PRIVATE_KEY')
# print("Private Key: ", private_key)
# nodereal_api_key = config.get('NODEREAL_API_KEY')
# print("nodereal_api_key: ", nodereal_api_key)

# provider_rpc = {
#     'development': 'http://127.0.0.1:8545/',
#     'binanceTestnet': 'https://bsc-testnet.nodereal.io/v1/nodereal_api_key',
# }

# amount_BNB_to_buy_with = Web3.to_wei(0.001, 'ether')  # Convert BNB amount to Wei, not in USD value
# print("amount_BNB_to_buy_with: ", amount_BNB_to_buy_with)
# no_of_buys = 2
# print("no_of_buys: ", no_of_buys)

# # PancakeSwap Router address on Binance Smart Chain testnet
# pancake_router_address = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"

# # Web3 provider for Binance Smart Chain testnet (Ropsten)
# web3Provider = Web3(Web3.HTTPProvider(provider_rpc['development']))
# # w3 = AsyncWeb3(AsyncHTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))

# # Load the private key
# account = Account.from_key(private_key)

# # Get the contract ABI and address for PancakeSwap Router
# # PancakeSwap Router ABI
# router_abi_file_json = open('./contracts/abis/router_abi.json')
# pancake_router_abi = json.load(router_abi_file_json)
# # logging.debug(pancake_router_abi)
# # Create Instance of Pancakerouter Address Contract
# pancake_router = web3Provider.eth.contract(address=pancake_router_address, abi=pancake_router_abi)
# # logging.debug(pancake_router)

# sender_address = web3Provider.to_checksum_address(account.address) #TokenAddress of holder
# tokenA_address = web3Provider.to_checksum_address("0x337610d27c682E347C9cD60BD4b3b107C9d34dDd") # BEP20 USDT
# tokenB_address = web3Provider.to_checksum_address("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd") # WBNB

# tokenA_abi_file_json = open('./contracts/abis/tokenA_USDT_abi.json')
# tokenA_abi = json.load(tokenA_abi_file_json)

# tokenA = web3Provider.eth.contract(address=tokenA_address, abi=tokenA_abi)

# tokenB_abi_file_json = open('./contracts/abis/tokenB_WBNB_abi.json')
# tokenB_abi = json.load(tokenB_abi_file_json)

# tokenA = web3Provider.eth.contract(address=tokenA_address, abi=tokenA_abi)
# tokenB = web3Provider.eth.contract(address=tokenB_address, abi=tokenB_abi)

# #Approve Token before adding Liquidity
# totalSupplyA = tokenA.functions.totalSupply().call()
# print("Token A USDT Total Supply: ", web3Provider.from_wei(totalSupplyA, 'ether'))

# totalSupplyB = tokenB.functions.totalSupply().call()
# print("Token A WBNB Total Supply: ", web3Provider.from_wei(totalSupplyB, 'ether'))

# balanceA = tokenA.functions.balanceOf(sender_address).call()
# print('Balance of Token A (USDT) in account:', web3Provider.from_wei(balanceA, 'ether'))

# balanceB = tokenB.functions.balanceOf(sender_address).call()
# print('Balance of Token B (WBNB) in account:', web3Provider.from_wei(balanceB, 'ether'))

# balance = web3Provider.eth.get_balance(sender_address)
# print('Balance of tBNB in account:', web3Provider.from_wei(balance, 'ether'))

# # start = time.time()
# approveTx = tokenA.functions.approve(pancake_router, balanceA).transact()

# tx_receipt = web3Provider.eth.wait_for_transaction_receipt(approveTx)
# print("Approved: " + web3Provider.toHex(tx_receipt.transactionHash))

# # Function to buy TokenA
# def buy_token():
#     # for _ in range(no_of_buys):
#     #     nonce = provider.eth.get_transaction_count(account.address)
#     #     gas_price = provider.to_wei('5', 'gwei')  # Adjust gas price as needed
        
#         # Build the transaction
#         # tx = pancake_router.functions.swapExactETHForTokens(
#         #     0,  # Amount of TokenA to receive (0 for auto)
#         #     [provider.to_checksum_address("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"), token_address],  # Path: BNB -> TokenA
#         #     account.address,
#         #     provider.eth.get_block('latest').gasLimit - 40000,  # Adjust gas limit as needed
#         # ).transact()
#         # tx = pancake_router.functions.swapExactETHForTokens(
#         #     0,  # Amount of TokenA to receive (0 for auto)
#         #     [provider.to_checksum_address("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"), token_address],  # Path: BNB -> TokenA
#         #     account.address,
#         #     provider.eth.get_block('latest').gasLimit - 40000,  # Adjust gas limit as needed
#         # ).buildTransaction({
#         #     'chainId': 97,  # Binance Smart Chain testnet (Ropsten)
#         #     'gas': 3000000,  # Adjust gas limit as needed
#         #     'gasPrice': gas_price,
#         #     'nonce': nonce,
#         # })
        
#         # Sign and send the transaction
#         # signed_tx = w3.eth.account.signTransaction(tx, private_key=private_key)
#         # tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
#         # print("Transaction sent:", tx_hash.hex())
#         # tx_receipt = w3.eth.wait_for_transaction_receipt(tx)
#         # logging.debug(tx_receipt)
#         tx = pancake_router.functions.factory().call()
#         logging.debug(tx)
#         tx = pancake_router.functions.WETH().call()
#         logging.debug(tx)
        

# # Execute the buy function
# buy_token()
