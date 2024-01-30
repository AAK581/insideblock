"use client";
import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};


const Page = ({ params }) => {
    console.log(params)
    const [selectedItem, setSelectedItem] = useState();





    const handleItemClick = (item) => {
        setSelectedItem(item);
    };



    return (
        <>
            <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
            <div className="flex justify-center mt-12">
                <h1 className="text-xl">The address ({params.contract}) entered matches the address of a contract, details coming soon</h1>
            </div>
            <Footer />
        </>
    );
};

export default Page;
