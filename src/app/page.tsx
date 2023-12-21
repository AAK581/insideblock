'use client'
import Navbar from "@/components/navbar";
import Homepage from "@/components/homepage";
import { useState } from "react";


export default function Home() {
  const [selectedItem, setSelectedItem] = useState("dashboard");

const handleItemClick = (item:any) => {
  setSelectedItem(item);
};
  return (
    <>
      <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <Homepage />
    </>
  );
}
