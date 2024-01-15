
"use client";
import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Navbar from "@/components/navbar";
import Link from 'next/link';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Page = ({ params }) => {
  const [blockList, setBlockList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("block");
  const [currentPage, setCurrentPage] = useState(1);
  const blocksPerPage = 50;

  useEffect(() => {
    const getLatestBlocks = async () => {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
  
        // Calcolare il blocco finale e iniziale in base alla pagina corrente
        const endBlock = latestBlockNumber - (currentPage - 1) * blocksPerPage;
        const startBlock = Math.max(1, endBlock - blocksPerPage + 1);
  
        const blocks = [];
        for (let i = endBlock; i >= startBlock; i--) {
          const block = await alchemy.core.getBlockWithTransactions(i);
          blocks.push(block);
        }
  
        setBlockList(blocks);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };
    getLatestBlocks();
  }, [currentPage]);
  

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <div>
        <h1>Latest Blocks</h1>
        {blockList.length > 0 ? (
          <>
            <ul>
              {blockList.map((block) => (
                <li key={block.number}>
                <Link href={`/block/${block.number}`}>
                  <div>{`Block ${block.number} - Transactions: ${block.transactions.length}`}</div>
                </Link>
              </li>
              ))}
            </ul>
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span> Page {currentPage} </span>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Page;
