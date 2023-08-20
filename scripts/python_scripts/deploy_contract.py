# import sys
# import time
# import pprint

# from web3.providers.eth_tester import EthereumTesterProvider
# from web3 import Web3
# from eth_tester import PyEVMBackend
# from solcx import compile_source
# from eth_account import Account
# import solcx
# from dotenv import load_dotenv, dotenv_values
# # w3 = Web3(Web3.HTTPProvider('HTTP_ENDPOINT'))
# from web3.middleware import construct_sign_and_send_raw_middleware
# from eth_account import Account
# import os


# def compile_source_file(file_path):
# #    with open(file_path, 'r') as f:
# #       source = f.read()
#     tokenA = open('./TokenA.sol')
#     source = tokenA.read()

#     return compile_source(source,output_values=["abi","bin"])


# config = dotenv_values(".env")
# # logging.basicConfig(level=logging.DEBUG)
# # logging.debug(config.get('PRIVATE_KEY'))

# private_key = config.get('PRIVATE_KEY')
# # account = Account.from_key(private_key)
# def deploy_contract(w3, contract_interface):
#     tx_hash = w3.eth.contract(
#         abi=contract_interface['abi'],
#         bytecode=contract_interface['bin']).constructor("SPEARMINT", "SPEARMINT").transact()

#     address = w3.eth.get_transaction_receipt(tx_hash)['contractAddress']
#     return address


# # w3 = Web3(EthereumTesterProvider(PyEVMBackend()))
# w3 = Web3(Web3.HTTPProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
# # acct = w3.eth.account.from_key(os.environ.get('PRIVATE_KEY'))
# acct = w3.eth.account.from_key(private_key)
# w3.middleware_onion.add(construct_sign_and_send_raw_middleware(acct))
# w3.eth.default_account = acct.address
# print(w3.eth.default_account)
# # contract_source_path = 'TokenA.sol'
# compiled_sol = compile_source_file('TokenA.sol')

# contract_id, contract_interface = compiled_sol.popitem()

# address = deploy_contract(w3, contract_interface)
# print(f'Deployed {contract_id} to: {address}\n')

# # TokenA_contract = w3.eth.contract(address=address, abi=contract_interface["abi"])

# # gas_estimate = TokenA_contract.functions.setVar(255).estimate_gas()
# # print(f'Gas estimate to transact with setVar: {gas_estimate}')

# # if gas_estimate < 100000:
# #      print("Sending transaction to setVar(255)\n")
# #      tx_hash = TokenA_contract.functions.setVar(255).transact()
# #      receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
# #      print("Transaction receipt mined:")
# #      pprint.pprint(dict(receipt))
# #      print("\nWas transaction successful?")
# #      pprint.pprint(receipt["status"])
# # else:
# #      print("Gas cost exceeds 100000")