describe("NFTMarkettest", function() {
    it("Should list another sales", async function() {
      console.log("start")
      const [_] = await ethers.getSigners()
      const address = '0x26B2DC74Aa745bd61598290C00c90e49831ADc41'
      const abiNFT = [
        "function getListingPrice() public view returns (uint256)",
        "function listToken(uint256 tokenId, uint256 price) public payable returns (bool)",
        "function mintToken(string memory tokenURI) public returns(uint)",
        "function unlistToken(uint256 tokenId) public returns (bool)"
    ];

      const nftMarketplace = new ethers.Contract(address, abiNFT, _)
     // await nftMarketplace.mintToken("https://bafybeicumas4563sflw5xhoswygahydhugn264qcafigwsyx6u7lmtb2fe.ipfs.w3s.link/logo.ico")

     // await nftMarketplace.unlistToken(1)
      //console.log("list token2 success")
      await nftMarketplace.unlistToken(4)
      console.log("list token2 success")

  })
})