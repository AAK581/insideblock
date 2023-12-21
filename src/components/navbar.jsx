"use client";
import React from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Menu, X } from "lucide-react";
import Link from "next/link";

//icons
import { CgAssign } from "react-icons/cg";
import { FaGasPump, FaEthereum } from "react-icons/fa";


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const provider = new ethers.AlchemyProvider(
  "mainnet",
  process.env.REACT_APP_ALCHEMY_API_KEY
);

const Navbar = ({ selectedItem, handleItemClick }) => {
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
      const formattedEthPrice = ethPriceInUSD.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setEthPrice(formattedEthPrice);
    }

    getCurrentGas();
    getEthPrice();
  });

  const [isOpen, setIsOpen] = useState(false);
 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center">
            <CgAssign size="2.5em" />
            <span className="ml-2 mt-1 text-2xl max-sm:text-xl ">
              InsideBlock
            </span>
          </div>
      
         
          <div className="flex items-center space-x-6 rtl:space-x-reverse max-sm:hidden">
          
            <Link
              href="\"
              className={`text-xl ${
                selectedItem === "dashboard" ? "underline" : ""
              } text-blue-600 dark:text-blue-500 hover:underline`}
              onClick={() => handleItemClick("dashboard")}
            >
              Dashboard
            </Link>

            <Link
              href="/block"
              className={`text-xl ${
                selectedItem === "block" ? "underline" : ""
              } text-blue-600 dark:text-blue-500 hover:underline`}
              onClick={() => handleItemClick("block")}
            >
              Block
            </Link>
            
            <Link
              href="/tx"
              className={`text-xl ${
                selectedItem === "transactions" ? "underline" : ""
              } text-blue-600 dark:text-blue-500 hover:underline`}
              onClick={() => handleItemClick("transactions")}
            >
              Transactions
            </Link>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <X size="1.5em" className="" />
              ) : (
                <Menu size="1.5em" className="mt-2 " />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="lg:hidden mt-2 w-full">
              <div className="flex flex-col items-start space-y-2">
                <a
                  href="#"
                  className={`text-xl ${
                    selectedItem === "dashboard" ? "underline" : ""
                  } text-blue-600 dark:text-blue-500 hover:underline`}
                  onClick={() => handleItemClick("dashboard")}
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className={`text-xl ${
                    selectedItem === "block" ? "underline" : ""
                  } text-blue-600 dark:text-blue-500 hover:underline`}
                  onClick={() => handleItemClick("block")}
                >
                  Block
                </a>
                <a
                  href="#"
                  className={`text-xl ${
                    selectedItem === "transactions" ? "underline" : ""
                  } text-blue-600 dark:text-blue-500 hover:underline`}
                  onClick={() => handleItemClick("transactions")}
                >
                  Transactions
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <nav className="bg-navbar">
        <div className="max-w-screen-xl  py-3 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center ml-4 mr-4 max-sm:hidden ">
                <FaEthereum size="1.5em" className="max-md:text-lg" />
                <span className="ml-2 text-2xl max-md:text-lg">
                  : ${ethPrice}{" "}
                </span>
              </div>
            </div>

            <div className="flex-grow">
              <form className="flex items-center bg-white rounded-md px-4 py-2">
                <input
                  type="text"
                  placeholder="Cerca..."
                  className="flex-grow border-none outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Cerca
                </button>
              </form>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ml-4 mr-4 max-sm:hidden">
                <FaGasPump size="1.5em" className="max-md:text-lg" />
                <span className=" ml-2 mr-4 text-2xl max-md:text-lg">
                  {" "}
                  : {gasPrice} gwei
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
