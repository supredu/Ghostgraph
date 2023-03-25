import {ShoppingCartOutlined,WalletOutlined,UserOutlined} from "@ant-design/icons";
import logo from "../logo.png";
import font from "../font.svg";
import "./myHead.css";
import {useState} from "react";
import metamask from "../metamask.png";
import {Modal} from "antd";

function MyHead(){
    const {ethereum}=window;
    const [walletState,setWalletState]=useState(false)
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
    const [currentAccount, setCurrentAccount] = useState(null);

    async function connect(){
        if(!ethereum){
            alert("Make sure you have metamask installed");
            return;
        }
        try{
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }catch(err){
            alert("connect failed");
        }
    }

    // async function disconnect(){
    //     try{
    //         deactivate();
    //     }catch(ex){
    //         alert("断开连接失败");
    //     }
    // }

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
                      <ShoppingCartOutlined onClick={shoppingCart} style={{fontSize:"32px",color:"white"}}/>
                  </div>
                  </div>
                <div className="iconitem">
                    <div>
                    <WalletOutlined onClick={loginWallet} style={{fontSize:"32px",color:"white"}} />
                    </div>
                </div>
                <div  className="iconitem">
                    <div>
                    <UserOutlined onClick={userInfo} style={{fontSize:"32px",color:"white"}}/>
                    </div>
                </div>
        </div>
            <Modal title="My Wallet" open={walletState} onCancel={hideWalletModal} cancelText="取消">
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
        </div>
    )
}
export  default  MyHead;
