"use client";
import Navbar from "@/components/navbar";
import {useState } from "react";
import blockList  from "@/components/homepage";

export default function Page({ params }) {
    const [selectedItem, setSelectedItem] = useState("transactions");
  
const handleItemClick = (item) => {
  setSelectedItem(item);
};
  return(
    <>
   <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
    <div>
      <h1>test tx</h1>
    </div>
    </>
  )
}
