"use client";
import Navbar from "@/components/navbar";
import {useState } from "react";

export default function Page({ params }) {
    const [selectedItem, setSelectedItem] = useState("block");

const handleItemClick = (item) => {
  setSelectedItem(item);
};
  return(
    <>
   <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
    <div>
      <h1>test block</h1>
    </div>
    </>
  )
}
