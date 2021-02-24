import { ERROR } from "../base/liquidity";
import { validateJSON } from "../base/util";

export default interface Contract {

    contractName : string;
    codeContents? : string;
    contractUrls? : string[];

}

export class CompiledContract implements Contract {

    contractName : string;
    codeContents : string;
    contractUrls? : string[];

    private constructor(contractName: string, codeContents: string, contractUrls?: string[]) {
        this.contractName = contractName;
        this.codeContents = codeContents;
        this.contractUrls = contractUrls;
    }

    static from(contractName: string, compiledContents: string, contractUrls?: string[]) : CompiledContract | undefined {
        if (validateJSON(compiledContents)) {
            return new CompiledContract(contractName, compiledContents, contractUrls);
        } else {
            ERROR("Invalid code! Are you sure this is a contract?")
        }
    }


}

