"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";

export default function Page({ params }) {
  const [selectedItem, setSelectedItem] = useState("transactions");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <div>My Post: {params.tx}</div>
    </>
  );
}
