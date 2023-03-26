import "./App.css";
import MyHead from "./components/myHead";
import {useState} from "react";
import  {createClient}from "@urql/core";
import {Modal,Spin} from "antd";
const APIURL="https://api.studio.thegraph.com/query/43728/kun/v0.2";
const client=createClient({
    url:APIURL
})

 function App() {
     const [nftList,setNFTList]= useState([]);
     const [loading,setLoading]=useState(false)
     initNfts();
    const [currentNFTInfo,setCurrentNFTInfo]=useState(null);
    const [openNFTModal,setOpenNFTModal]=useState(false);
    const [searchId,setSearchId]=useState("");
    function openModalNFT(){
        setOpenNFTModal(true);
    }
    async function sortNFTS(){
        let element =document.querySelector("#sortWay input[type='radio']:checked");
        let query = `query {
       tokens (
     `+ element.getAttribute("select")+`
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
            console.log(nftList)
        });
    }
    function handleSeachCondition(v){
        setSearchId(v.target.value);
    }
  async  function searchById(){
        if (!searchId||(!Number.isInteger(searchId))){
            alert("请输入正确的id");
            return;
        }
        let query =`query{
           tokens(
              where:{onlist:true,tokenId:`
        query+=searchId
        query+=` 
        }
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
      console.log(query)
        await client.query(query).toPromise().then((result)=>{
            setNFTList(result.data.tokens)
        });
    }
    function transferNFT(){

    }
    function closeModalNFT(){
        setOpenNFTModal(false);
    }
     async function initNfts() {
         let query = `query {
       tokens (
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
    const nftListView=nftList.map(function(item,index){
         return (<div key={item.tokenId}   style={{textAlign:"center",minHeight:"50px"}}>
             {/*<button index={index} onClick={openModalNFT(index)}/>*/}
             <img style={{display:"inline-block",maxWidth:"30px",maxHeight:"30px"}} src={item.tokenURI} />
             <span style={{marginRight:"250px"}}>{item.tokenId}</span>
             <span style={{marginLeft:"100px"}}>{item.price/10**18+"ETH"}</span>
             <button style={{backgroundColor:"skyblue"}} onClick={()=>{
                 setCurrentNFTInfo(nftList[index]);
                 openModalNFT()
             }}>information</button>
             </div> )
    })
  return (
      <div className="body">
    <div style={{height:"72",minHeight:"72",maxHeight:"72"}}>
      <MyHead  style={{height:"72",minHeight:"72",maxHeight:"72"}}/>
    </div>
          <div className="content">
          <div>
              <span style={{fontSize:"25px"}}>
              Filter:
              </span>
              <input type="text" style={{minWidth:"400px",minHeight:"25px"}} value={searchId}  autoComplete="off" onChange={handleSeachCondition}/>
              <button style={{minWidth:"50px",minHeight:"25px",backgroundColor:"skyblue"}} onClick={searchById}>
                  query
              </button>
          </div>
          <div id="sortWay" style={{marginLeft:"100px", fontSize:"25px"}}>
              <span style={{minWidth:"50px",minHeight:"25px",backgroundColor:"skyblue",marginRight:"50px"}}>sort:</span>
              <label style={{minWidth:"50px",minHeight:"25px",backgroundColor:"skyblue",marginRight:"50px"}}>
                  <input type="radio" name="select" select="oderBy: price" defaultChecked="true" onClick={sortNFTS}/>prices
              </label>
              <label style={{minWidth:"50px",minHeight:"25px",backgroundColor:"skyblue"}}>
                  <input type="radio" name="select" select="oderBy: tokenId" onClick={sortNFTS}/>tokenId
              </label>
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
              {/*<form>*/}
              {/*    <label>*/}
              {/*        <img style={{display:"inline-block",maxWidth:"30px",maxHeight:"30px"}} src={currentNFTInfo.tokenURI} />*/}
              {/*    </label>*/}
              {/*    <label>*/}
              {/*    tokenId: <span style={{marginRight:"250px"}}>{currentNFTInfo.tokenId}</span>*/}
              {/*    </label>*/}
              {/*    <label>*/}
              {/*   price: <span style={{marginLeft:"100px"}}>{currentNFTInfo.price/10**18+"ETH"}</span>*/}
              {/*    </label>*/}
              {/*    <label>*/}
              {/*     owners:<span>{currentNFTInfo.owner}</span>*/}
              {/*    </label>*/}
              {/*    <label>*/}
              {/*        seller:<span>{nftList[currentNFTInfo].seller}</span>*/}
              {/*    </label>*/}
              {/*</form>*/}
          </Modal>
      </div>
  );
}

export default App;
