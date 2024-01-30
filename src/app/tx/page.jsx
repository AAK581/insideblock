"use client";
import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import Link from 'next/link';
import { Pagination } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { formatEther } from "ethers"

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Page = () => {
  const [txList, setTxList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const txPerPage = 20;

  useEffect(() => {
    const getLatestTransactions = async () => {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        await alchemy.core.getBlockWithTransactions(latestBlockNumber)
          .then((block) => {
            setTxList(block.transactions);
            setLoading(false);
          });

      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    getLatestTransactions();
  }, []);

  const totalPages = Math.ceil(txList.length / txPerPage);
  const currentTx = txList.slice(
    (currentPage - 1) * txPerPage,
    currentPage * txPerPage
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
              <span className="text-4xl">Latest Transactions</span>
            </div>
            <hr />
            <div className="text-center mt-2">
              {loading ? (
                <Spinner>Loading...</Spinner>
              ) : (
                <>
                  <div className="flex justify-between font-bold text-center items-center">
                    <div className="w-1/6 text-center">TX Hash</div>
                    <div className="w-1/6">From</div>
                    <div className="w-1/6 ">To</div>
                    <div className="w-1/6 ">Value</div>
                  </div>
                  <ul>
                    {currentTx.map((tx) => (
                      <li key={tx.hash} className="flex justify-between text-center items-center">
                        <div className="w-1/6">
                          <Link href={`/tx/${tx.hash}`}>
                            {`${tx.hash.substring(0, 6)}...${tx.hash.substring(62, 66)}`}
                          </Link>
                        </div>
                        <div className="w-1/6">
                          <Link href={`/address/${tx.from}`}> {`${tx.from.substring(0, 6)}...${tx.from.substring(38, 42)}`}</Link>
                        </div>
                        <div className="w-1/6">
                          <Link href={`/address/${tx.to}`}> {`${tx.to.substring(0, 6)}...${tx.to.substring(38, 42)}`}</Link>
                        </div>
                        <div className="w-1/6">{(formatEther(tx.value._hex))}</div>


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
      <Footer />
    </>
  );
};

export default Page;
