import "./App.css";
import MyHead from "./components/myHead";
import Web3 from "web3";
import { Web3ReactProvider } from '@web3-react/core'
function App() {
    const NFTs=0;
    function getLibrary(){

    }
  return (
      <div className="body">
    <div style={{height:"72",minHeight:"72",maxHeight:"72"}}>
      <MyHead style={{height:"72",minHeight:"72",maxHeight:"72"}}/>
    </div>
          <div className="content">
          <div>
              搜索
          </div>
          <div>

          </div>
          <div>
              <span>NFT1</span>
          </div>
              <div>
                  <span>NFT2</span>
              </div>
              <div>
                  <span>NFT1</span>
              </div>
              <div>
                  <span>NFT2</span>
              </div>
          </div>
      </div>
  );
}

export default App;
