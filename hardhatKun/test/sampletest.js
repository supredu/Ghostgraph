/* test/sample-test.js */
describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
      console.log("start")
      /* deploy the marketplace */
      const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
      const nftMarketplace = await NFTMarketplace.deploy()
      await nftMarketplace.deployed()
  
      let listingPrice = await nftMarketplace.getListingPrice()
      listingPrice = listingPrice.toString()
      const lockPrice = ethers.utils.parseUnits('100000', 'ether')
      const auctionPrice = ethers.utils.parseUnits('1', 'ether')
  
      /* create two tokens */
      await nftMarketplace.mintToken("https://www.token1.com")
      console.log("mint token1 success")
      await nftMarketplace.mintToken("https://www.token.com")
      console.log("mint token2 success")
      await nftMarketplace.listToken(1, lockPrice, { value: listingPrice })
      console.log("list and lock token1 success")
      await nftMarketplace.listToken(2, auctionPrice, { value: listingPrice })
      console.log("list token2 success")
      await nftMarketplace.unlistToken(2)
      console.log("unlist token2 success")
      await nftMarketplace.listToken(2, auctionPrice, { value: listingPrice })
      console.log("relist token2 success")
      const [_, buyerAddress] = await ethers.getSigners()
    
      /* execute sale of token to another user */
      await nftMarketplace.connect(buyerAddress).createMarketSale(2, { value: auctionPrice })
      console.log("buy token2 success")
      /* resell a token */
      await nftMarketplace.connect(buyerAddress).listToken(2, auctionPrice, { value: listingPrice })
      console.log("resell token2 success")
      /* query for and return the unsold items */
      items = await nftMarketplace.fetchMarketItems()
      console.log("what's fucking going on")
      items = await Promise.all(items.map(async i => {
        const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri
        }
        return item
      }))
      console.log('items: ', items)
    })
  })