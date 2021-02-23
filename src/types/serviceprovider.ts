import { WebsocketConfig } from '../compat/websocket-config';
import Web3 from 'web3';

const Web3WsProvider = require('web3-providers-ws');

/**
 * Basic auth credentials (header) structure
 */
export interface AuthCredentials {

    username : string;
    password : string;

}

/**
 * Requirements for an HttpNetwork for `organization`
 */
export interface HttpNetwork {
    name : string;
    httpUrl : string;
    chainId : number;
}


/**
 * Easy ServiceProvider to handle basic web3 instance needs
 */
export default class ServiceProvider {

    /**
     * Provider identifier
     */
    public readonly identifier : string;

    /**
     * Http url for a 'network'
     */
    public readonly httpUrl : string;

    /**
     * Configurations for the websocket
     */
    public config? : WebsocketConfig;

    /**
     * Create a service provider
     *
     * @param identifier provider identifier
     * @param httpUrl url for the service
     * @param config configurations for the websocket to the service
     */
    constructor(identifier : string, httpUrl : string, config? : WebsocketConfig) {
        this.identifier = identifier;
        this.httpUrl = httpUrl;
        this.config = config;
    }

    /**
     * Get a Web3WsProvider from given configurations and given http url
     */
    public provider() : typeof Web3WsProvider {
        if (this.config !== undefined) {
            return new Web3WsProvider(this.httpUrl, this.config)
        }
        return Web3.givenProvider;
    }

    /**
     * Get a web3 instance
     */
    public web3() : Web3 {
        return new Web3(this.provider());
    }

}
