import {UploadOutlined,WalletOutlined,UserOutlined} from "@ant-design/icons";
import logo from "../logo.png";
import font from "../font.svg";
import "./myHead.css";
import {useState,Component} from "react";
import metamask from "../metamask.png";
import {Modal,Spin} from "antd";
import {Web3Storage} from "web3.storage";
var web3=require("web3")
// import web3 from "web3";

// import { Network, Alchemy } from 'alchemy-sdk';
// const optimismProvider="https://opt-mainnet.g.alchemy.com/v2/lQ6VPCY-4J_B8mJcmQjSLZriPUIc8wAA";
// // Optional Config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//     apiKey: optimismProvider, // Replace with your Alchemy API Key.
//     network: Network.OPT_MAINNET, // Replace with your network.
// };
let optimismClient=new web3("https://eth-goerli.g.alchemy.com/v2/V8xOVFRIfytaCCpF1CGgAAx1X0nxuY-s")

// let optimismClient=new Alchemy(settings);
var contractABI="[\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"constructor\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"approved\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"Approval\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"operator\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"approved\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"ApprovalForAll\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"seller\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"Buy\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"listingPrice\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"ListingPriceUpdated\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"seller\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"sold\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"MarketItemCreated\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"PriceChanged\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"Transfer\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"anonymous\": false,\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": true,\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"seller\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"indexed\": false,\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"UnListToken\",\n" +
    "\t\t\"type\": \"event\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"approve\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"balanceOf\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"changePrice\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"createMarketSale\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"payable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"fetchItemsListed\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"components\": [\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"address payable\",\n" +
    "\t\t\t\t\t\t\"name\": \"seller\",\n" +
    "\t\t\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"address payable\",\n" +
    "\t\t\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\t\t\"name\": \"sold\",\n" +
    "\t\t\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t],\n" +
    "\t\t\t\t\"internalType\": \"struct NFTMarketplace.MarketItem[]\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"tuple[]\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"fetchMarketItems\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"components\": [\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"address payable\",\n" +
    "\t\t\t\t\t\t\"name\": \"seller\",\n" +
    "\t\t\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"address payable\",\n" +
    "\t\t\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t\t\t},\n" +
    "\t\t\t\t\t{\n" +
    "\t\t\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\t\t\"name\": \"sold\",\n" +
    "\t\t\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t\t\t}\n" +
    "\t\t\t\t],\n" +
    "\t\t\t\t\"internalType\": \"struct NFTMarketplace.MarketItem[]\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"tuple[]\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"getApproved\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"getListingPrice\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"owner\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"operator\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"isApprovedForAll\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"price\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"listToken\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"payable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"tokenURI\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"mintToken\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"name\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"ownerOf\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"safeTransferFrom\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bytes\",\n" +
    "\t\t\t\t\"name\": \"data\",\n" +
    "\t\t\t\t\"type\": \"bytes\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"safeTransferFrom\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"operator\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"approved\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"setApprovalForAll\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bytes4\",\n" +
    "\t\t\t\t\"name\": \"interfaceId\",\n" +
    "\t\t\t\t\"type\": \"bytes4\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"supportsInterface\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [],\n" +
    "\t\t\"name\": \"symbol\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"tokenURI\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"string\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"string\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"view\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"from\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"address\",\n" +
    "\t\t\t\t\"name\": \"to\",\n" +
    "\t\t\t\t\"type\": \"address\"\n" +
    "\t\t\t},\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"transferFrom\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"tokenId\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"unlistToken\",\n" +
    "\t\t\"outputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"bool\",\n" +
    "\t\t\t\t\"name\": \"\",\n" +
    "\t\t\t\t\"type\": \"bool\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"stateMutability\": \"nonpayable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t},\n" +
    "\t{\n" +
    "\t\t\"inputs\": [\n" +
    "\t\t\t{\n" +
    "\t\t\t\t\"internalType\": \"uint256\",\n" +
    "\t\t\t\t\"name\": \"_listingPrice\",\n" +
    "\t\t\t\t\"type\": \"uint256\"\n" +
    "\t\t\t}\n" +
    "\t\t],\n" +
    "\t\t\"name\": \"updateListingPrice\",\n" +
    "\t\t\"outputs\": [],\n" +
    "\t\t\"stateMutability\": \"payable\",\n" +
    "\t\t\"type\": \"function\"\n" +
    "\t}\n" +
    "]"


const APIToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJhNTVmYWM0NTM2MDJCQkEyNmEzRjg1NjgxYUEyMmQzMDRFMTI2NTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk3NTU0ODkyNTYsIm5hbWUiOiJORlRNYXJrZXRzIn0.C2Z2A5oJcN4iK9AuuOvhmn7Efuvd5ldBSdVJz_7iPY4";
function getAccessToken(){
  return APIToken;
}
var contractObj=new optimismClient.eth.Contract(JSON.parse(contractABI),"0x26B2DC74Aa745bd61598290C00c90e49831ADc41");
function markStorageClient(){
    return new Web3Storage({token:getAccessToken()})
}
const storageClient=markStorageClient();
function MyHead(){
    const {ethereum}=window;
    const [uploadState,setUploadState]=useState(false);
    const [walletState,setWalletState]=useState(false);
    const [connectState,setConnect]=useState(false);
    const [mintNFTInfo,setmintNFTInfo]=useState(null);
    const [loading,setLoading]=useState(false)
    const [currentAccount, setCurrentAccount] = useState(null);
   async  function mintNFT(){
        setLoading(true)
       console.log(currentAccount)
       if(!connectState){
           alert("请先进行登录");
           setWalletState(true);
           setUploadState(false);
           setLoading(false)
           return;
       }
        const fileInput = document.querySelector('input[type="file"]').files
       if (fileInput.length!=1){
           alert("only support upload one file");
           return;
       }
        if(!fileInput){
            // eslint-disable-next-line no-restricted-globals
           let flag = confirm("Do you not need to select a picture for NFT");
           if (!flag){
               return;
           }
        }
        const uid = await storageClient.put(fileInput);
        console.log(contractObj.methods)
        //convertToHTTPS
       const url="https://"+uid+".ipfs.w3s.link/"+fileInput[0].name;
       const method = 'eth_sendTransaction';
       let data = web3.eth.abi.encodeFunctionCall({
           name: "mintToken",
           type: "function",
           inputs: [url],
           outputs: [],
       }, []);
       const parameters = [{
           from: currentAccount,
           to: "0x26B2DC74Aa745bd61598290C00c90e49831ADc41",
           data: data
       }]
       const from = currentAccount;
       const payload = {
           method: method,
           params: parameters,
           from: from,
       }
       ethereum.send(payload,function (error,result){
           console.log(result)
           if (error!=null){
               alert("create nft error")
               console.log(error);
               return
           }
           console.log(result)
       })
       setLoading(false)
    }
    function cancelUploadModal(){
        setUploadState(false);
    }
    function openUploadModal(){
        setUploadState(true);
    }
    function loginWallet(){
        setWalletState(true)
    }
    function userInfo(){
      alert("welcome to userInfo");
    }
    function hideWalletModal(){
        setWalletState(false);
    }
    function shoppingCart(){
    alert("此功能待开放");
    }
    async function connect(){
        if(!ethereum){
            alert("Make sure you have metamask installed");
            return;
        }
        if(connectState){
            // eslint-disable-next-line no-restricted-globals
            const flag= confirm("已经连接钱包,是否取消连接");
            if (flag){
                setConnect(false);
                setCurrentAccount(null);
                await hideWalletModal();
                return;
            }
        }
        try{
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            await ethereum.enable();
            setCurrentAccount(accounts[0]);
        }catch(err){
            alert("connect failed");
        }
        await hideWalletModal();
        setConnect(true);
    }

    // async function disconnect(){
    //     try{
    //         deactivate();
    //     }catch(ex){
    //         alert("断开连接失败");
    //     }
    // }
    class AccountsState extends Component{
        render(){
           if (connectState){
               return(<div style={{minWidth:"70px",width:"100px",overflow:"visible",color:"white"}}>{currentAccount}</div>)
           }else{
               return(<div>
                   <UserOutlined  disabled="disabled" style={{fontSize:"32px",color:"white"}}/>
               </div>)
           }
        }
    }
    return (
        <div className="header">
             <div className="logo">
                <div>
                    <img width="40" height="40" src={logo}/>
                </div>
                 <div>
                     <img src={font} width="313" height="61" />
                 </div>
             </div>
            <div className="icon">
                  <div className="iconitem">
                  <div>
                      <UploadOutlined  onClick={openUploadModal} style={{fontSize:"32px",color:"white"}}/>
                  </div>
                  </div>
                <div className="iconitem">
                    <div>
                    <WalletOutlined onClick={loginWallet} style={{fontSize:"32px",color:"white"}} />
                    </div>
                </div>
                <div  className="iconitem">
                    <AccountsState></AccountsState>
                </div>
        </div>
            <Modal title="My Wallet" open={walletState} onOk={hideWalletModal} okText="确认" onCancel={hideWalletModal} cancelText="取消">
                <div>
                    <span>
                        If you don't have a wallet yet, you can select a provider and create one now.
                    </span>
                </div>
                <div>
                    <ul>
                        <li className="walletsli">
                            <button className="wallets" onClick={connect}>
                                <div className="img">
                                    <img height="30" src={metamask} />
                                </div>
                                <div className="font">
                                    <span>
                                        MetaMask
                                    </span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal>
            <Modal title="upload" open={uploadState} onOk={mintNFT} okText="生成" onCancel={cancelUploadModal} cancelText="取消">
                <Spin spinning={loading}>
                   <form>
                       <div>
                           <span>picture:</span>
                       <input  type="file"/>
                       </div>
                   </form>
                    </Spin>
            </Modal>
        </div>
    )
}
export  default  MyHead;
