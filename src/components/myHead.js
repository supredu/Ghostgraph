import {UploadOutlined,WalletOutlined,UserOutlined} from "@ant-design/icons";
import logo from "../logo.png";
import font from "../font.svg";
import "./myHead.css";
import {useState,Component} from "react";
import metamask from "../metamask.png";
import {Modal} from "antd";
import {Web3Storage} from "web3.storage";
import web3 from "web3";

const optimismProvider="https://opt-mainnet.g.alchemy.com/v2/lQ6VPCY-4J_B8mJcmQjSLZriPUIc8wAA";
let optimismClient=new web3(optimismProvider);
let fs=require("fs");
var contractABI=fs.readFileSync("./contracts/Kunabi.json");
const APIToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJhNTVmYWM0NTM2MDJCQkEyNmEzRjg1NjgxYUEyMmQzMDRFMTI2NTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk3NTU0ODkyNTYsIm5hbWUiOiJORlRNYXJrZXRzIn0.C2Z2A5oJcN4iK9AuuOvhmn7Efuvd5ldBSdVJz_7iPY4";
function getAccessToken(){
  return APIToken;
}
var contractObj=new optimismClient.eth.Contract(JSON.parse(contractABI),0x26b2dc74aa745bd61598290c00c90e49831adc41);
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
    const [currentAccount, setCurrentAccount] = useState(null);
   async  function mintNFT(){
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
        //convertToHTTPS
       const url="https://"+uid+".ipfs.w3s.link/"+fileInput[0].name;
       contractObj.methods.mintToken(url).send({from:currentAccount}).on('receipt', (data) => {
           console.log(data)
       })
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
                   <form>
                       <div>
                           <span>picture:</span>
                       <input  type="file"/>
                       </div>
                   </form>
            </Modal>
        </div>
    )
}
export  default  MyHead;
