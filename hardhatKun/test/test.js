describe("NFTMarkettest", function() {
    it("Should list another sales", async function() {
      console.log("start")
      const nftMarketplace = 0x26B2DC74Aa745bd61598290C00c90e49831ADc41

  
      let listingPrice = await nftMarketplace.getListingPrice()
      listingPrice = listingPrice.toString()
      const lockPrice = ethers.utils.parseUnits('100000', 'ether')
      const auctionPrice = ethers.utils.parseUnits('1', 'ether')
      await nftMarketplace.listToken(2, auctionPrice, { value: listingPrice })
      console.log("list token2 success")

  })
})