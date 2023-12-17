"use client";
import React from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Menu, X } from "lucide-react";

//icons
import { CgAssign } from "react-icons/cg";
import { FaGasPump, FaEthereum } from "react-icons/fa";
import { IconContext } from "react-icons";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const provider = new ethers.AlchemyProvider(
  "mainnet",
  process.env.REACT_APP_ALCHEMY_API_KEY
);

const Navbar = () => {
  const [gasPrice, setGasPrice] = useState(Number);
  const [ethPrice, setEthPrice] = useState(Number);

  useEffect(() => {
    async function getCurrentGas() {
      const CurrentGas = Utils.formatUnits(
        await alchemy.core.getGasPrice(),
        "gwei"
      );
      setGasPrice(Math.floor(Number(CurrentGas)));
    }

    async function getCurrentGas() {
      const CurrentGas = Utils.formatUnits(
        await alchemy.core.getGasPrice(),
        "gwei"
      );
      setGasPrice(Math.floor(Number(CurrentGas)));
    }
    async function getEthPrice() {
      const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
      const contractAbi = require("../utils/ethPrice_contractABI.json");
      const priceFeed = new ethers.Contract(addr, contractAbi, provider);

      const ethPPrice = await priceFeed.latestAnswer();
      const ethPriceInUSD = parseFloat(ethPPrice.toString()) / 1e8;
      setEthPrice(ethPriceInUSD);
    }

    getCurrentGas();
    getEthPrice();
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-white ">
      <div className="flex items-center justify-between">
        {/* Logo e scritta a sinistra */}
        <div className="flex items-center">
          <CgAssign size="2.5em" />
          <span className="ml-2">InsideBlock</span>
        </div>

        {/* Menu hamburger per dispositivi più piccoli */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className=" focus:outline-none">
            {isOpen ? <X size="1.5em" /> : <Menu size="1.5em" className="mt-2" />}
          </button>
        </div>

        {/* Logo e scritta a destra */}
        <div className="hidden sm:flex items-center">

          <div className="flex items-center ml-16">
            <FaEthereum size="1.5em" />
            <span className="ml-2 ">: {ethPrice} $</span>
          </div>

          <div className="flex items-center ml-16 ">
            <FaGasPump size="1.5em" />
            <span className=" ml-2 mr-6 "> : {gasPrice} gwei</span>
          </div>

        </div>
      </div>

      {/* Menu a tendina per dispositivi più piccoli */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          {/* Inserisci qui gli elementi a tendina */}
          <div className="flex items-center mt-32">
            
          </div>

          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
