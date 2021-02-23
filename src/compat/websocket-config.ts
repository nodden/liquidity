import { AuthCredentials } from "../types/serviceprovider";
import { HttpProvider } from 'web3-core';
import { HttpAgent, HttpHeader } from "web3-core-helpers";

/**
 * Base timeout in milliseconds given by the Web3 documentation
 */
export const BASE_TIMEOUT_MS = 30000;

/**
 * Interface containing the structure of a simple Http websocket configuration
 */
export interface WebsocketConfig {

    /**
     * Timeout
     */
    timeout? : number;

    /**
     * Headers
     */
    headers? : HttpHeader[];

    /**
     * Websocket client configuration options
     */
    clientConfig? : {
        keepalive : boolean,
        keepaliveInterval : number,
        maxReceivedFrameSize : number,
        maxReceivedMessageSize : number
    };

    /**
     * Websocket reconnect options
     */
    reconnect? : { auto : boolean, delay : number, maxAttempts : number, onTimeout : boolean };

    /**
     * Http agent
     */
    agent? : HttpAgent;

}

/**
 * Builder for this config
 */
export class WebsocketConfigBuilder {

    /**
     * Websocket url
     * @private
     */
    private readonly url : string;

    /**
     * Timeout for the websocket
     * @private
     */
    private timeout : number;

    /**
     * Headers
     * @private
     */
    private headers : HttpHeader[] = [];

    /**
     * Configuration for the websocket client
     * @private
     */
    private clientConfig? : {
        keepalive : boolean,
        keepaliveInterval : number,
        maxReceivedFrameSize : number,
        maxReceivedMessageSize : number
    };

    /**
     * Reconnect options
     * @private
     */
    private reconnect? : { auto : boolean, delay : number, maxAttempts : number, onTimeout : boolean };

    /**
     * Http agent
     * @private
     */
    private agent? : HttpAgent;

    private conf? : WebsocketConfig;


    /**
     * Create a config builder
     *
     * @param url url for the service
     */
    constructor(url : string) {
        this.url = url;
        this.timeout = BASE_TIMEOUT_MS;
    }

    /**
     * Timeout in milliseconds for the websocket
     *
     * @param ms timeout
     */
    public addTimeout(ms : number) : WebsocketConfigBuilder {
        this.timeout = ms;
        return this;
    }

    /**
     * Add headers to the websocket
     *
     * @param headers headers to add
     */
    public addHeaders(headers : HttpHeader) : WebsocketConfigBuilder {
        this.headers.push(headers);
        return this;
    }

    /**
     * Add authentication credentials for the websocket
     *
     * @param ac auth creds
     */
    public addAuthCredentials(ac : AuthCredentials) : WebsocketConfigBuilder {
        this.addHeaders({ name: 'authorization', value: ac.username + ":" + ac.password });
        return this;
    }

    public addAgent(agent : HttpAgent) : WebsocketConfigBuilder {
        this.agent = agent;
        return this;
    }

    /**
     * Get an HttpProvider
     */
    httpProvider() : HttpProvider {
        return new HttpProvider(this.url, this.build());
    }

    /**
     * Build a configuration
     */
    public build() : WebsocketConfig {
        this.conf = {
            timeout: this.timeout,
            headers: this.headers,
            clientConfig: this.clientConfig,
            reconnect: this.reconnect,
            agent: this.agent
        }
        return this.conf;
    }

}
