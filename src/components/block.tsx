'use client'
import React from "react";
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

const alchemy = new Alchemy(settings);
//test

export default function Block() {
    const [blockNumber, setBlockNumber] = useState(Number);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

    return (
        <div>{blockNumber}</div>
    )
}



