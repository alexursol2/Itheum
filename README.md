# Use of Technologies

## Introduction
Our project provide a data to users so we decide using technologies of Itheum that our clients could mint their data and store this information in blockchain. Itheum SDK give us simplified code to create a mint object and then use MultiversX SDK to send transaction

## Reasons why we use Itheum


## Importing Modules

### SftMinter
- SftMinter is imported from the "@itheum/sdk-mx-data-nft" library. This module is used for minting Data NFTs.

### useGetAccount
- useGetAccount is imported from the "@multiversx/sdk-dapp/hooks" library and is used to retrieve the user's account address.

### Address
- Address is imported from "@multiversx/sdk-core/out" and is likely used for handling addresses.

### refreshAccount
- refreshAccount is imported from "@multiversx/sdk-dapp/utils/account" and is used to refresh the user's account.

### sendTransactions
- sendTransactions is imported from "@multiversx/sdk-dapp/services" and is used for sending transactions.

## Getting the User's Address

- The code extracts the user's address using the useGetAccount function and stores it in the address variable.

## Creating a Transaction

- An asynchronous function createTransaction is defined to handle the minting of a Data NFT.
- It initializes an instance of SftMinter with the "devnet" parameter.
- The mint method of the minter instance is called to mint a Data NFT. It requires various parameters, including the user's address, NFT metadata URLs, and other details.

## Handling Transaction

- After creating the transaction, it awaits the completion of the transaction using the sendTransactions function. This function provides options for handling success and error messages.

## Error Handling

- The code includes error handling, with any errors being logged to the console.

# Expected Improvements

Our development team has identified several areas where improvements can enhance the usability and functionality of the Itheum SDK:

1. **Simplify Datamarshal URL Configuration:**
   - While appreciating the overall simplicity of the Itheum SDK, it's suggested that the need to configure the datamarshal URL in the `SftMinter` could be streamlined or automated to reduce developer overhead.

2. **Clarify Antispam Tax Requirements:**
   - To avoid potential issues, it's recommended that clear and comprehensive requirements for handling the antispam tax be provided. This will help developers better understand and manage this aspect.

3. **Enhance SftMinter Functionality:**
   - To improve the usability of the SDK, it would be beneficial if the `SftMinter` module not only handled the creation of objects (tx) but also offered the option to directly sign contracts or send transactions. This extended functionality would make the SDK even more versatile and developer-friendly.

4. **SBT (Soul bound token)**
   - Our team would like to see Soul bound token to freeze function in an nft for near future from Itheum

We appreciate the hard work put into the Itheum SDK by the development team and look forward to these improvements to make the SDK even more efficient and user-friendly.

# Gratitude

I would like to write thank you so much to a team of Itheum that provide quality suppport thanks to their developers we could integrate Itheum technologies for our project