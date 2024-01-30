'use client'
import Navbar from "@/components/navbar";
import Homepage from "@/components/homepage";
import Footer from "@/components/footer"
import { useState } from "react";
import {NextUIProvider} from "@nextui-org/react";


export default function Home() {
  const [selectedItem, setSelectedItem] = useState("dashboard");

const handleItemClick = (item:any) => {
  setSelectedItem(item);
};
  return (
    <>
    <NextUIProvider>
      <Navbar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <Homepage />
      <Footer />
    </NextUIProvider>
      
    </>
  );
}
