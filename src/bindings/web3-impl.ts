import * as net from "net";
import Network from 'web3';
import ServiceProvider, { HttpNetwork } from "../types/serviceprovider";
import Web3 from "web3";
import { HttpProvider } from "web3-core";

/**
 * Lots of documentation here.
 *
 * Base utilities for web3 are included in this singular Typescript file. Web3 gives us a lot of flexibility (and fun),
 * and allows us to make wrapping easier.
 */

function getInst(httpUrl: string) : Web3 {
    let web3 = new Web3();
    web3.setProvider(httpUrl);
    return web3;
}

export const GoerliInfura : HttpNetwork = { name: "Goerli Test Network", httpUrl: "https://goerli.infura.io/v3/d31489a6228349a79c9d459df89c83a0", chainId: 5 };
export const Web3GoerliInfura : Web3 = getInst(GoerliInfura.httpUrl);
