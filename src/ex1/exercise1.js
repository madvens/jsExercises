const offersJson = require('./offers.json')

const contractArr = []
offersJson.offers.forEach(offer => { 
  if (contractArr.some(c => c.contractId === offer.contractId)){
    const filteredContractArr = contractArr.filter(c => c.contractId === offer.contractId)
    const filderedContract = filteredContractArr[0]
    const contractOffer = {offerId: offer.offerId, offerName: offer.offerName}
    filderedContract.offers.push(contractOffer)
  }
  else {
    const offerObj = {offerId: offer.offerId, offerName: offer.offerName}
    const contract = {contractId: offer.contractId, contractName: offer.contractName, offers: [offerObj]}
    contractArr.push(contract)
  }
    
})

const contracts = {contracts: contractArr}
console.log(JSON.stringify(contracts))