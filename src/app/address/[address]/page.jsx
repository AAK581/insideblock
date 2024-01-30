"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Alchemy, Network } from "alchemy-sdk";
import { Spinner } from "@nextui-org/spinner";
import { formatEther, ethers } from "ethers";
import { Pagination } from "@nextui-org/react";
import Link from 'next/link';
import Footer from "@/components/footer"



const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


const provider = new ethers.AlchemyProvider(
    "mainnet",
    process.env.REACT_APP_ALCHEMY_API_KEY
);

export default function Page({ params }) {
    const [selectedItem, setSelectedItem] = useState("");
    const [balance, setBalance] = useState()
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    const [transactionCount, setTransactionCount] = useState()
    const [txListEXTFrom, setTxListEXTFrom] = useState([]);
    const [txListEXTTo, setTxListEXTTo] = useState([]);
    const [txListInt, setTxListInt] = useState([]);
    const [currentPageFrom, setCurrentPageFrom] = useState(1);
    const [currentPageTo, setCurrentPageTo] = useState(1);
    const [currentPageInt, setCurrentPageInt] = useState(1);
    const txPerPage = 10;

    useEffect(() => {
        const checkEOA = async () => {
            const address = params.address
            const code = await provider.getCode(address)
            if (code === "0x") {
                console.log("EOA")
            }
            else {
                window.location.href = `/contract/${address}`;
            }
        }
        const getBalanceAccount = async () => {
            try {
                const address = params.address
                const balance = await alchemy.core.getBalance(address)
                setBalance(parseFloat(formatEther(balance._hex)))
                setLoading(false);


            } catch (error) {
                console.error("Error fetching blocks:", error);
            }
        };

        const getTransaction = async () => {
            try {
                const address = params.address
                const transactionCount = await alchemy.core.getTransactionCount(address)
                setTransactionCount(transactionCount)


            } catch (error) {
                console.error("Error fetching blocks:", error);
            }

        };

        const getTransactionList = async () => {
            try {
                const address = params.address

                await alchemy.core.getAssetTransfers({
                    fromBlock: "0x0",
                    fromAddress: address,
                    category: ["external", "erc721", "erc1155", "erc20", "specialnft"],
                    order: "desc",
                }).then((tx) => {
                    setTxListEXTFrom(tx.transfers);
                    setLoading2(false)

                });


                await alchemy.core.getAssetTransfers({
                    fromBlock: "0x0",
                    toAddress: address,
                    category: ["external", "erc721", "erc1155", "erc20", "specialnft"],
                    order: "desc",
                }).then((tx) => {
                    setTxListEXTTo(tx.transfers);
                    setLoading3(false)
                });

                await alchemy.core.getAssetTransfers({
                    fromBlock: "0x0",
                    toAddress: address,
                    category: ["internal"],
                    order: "desc",
                }).then((tx) => {
                    setTxListInt(tx.transfers);
                    setLoading4(false)
                });


            } catch (error) {
                console.error("Error fetching blocks:", error);
            }

        };
        checkEOA()
        getBalanceAccount();
        getTransaction();
        getTransactionList();
    }, [params.address]);

    function pagination(list, currentPage) {
        const totalPages = Math.ceil(list.length / txPerPage);
        const currentTx = list.slice(
            (currentPage - 1) * txPerPage,
            currentPage * txPerPage
        );

        return { totalPages, currentTx };
    }

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handlePageChangeFrom = (page) => {
        setCurrentPageFrom(page);
    };

    const handlePageChangeTo = (page) => {
        setCurrentPageTo(page);
    };

    const handlePageChangeInt = (page) => {
        setCurrentPageInt(page);
    };

    const { totalPages: totalPagesFrom, currentTx: currentTxFrom } = pagination(txListEXTFrom, currentPageFrom);
    const { totalPages: totalPagesTo, currentTx: currentTxTo } = pagination(txListEXTTo, currentPageTo);
    const { totalPages: totalPagesInt, currentTx: currentTxInt } = pagination(txListInt, currentPageInt);



    return (
        <>
            <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
            <div className="flex justify-center mt-12">
                <div className=" w-2/3 rounded p-4 border border-black-400 rounded-md shadow-md">
                    <div className="items-center">
                        <div className="text-center ">
                            <span className="text-4xl">Account Details</span>
                        </div>

                        <hr />
                        <div className="text-center mt-2">
                            {loading || loading2 || loading3 || loading4 ? (
                                <Spinner>Loading...</Spinner>
                            ) : (
                                <div>
                                    <p className="text-xl">Address: {params.address} </p>
                                    <p className="text-xl">Balance: {balance === null || 0 ? 0 : balance.toFixed(4)} ETH</p>
                                    <p className="text-xl">Found: {transactionCount} TXs</p>
                                    <div className="flex justify-around mt-4">
                                        <div className="w-full p-2 border border-black-400 rounded-md text-center">
                                            {/* Contenuto colonna 1 */}
                                            <p className="font-bold">TXs From</p>
                                            <div className="flex justify-between font-bold text-center items-center">
                                                <div className="w-1/6 text-center">TX Hash</div>
                                                <div className="w-1/6">From</div>
                                                <div className="w-1/6 ">To</div>
                                                <div className="w-1/6 ">Value</div>

                                            </div>
                                            <ul>
                                                {currentTxFrom.map((tx) => (
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
                                                        <div className="w-1/6">{tx.value === null || 0 ? 0 : tx.value.toFixed(2)} {tx.asset}</div>
                                                    </li>
                                                ))}
                                            </ul>


                                            <div className="pagination flex justify-center">
                                                <Pagination total={totalPagesFrom} initialPage={currentPageFrom} onChange={handlePageChangeFrom} />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around mt-4">
                                        <div className="w-full p-2 border border-black-400 rounded-md">
                                            {/* Contenuto colonna 2 */}
                                            <p className="font-bold">TXs To</p>
                                            <div className="flex justify-between font-bold text-center items-center">
                                                <div className="w-1/6 text-center">TX Hash</div>
                                                <div className="w-1/6">From</div>
                                                <div className="w-1/6 ">To</div>
                                                <div className="w-1/6 ">Value</div>

                                            </div>
                                            <ul>
                                                {currentTxTo.map((tx) => (
                                                    <li key={tx.hash} className="flex justify-between text-center items-center">
                                                        <div className="w-1/6">
                                                            <Link href={`/tx/${tx.hash}`}>{`${tx.hash.substring(0, 6)}...${tx.hash.substring(62, 66)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">
                                                            <Link href={`/address/${tx.from}`}> {`${tx.from.substring(0, 6)}...${tx.from.substring(38, 42)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">
                                                            <Link href={`/address/${tx.to}`}> {`${tx.to.substring(0, 6)}...${tx.to.substring(38, 42)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">{tx.value === null || 0 ? 0 : tx.value.toFixed(2)} {tx.asset}</div>
                                                    </li>


                                                ))}
                                            </ul>


                                            <div className="pagination flex justify-center">
                                                <Pagination total={totalPagesTo} initialPage={currentPageTo} onChange={handlePageChangeTo} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-around mt-4">
                                        <div className="w-full p-2 border border-black-400 rounded-md">
                                            {/* Contenuto colonna 3 */}
                                            <p className="font-bold">TXs Internal</p>
                                            <div className="flex justify-between font-bold text-center items-center">
                                                <div className="w-1/6 text-center">TX Hash</div>
                                                <div className="w-1/6">From</div>
                                                <div className="w-1/6 ">To</div>
                                                <div className="w-1/6 ">Value</div>

                                            </div>
                                            <ul>
                                                {currentTxInt.map((tx) => (
                                                    <li key={tx.hash} className="flex justify-between text-center items-center">
                                                        <div className="w-1/6">
                                                            <Link href={`/tx/${tx.hash}`}>{`${tx.hash.substring(0, 6)}...${tx.hash.substring(62, 66)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">
                                                            <Link href={`/address/${tx.from}`}> {`${tx.from.substring(0, 6)}...${tx.from.substring(38, 42)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">
                                                            <Link href={`/address/${tx.to}`}> {`${tx.to.substring(0, 6)}...${tx.to.substring(38, 42)}`}</Link>
                                                        </div>
                                                        <div className="w-1/6">{tx.value === null || 0 ? 0 : tx.value.toFixed(2)} {tx.asset}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="pagination flex justify-center">
                                                <Pagination total={totalPagesInt} initialPage={currentPageInt} onChange={handlePageChangeInt} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div >

            <Footer />
        </>
    );
}

