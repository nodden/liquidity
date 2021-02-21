import NetworkConnection from "./network-connection";
import Network from "../types/network";
import Transaction from "../types/transaction";

interface ity {

    connect() : Promise< { connection : NetworkConnection } >;

    connect(network: Network) : Promise< { connection : NetworkConnection } >;

    query(hash: String, network: Network) : Promise< { info : Transaction }>;

}

class LiquidityImpl implements ity {

    private constructor() { }

    static liquidity : LiquidityImpl = new LiquidityImpl();


    connect(): Promise<{ connection: NetworkConnection }>;

    connect(network: Network): Promise<{ connection: NetworkConnection }>;

    connect(network?: Network): Promise<{ connection: NetworkConnection }> {
        return Promise.resolve({connection: undefined});
    }

    query(hash: String, network: Network): Promise<{ info: Transaction }> {
        return Promise.resolve({info: undefined});
    }

}

export default LiquidityImpl.liquidity;
