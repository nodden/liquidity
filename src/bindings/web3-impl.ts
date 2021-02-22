import * as net from "net";
import Network from 'web3';
import ServiceProvider, { HttpNetwork } from "../types/serviceprovider";

/**
 * Lots of documentation here.
 *
 * Base utilities for web3 are included in this singular Typescript file. Web3 gives us a lot of flexibility (and fun),
 * and allows us to make wrapping easier.
 */


export const Goerli : HttpNetwork = { name: "Goerli Test Network", httpUrl: "https://goerli.prylabs.net/", chainId: 5 };

