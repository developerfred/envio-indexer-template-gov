export function getProposalId(daoName: string, id: BigInt): string {
  return `${daoName}-${id.toString()}`;
}

interface DaoInfo {
  name: string;
  tokenAddress: string;  
}

interface AddressToDaoMapping {
  [address: string]: DaoInfo;
}


const addressToDaoMapping: AddressToDaoMapping = {
    // Gitcoin
    "0x9d4c63565d5618310271bf3f3c01b2954c1d1639": {
        name: "gitcoindao.eth",
        tokenAddress: "0x9d4c63565d5618310271bf3f3c01b2954c1d1639",
    },
    // ENS Domains
    "0x323A76393544d5ecca80cd6ef2A560C6a395b7E3": {
        name: "ens.eth",
        tokenAddress: "0x323A76393544d5ecca80cd6ef2A560C6a395b7E3"
    },
    // Nouns Dao
    "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d": {
        name: "nouns.eth",
        tokenAddress: "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d"
    },
}

export function getDaoNameByContractAddress(address: string): string {
  const daoInfo = addressToDaoMapping[address.toLowerCase()];
  if (!daoInfo) {
    throw new Error(`DAO not found address: ${address}`);
  }
  return daoInfo.name;
}
