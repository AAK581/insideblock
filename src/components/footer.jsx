import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoCube } from "react-icons/io5";
import { CgAssign } from "react-icons/cg";
import { FaGasPump, FaEthereum } from "react-icons/fa";

export default function Footer() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: creditsIsOpen, onOpen: openCredits, onOpenChange: onCreditsOpenChange } = useDisclosure();
    return (
        <>
            <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> Developed by <a href="https://github.com/dot-mino/insideblock" className="hover:underline">dotmino</a>.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Button className="bg-transparent text-sm text-gray-500 sm:text-center dark:text-gray-400 " onPress={onOpen}>About this project</Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">About this Project : </ModalHeader>
                                            <ModalBody>
                                                <p>
                                                    The final project of the third week of <a href="https://www.alchemy.com/university"> Alchemy University </a> consisted of developing an Ethereum Explorer.
                                                </p>
                                                <p>I developed InsideBlock, using next.js and tailwind css, interfacing with the Alchemy SDK and ethers.js.
                                                    More details in the <a href="https://github.com/dot-mino/insideblock">readme.md</a> file on github
                                                </p>

                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="primary" onPress={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </li>
                        <li>
                            <Button className="bg-transparent text-sm text-gray-500 sm:text-center dark:text-gray-400 hover:text-black" onPress={openCredits}>Credits</Button>
                            <Modal isOpen={creditsIsOpen} onOpenChange={onCreditsOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">Credits</ModalHeader>
                                            <ModalBody>
                                                <p>
                                                    The icons used in this project are :
                                                </p>
                                                <ul>

                                                    <li className="flex space-x-2">
                                                        <CgAssign />  : <a href="https://react-icons.github.io/react-icons/search/#q=cgassign"> CgAssign  </a>  ,  <a href="https://react-icons.github.io/react-icons/icons/cg/"> React Pack </a> , <a href="https://github.com/astrit/css.gg "> Astrit GitHub </a>  <p> (MIT License) </p>
                                                    </li>
                                                    <li className="flex space-x-2">
                                                        <IoCube /> : <a href="https://react-icons.github.io/react-icons/search/#q=iocube"> IoCube </a> , <a href="https://react-icons.github.io/react-icons/icons/io5/"> React Pack </a>  , <a href="https://ionic.io/ionicons "> Ionicons </a> <p> (MIT License) </p>
                                                    </li>
                                                    <li className="flex space-x-2">
                                                        <FaGasPump /> : <a href="https://react-icons.github.io/react-icons/search/#q=fagaspump"> faGasPump </a> , <a href="https://react-icons.github.io/react-icons/icons/fa/"> React Pack </a> ,  <a href="https://fontawesome.com"> fontawesome </a>  <p> (CC BY 4.0 License) </p>
                                                    </li>
                                                    <li className="flex space-x-2">
                                                        <FaEthereum /> : <a href="https://react-icons.github.io/react-icons/search/#q=faethereum"> FaEthereum </a> , <a href="https://react-icons.github.io/react-icons/icons/fa/"> React Pack </a> ,  <a href="https://fontawesome.com"> fontawesome </a>  <p> (CC BY 4.0 License) </p>
                                                    </li>
                                                </ul>
                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="primary" onPress={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </li>

                    </ul>
                </div>
            </footer>
        </>
    );
}

