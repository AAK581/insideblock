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
    return <div>Loading...</div>;
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
  
              
              {/* Aggiungi altri dettagli del blocco come desiderato */}
            </div>
          </div>
        </div>
      </div>

      {/* Altri dettagli del blocco come desiderato */}
    </>
  );
};

