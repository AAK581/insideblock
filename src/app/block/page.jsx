"use client";
import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Navbar from "@/components/navbar";
import Link from 'next/link';
import { Pagination } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Page = () => {
  const [blockList, setBlockList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("block");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blocksPerPage = 20;

  useEffect(() => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const getLatestBlocks = async () => {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const blockRequests = [];

        for (let i = latestBlockNumber; i > latestBlockNumber - 200; i--) {
          blockRequests.push(alchemy.core.getBlockWithTransactions(i));
          await delay(40)
        }

        const blocks = await Promise.all(blockRequests);
        setBlockList(blocks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    getLatestBlocks();
  }, []);

  const totalPages = Math.ceil(blockList.length / blocksPerPage);
  const currentBlocks = blockList.slice(
    (currentPage - 1) * blocksPerPage,
    currentPage * blocksPerPage
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <div className="flex justify-center mt-12">
        <div className=" w-2/3 rounded p-4 border border-black-400 rounded-md shadow-md">
          <div>
            <div className="text-center">
              <span className="text-4xl">Latest Blocks</span>
            </div>
            <hr />
            <div className="text-center mt-2">
        {loading ? (
          <Spinner>Loading...</Spinner>
        ) : (
          <>
            <ul>
              {currentBlocks.map((block) => (
                <li key={block.number}>
                  <Link href={`/block/${block.number}`}>
                    <div className="text-xl">{`Block ${block.number} - Transactions: ${block.transactions.length}`}</div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pagination flex justify-center">
              <Pagination
                total={totalPages}
                initialPage={currentPage}
                onChange={handlePageChange}
              />
            </div>
            
          </>
          
        )}
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Page;
