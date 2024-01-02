"use client";
import Navbar from "@/components/navbar";
import { useState, useEffect} from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Page({ params }) {
  const [selectedItem, setSelectedItem] = useState("block");

const handleItemClick = (item) => {
  setSelectedItem(item);
};
  const [blockDetails, setBlockDetails] = useState(null);

  useEffect(() => {
    async function getBlockDetails() {
      try {
        const block = await alchemy.core.getBlockWithTransactions(
          parseInt(params.block)
        );
        setBlockDetails(block);
        console.log(block)
      } catch (error) {
        console.error("Error fetching block details:", error);
      }
    }

    if (params.block) {
      getBlockDetails();
    }
  }, [params.block]);

  if (!blockDetails) {
    return  <> <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} /> <div className="flex justify-center items-center h-screen"><div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-slate-700 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
  }

  return (
    <>
    <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <div className="flex justify-center mt-12">
        <div className=" w-2/3 rounded p-4 border border-black-400 rounded-md shadow-md">
          <div>
            <div className="flex items-center ">
              <span className="text-4xl">Block Details</span>
            </div>

            <hr />
            <div>
              <p>Block Number: {blockDetails.number}</p>
              <p>Block Hash: {blockDetails.hash}</p>
              <p>Miner : {blockDetails.miner} </p>
              <p>Timestamp: {new Date(blockDetails.timestamp * 1000).toLocaleString()} </p>
              <p>Transactions: {blockDetails.transactions.length}</p>
              <p>Parent Hash: {blockDetails.parentHash}</p>
              <p>Gas Used: {blockDetails.gasUsed.toString()} ({((blockDetails.gasUsed.toString() / blockDetails.gasLimit.toString()) * 100).toFixed(2)}%)</p>
              <p>Gas Limit: {blockDetails.gasLimit.toString()}</p>
              {/* Aggiungi altri dettagli del blocco come desiderato */}
            </div>
          </div>
        </div>
      </div>

      {/* Altri dettagli del blocco come desiderato */}
    </>
  );
};

