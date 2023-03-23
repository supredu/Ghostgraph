import {ShoppingCartOutlined,WalletOutlined,UserOutlined} from "@ant-design/icons";
import {Menu} from 'antd';
import logo from "../logo.png";
import font from "../font.svg";
import "./myHead.css";
import {useState} from "react";
import "./wallet";
import walletSupport from "./wallet";
function MyHead(){
    const [walletState,setWalletState]=useState(false)
    function loginWallet(){
        setWalletState(true)
    }
    function userInfo(){
      alert("welcome to userInfo");
    }
    function shoppingCart(){
    alert("welcome to shoppingCart");
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
        </div>
    )
}
export  default  MyHead;
