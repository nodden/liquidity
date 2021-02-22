import Network from "../bindings/web3-impl";

export default class NetworkConnection {

    private readonly network : Network;

    constructor(_network: Network) { this.network = _network; }

}
