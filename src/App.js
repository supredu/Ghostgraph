import "./App.css";
import MyHead from "./components/myHead";
import {useState} from "react";
import  {createClient}from "@urql/core";
import {Modal} from "antd";
const APIURL="https://api.studio.thegraph.com/query/43728/kun/v0.2";
const client=createClient({
    url:APIURL
})

 function App() {
     const [nftList,setNFTList]= useState([]);
    const [currentNFTInfo,setCurrentNFTInfo]=useState(null);
    const [openNFTModal,setOpenNFTModal]=useState(false);

    function openModalNFT(tokenIndex){
        setOpenNFTModal(true);
        setCurrentNFTInfo(nftList[tokenIndex]);
    }
    function transferNFT(){
      console.log(currentNFTInfo);
    }
    function closeModalNFT(){
        setOpenNFTModal(false);
    }
     async function initNfts() {
         let query = `query {
       tokens (
       first: 5
         oderBy: price
         orderDirection: desc
         where: {onlist: true}
    ){
      id
      tokenId
      tokenURI
      price
      owner{
      id
     }
    seller{
      id
    }
    }
    }`
         await client.query(query).toPromise().then((result)=>{
             setNFTList(result.data.tokens)
         });
     }
      initNfts();
    const nftListView=nftList.map(function(item,index){
        console.log(item.tokenURI)
         return (<div key={item.tokenId}   style={{textAlign:"center",minHeight:"50px"}}>
             {/*<button index={index} onClick={openModalNFT(index)}/>*/}
             <img style={{display:"inline-block",maxWidth:"30px",maxHeight:"30px"}} src={item.tokenURI} />
             <span style={{marginRight:"250px"}}>{item.tokenId}</span>
             <span style={{marginLeft:"100px"}}>{item.price/10**18+"ETH"}</span>
             </div> )
    })
  return (
      <div className="body">
    <div style={{height:"72",minHeight:"72",maxHeight:"72"}}>
      <MyHead  style={{height:"72",minHeight:"72",maxHeight:"72"}}/>
    </div>
          <div className="content">
          <div>
              search
          </div>
          <div>
          </div>

          <div style={{textAlign:"center"}}>
            <span style={{marginRight:"250px"}}>information</span>
              <span style={{marginLeft:"100px"}}>price</span>
          </div>
              <div style={{textAlign:"center"}}>
                  <span style={{marginRight:"250px"}}>information</span>
                  <span style={{marginLeft:"100px"}}>price</span>
              </div>
              {nftListView}
      </div>
          <Modal title="current NFT" open={openNFTModal} onOk={transferNFT} okText="confirm" onCancel={closeModalNFT} cancelText="cancel">
          </Modal>
      </div>
  );
}

export default App;
