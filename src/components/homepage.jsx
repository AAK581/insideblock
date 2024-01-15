"use client";
import React from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { IoCube } from "react-icons/io5";
import { formatEther} from "ethers"
import Link from 'next/link';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Homepage() {
  const [blockNumber, setBlockNumber] = useState(Number);
  const [blockList, setBlockList] = useState();
  const [transactionList, setTransactionList] = useState();

  useEffect(() => {
    const listBlocks = [];

    async function getLatestBlocks() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNumber);
        for (let i = blockNumber; i >= blockNumber - 7; i--) {
          const block = await alchemy.core.getBlockWithTransactions(i);
          listBlocks.push(block);
        }

        setBlockList(listBlocks);
      } catch {
        console.log("Cannot get recent block");
      }
    }

    async function getLatestTransactions() {
      try {
         await alchemy.core.getBlockWithTransactions(blockNumber)
          .then((block) => {
            setTransactionList(block.transactions);
          });
      } catch {
        console.log("Cannot get recent transactions");
      }
    }

    getLatestBlocks();
    getLatestTransactions();
   
  }, [blockNumber]);


  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="w-2/3 rounded p-4 border border-black-400 rounded-md shadow-md">
          <div>
            <div className="flex items-center ">
              <IoCube size="1.5em" className="mr-4" />
              <span className="text-4xl">Latest Blocks</span>
            </div>
  
            <hr />
            {blockList ? (
              <>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Altezza</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Time</th>
                    <th className="text-left">TXs</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {blockList.map((block) => (
                    <tr key={block.number}>
                      <td className="max-sm:text-sm">
                        <Link href={`/block/${block.number}`}>
                          {block.number}
                        </Link>
                      </td>
                      <td className="max-sm:text-sm">
                        {new Date(block.timestamp * 1000).toLocaleDateString()}
                      </td>
                      <td className="max-sm:text-sm">
                        {new Date(block.timestamp * 1000).toLocaleTimeString()}
                      </td>
                      <td className=" max-sm:text-sm">
                        {block.transactions.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr/>
              <div className="flex justify-center mt-4">
                <Link href={`/block/`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Show more
                  </button>
                </Link>
              </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-40 gap-2">
                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>

          


      <div className="flex justify-center mt-12 mb-6">
        <div className=" w-2/3 rounded p-4 border border-black-400 rounded-md shadow-md">
          <div>
            <div className="flex items-center ">
              <IoCube size="1.5em" className="mr-4" />
              <span className="text-4xl">Latest Transactions</span>
            </div>

            <hr />
            {transactionList ? (
              <>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Tx Hash</th>
                  <th className="text-left">From</th>
                  <th className="text-left">To</th>
                  <th className="text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="text-lg  ">
                {transactionList &&
                  transactionList.slice(0,8).map((tx) => (
                    <tr key={tx.hash}>
                      <td className="max-sm:text-sm"><Link href={`/tx/${tx.hash}`}>{`${tx.hash.substring(0, 6)}...${tx.hash.substring(62,66)}`}</Link></td>
                      <td className="max-sm:text-sm">{`${tx.from.substring(0, 6)}...${tx.from.substring(38,42)}`}</td>
                      <td className="max-sm:text-sm">{`${tx.to.substring(0, 6)}...${tx.to.substring(38,42)}`}</td>
                      <td className="max-sm:text-sm">{parseFloat(formatEther(tx.value._hex)).toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <hr/>
              <div className="flex justify-center mt-4">
                <Link href={`/tx/`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Show more
                  </button>
                </Link>
              </div>
              </>
             ) : (
              <div className="flex justify-center items-center h-40 gap-2">
                {/* Puoi sostituire con l'indicatore di caricamento desiderato */}
                <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>


    </>
  );
}
