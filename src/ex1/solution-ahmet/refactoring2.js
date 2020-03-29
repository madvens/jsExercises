const json = require('./initial-json-structure.json');

// refactoring of the initial format to achieve the desired format
const refactoring = async arr => {
	const { sameUnique, differentUnique } = await destructuredArray(arr);
	let contracts = [];

	let sameContractIdObj = {};
	sameContractIdObj['offers'] = [];
	sameUnique.map((elem, index) => {
		sameContractIdObj['ContractId'] = elem.contractId;
		sameContractIdObj['ContractName'] = elem.contractName;
		let newObj = {
			offerId: elem.offerId,
			offerName: elem.offerName
		};
		sameContractIdObj['offers'].push(newObj);
		contracts = [sameContractIdObj];
	});

	let differentContractIdObj = {};
	differentUnique.map(elem => {
		differentContractIdObj['ContractId'] = elem.contractId;
		differentContractIdObj['ContractName'] = elem.contractName;
		differentContractIdObj['offers'] = [
			{
				offerId: elem.offerId,
				offerName: elem.offerName
			}
		];
		contracts.push(differentContractIdObj);
	});
	return contracts;
};

const destructuredArray = array => {
	let sameContractId = [];
	let differentContractId = [];
	let sameUnique = [];
	let differentUnique = [];
	for (let i = 0; i < array.length - 1; i++) {
		let subArray = array.slice(i + 1);
		for (let j = 0; j < subArray.length; j++) {
			if (array[i].contractId === subArray[j].contractId) {
				sameContractId = [array[i], subArray[j]];
			} else {
				differentContractId = [subArray[j]];
			}
		}
		sameUnique = [...new Set(sameContractId)];
		differentUnique = [...new Set(differentContractId)];
	}
	// console.log('SameUnique: ', SameUnique);
	let newObject = {
		sameUnique: sameUnique,
		differentUnique: differentUnique
	};
	return newObject;
};

console.log(refactoring(json.offers));
