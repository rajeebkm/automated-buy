# from web3 import Web3, AsyncWeb3, AsyncHTTPProvider
# from eth_account import Account
# from dotenv import load_dotenv, dotenv_values
# import logging
# import json
# import asyncio

# # load_dotenv()
# config = dotenv_values(".env")

# logging.basicConfig(level=logging.DEBUG)

# token_addressA = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" # BEP20 USDT
# token_addressB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" # WBNB
# private_key = config.get('PRIVATE_KEY')
# logging.debug(private_key)
# amount_BNB_to_buy_with = Web3.to_wei(0.001, 'ether')  # Convert BNB amount to Wei, not in USD value
# logging.debug(amount_BNB_to_buy_with)
# no_of_buys = 2
# logging.debug(no_of_buys)

# # PancakeSwap Router address on Binance Smart Chain testnet (Ropsten)
# pancake_router_address = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"

# # Web3 provider for Binance Smart Chain testnet (Ropsten)
# web3Provider = Web3(Web3.HTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
# # w3 = AsyncWeb3(AsyncHTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))

# # Load the private key
# account = Account.from_key(private_key)
# logging.debug(account.address)

# # Get the contract ABI and address for PancakeSwap Router
# # PancakeSwap Router ABI
# router_abi_file_json = open('./contracts/abis/router_abi.json')
# pancake_router_abi = json.load(router_abi_file_json)
# # logging.debug(pancake_router_abi)
# # Create Instance of Pancakerouter Address Contract
# pancake_router = web3Provider.eth.contract(address=pancake_router_address, abi=pancake_router_abi)
# # logging.debug(pancake_router)
# sender_address = web3Provider.toChecksumAddress(account.address) #TokenAddress of holder
# tokenA_address = web3Provider.toChecksumAddress(token_addressA)  #First Token Address USDT
# tokenB_address = web3Provider.toChecksumAddress(token_addressB) #Second Token Address Cake

# tokenA_abi_file_json = open('./contracts/abis/tokenA_USDT_abi.json')
# tokenA_abi = json.load(tokenA_abi_file_json)

# tokenA = web3Provider.eth.contract(address=tokenA_address, abi=tokenA_abi)

# tokenB_abi_file_json = open('./contracts/abis/tokenB_WBNB_abi.json')
# tokenB_abi = json.load(tokenB_abi_file_json)

# tokenA = web3Provider.eth.contract(address=tokenA_address, abi=tokenA_abi)
# tokenB = web3Provider.eth.contract(address=tokenB_address, abi=tokenB_abi)
# #Approve Token before adding Liquidity

# totalSupplyA = tokenA.functions.totalSupply().call()
# print("Token A Total Supply: ", web3Provider.fromWei(totalSupplyA, 'ether'))
# totalSupplyB = tokenB.functions.totalSupply().call()
# print("Token B Total Supply: ", web3Provider.fromWei(totalSupplyB, 'ether'))

# balanceA = tokenA.functions.balanceOf(sender_address).call()
# print('Balance of Token A in account:', web3Provider.fromWei(balanceA, 'ether'))
# print('Balance A: ', balanceA)
# balanceB = tokenB.functions.balanceOf(sender_address).call()
# print('Balance of Token B in account:', web3Provider.fromWei(balanceB, 'ether'))
# print('Balance B: ', balanceB)


# start = time.time()
# approve = tokenA.functions.approve(panRouterContractAddress, balanceA).buildTransaction({
#            'from': sender_address,
#           'gasPrice': web3Provider.toWei('5','gwei'),
#           'nonce': web3Provider.eth.get_transaction_count(sender_address),
#           })

# signed_txn = web3Provider.eth.account.sign_transaction(approve, private_key=private)
# tx_token = web3Provider.eth.send_raw_transaction(signed_txn.rawTransaction)
# print("Approved: " + web3Provider.toHex(tx_token))


# #Creating Liquidity pair

# amountADesired = min(balanceA, balanceB) # find smaller of two balances
# if amountADesired == 0: # check balance, exit program if balance is zero
#     exit()

# print(amountADesired)
# amountBDesired = amountADesired
# amountAMin = 0
# amountBMin = 0
# to = sender_address
# deadline = int(time.time()) + 1000000

# nonce = web3Provider.eth.get_transaction_count(sender_address)

# addliq = contract.functions.addLiquidity(
#     tokenA_address, tokenB_address, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline
# ).buildTransaction({
#             'from': sender_address,
#             'value': web3Provider.toWei('0.01', 'ether'),
#             'gasPrice': web3Provider.toWei('5','gwei'),
#             'nonce': nonce,
#             })

# signed_txn = web3Provider.eth.account.sign_transaction(addliq, private_key=private)
# tx_token = web3Provider.eth.send_raw_transaction(signed_txn.rawTransaction)
# print("LP created: " + web3Provider.toHex(tx_token))