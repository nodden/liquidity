import Web3 from "web3";
import { WebsocketConfig } from '../compat/websocket-config';

const Web3WsProvider = require('web3-providers-ws');

export interface AuthCredentials {

    username: string;
    password: string;

}

export interface HttpNetwork {
    name: string;
    httpUrl: string;
    chainId: number;
}


export default class ServiceProvider {

    public readonly identifier: string;
    public readonly httpUrl: string;
    public config : WebsocketConfig;

    constructor(identifier: string, httpUrl: string, config? : WebsocketConfig) {
        this.identifier = identifier;
        this.httpUrl = httpUrl;
        this.config = config;
    }

    public provider() : typeof Web3WsProvider {
        if (this.config !== undefined) {
            return new Web3WsProvider(this.httpUrl, this.config)
        }
        return Web3.givenProvider;
    }

    public web3() : Web3 {
        return new Web3(this.provider());
    }

}
