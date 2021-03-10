import NetworkConnection from "./network-connection";
import Transaction from "../types/transaction";
import Network from "web3";
import ServiceProvider from "../types/serviceprovider";
import Web3 from "web3";
import { GoerliInfura } from "../index";
import Contract, { CompiledContract } from "../types/contract";

export const ERROR = function (message? : any, ...optionalParams : any[]) {
    console.error("( ERROR ) \u26D4 ", message, optionalParams);
}
export const LOG = function (message? : any, ...optionalParams : any[]) {
    console.log("( LOG ) \u2728 ", message, optionalParams);
}

interface ity {

    getServiceProvider(identifier : string, httpUrl : string) : ServiceProvider;

    web3() : Web3;

    connect() : void; //Promise< { connection : NetworkConnection } >;

    connect(network : Network) : void; //Promise< { connection : NetworkConnection } >;

    query(hash : String, network : Network) : void; //Promise< { info : Transaction }>;

    deploy(contract : Contract, network : Network) : any;

}

class LiquidityImpl implements ity {

    public readonly providers : ServiceProvider[] = [];

    private constructor() { }

    query(hash : String, network : Network) : void {
        throw new Error("Method not implemented.");
    }

    deploy(contract : CompiledContract, network : Network) {
        // TODO
    }

    static liquidity : LiquidityImpl = new LiquidityImpl();


    getGoerli() : ServiceProvider {
        let goerli = this.providers.find(e => e.identifier === "goerli-test-net");
        if (goerli !== undefined) {
            return goerli.provider();
        } else {
            goerli = new ServiceProvider("goerli-test-net", GoerliInfura.httpUrl);
            this.providers.push(goerli);
            return goerli;
        }
    }

    getServiceProvider(identifier : string, httpUrl : string) : ServiceProvider {
        return new ServiceProvider(identifier, httpUrl);
    }

    web3() : Web3 {
        return this.providers[0] !== undefined
            ? new Web3(this.providers[0].provider())
            : this.getGoerli().provider();
    }

    connect() : void;
    connect(network : Web3) : void;
    connect(network? : Web3) : void {
    }

}

export default LiquidityImpl.liquidity;
