# InsideBlock
The final project of the third week of [Alchemy University](https://www.alchemy.com/university) consisted of developing an Ethereum Explorer.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [Tailwind CSS](https://tailwindcss.com), interacting with the [Alchemy SDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart) and [ethers.js](https://docs.ethers.org/v6/).

## Set up
1. Install dependencies by running npm install
2. Create the .env file and enter the alchemy api key with the name "REACT_APP_ALCHEMY_API_KEY = "
3. Start application by running npm run dev
4. Open [http://localhost:3000](http://localhost:3000) with your browser to interact w/ insideblock.

## Features InsideBlock
The main functions included in the project are as follows : 
- "latest blocks and transactions" : on the homepage you can see the latest blocks and transactions, there is an option to see more blocks and more transactions via : 
- "other blocks and other transactions" : to see the more recent blocks or transactions.
- "search bar" : allows searches based on transaction hash, hash or block height, and address (for now only supported by eoa).
Clicking on the block height, or using the search bar by entering the hash of the block or the block height you are rendered to : 
- block details: where other information is shown, i.e. block number, block hash, miner address, timestamp, number of transactions in the block, parent hash, gas used (also in the form of %), gas limit 
The same thing happens with transactions, clicking on the hash of a tx or searching it using the search bar you are rendered to  : 
- transaction details:  where other information is shown, i.e. tx hash, status, from, to, block, confirmation, value in eth, txfee, gasPrice, and gasUsed
Instead by entering the address of an eoa in the search bar, you are rendered to : 
- account page: where there is information about the account, such as :  address, balance, number of transactions and transactions divided into : 
    - transactions where the address is in the from field 
    - transactions where the address is in the to field
    - internal transactions 
- to conclude transaction hash, hash/block height and address are clickable and redirect to page with details

 ## Under the hood
 I consider these functions to be "under the hood" in the sense that they were not essential to the project, but they were nice to implement.
 1. Ethereum PriceFeed ATM : the price of ethereum is updated every refresh, this is through an Oracle [chainlink](https://docs.chain.link/data-feeds/price-feeds/addresses) that provides a contract and through [ethers.js](https://docs.ethers.org/v6/) you can create an instance of this contract to interact with it, and then fetch the price of ethereum at this time.
 2. Gas Price ATM : instead for gas price a function is made available by the SDK of alchemy
 3. Contract instead of an EOA in research? 
    - I implemented a check (via [ethers.js](https://docs.ethers.org/v6/)) to be able to check whether an address put in the search bar(or if clicked inside the explorer) represents an eoa or a contract, in the case of eoa it is rendered to the account address page explained above, in the case of contract instead it is rendered to another coming soon page, as it is not currently implemented

