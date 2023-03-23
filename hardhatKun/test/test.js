describe("NFTMarkettest", function() {
    it("Should list another sales", async function() {
      console.log("start")
      const [_] = await ethers.getSigners()
      const address = '0x26B2DC74Aa745bd61598290C00c90e49831ADc41'
      const abiNFT = [
        "function getListingPrice() public view returns (uint256)",
        "function listToken(uint256 tokenId, uint256 price) public payable returns (bool)"
    ];

      const nftMarketplace = new ethers.Contract(address, abiNFT, _)

  
      let listingPrice = await nftMarketplace.getListingPrice()
      listingPrice = listingPrice.toString()
      const auctionPrice = ethers.utils.parseUnits('1', 'ether')
      await nftMarketplace.listToken(2, auctionPrice, { value: listingPrice })
      console.log("list token2 success")

  })
})