import {Modal} from "antd";

function walletSupport({open,setEval}){
    function hideModal(){
        setEval(false);
    }
    function showModal(){
        setEval(true);
    }
    return(
        <Modal title="My Wallet" open={open} onCancel={hideModal} cancelText="取消">
          <nav>notice:If you don't have a wallet yet, you can select a provider and create one now.</nav>
        </Modal>
    )
}
export default walletSupport;
