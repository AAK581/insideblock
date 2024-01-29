"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Alchemy, Network } from "alchemy-sdk";
import { Spinner } from "@nextui-org/spinner";
import { formatEther } from "ethers";


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Page({ params }) {
    const [selectedItem, setSelectedItem] = useState("");
    const [balance, setBalance] = useState()
    const [loading, setLoading] = useState(true);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };



    useEffect(() => {
        const getBalanceAccount = async () => {
            try {
                const address = params.address
                console.log(address)
                const balance = await alchemy.core.getBalance(address)
                setBalance(parseFloat(formatEther(balance._hex)))
                setLoading(false);


            } catch (error) {
                console.error("Error fetching blocks:", error);
            }
        };

        getBalanceAccount();
    }, []);





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
                            {loading ? (
                                <Spinner>Loading...</Spinner>
                            ) : (
                                <div>
                                    <p className="text-xl">Address: {params.address} </p>
                                    <p className="text-xl">Balance: {balance.toFixed(4)} ETH</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >

            {/* Altri dettagli del blocco come desiderato */}
        </>
    );
}
