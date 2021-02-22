import NetworkConnection from "./network-connection";
import Transaction from "../types/transaction";
import Network from "web3";
import ServiceProvider from "../types/serviceprovider";
import Web3 from "web3";
import  { Goerli } from "../index";

interface ity {

    getServiceProvider(identifier: string, httpUrl: string) : ServiceProvider;

    web3() : Web3;

    connect() : Promise< { connection : NetworkConnection } >;

    connect(network: Network) : Promise< { connection : NetworkConnection } >;

    query(hash: String, network: Network) : Promise< { info : Transaction }>;

    deploy(contract: any, network: Network);

}

class LiquidityImpl implements ity {

    public readonly providers : ServiceProvider[];

    private constructor() { }

    static liquidity : LiquidityImpl = new LiquidityImpl();

    // todo all
    connect(): Promise<{ connection: NetworkConnection }>;

    connect(network: Network): Promise<{ connection: NetworkConnection }>;

    connect(network?: Network): Promise<{ connection: NetworkConnection }> {
        return Promise.resolve({ connection: undefined });
    }

    query(hash: String, network: Network): Promise<{ info: Transaction }> {
        return Promise.resolve({ info: undefined });
    }

    deploy(contract: any, network: Network) {
        // todo first connect, then deploy
    }

    getGoerli() : ServiceProvider {
        let goerli = this.providers.find(e => e.identifier === "goerli-test-net");
        if (goerli !== undefined) {
            return goerli.provider();
        } else {
            goerli = new ServiceProvider("goerli-test-net", Goerli.httpUrl);
            this.providers.push(goerli);
            return goerli;
        }
    }

    getServiceProvider(identifier: string, httpUrl: string): ServiceProvider {
        return new ServiceProvider(identifier, httpUrl);
    }

    web3(): Web3 {
        return this.providers[0] !== undefined
            ? new Web3(this.providers[0].provider())
            : this.getGoerli().provider();
    }

}

export default LiquidityImpl.liquidity;
