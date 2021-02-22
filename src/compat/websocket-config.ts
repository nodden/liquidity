import { AuthCredentials } from "../types/serviceprovider";
import { HttpProvider } from 'web3-core';
import { HttpAgent, HttpHeader } from "web3-core-helpers";

export const BASE_TIMEOUT_MS = 30000;

export interface WebsocketConfig {

    timeout?: number;

    headers?: HttpHeader[];

    clientConfig?: {
        keepalive: boolean,
        keepaliveInterval: number,
        maxReceivedFrameSize: number,
        maxReceivedMessageSize: number
    };

    reconnect?: { auto: boolean, delay: number, maxAttempts: number, onTimeout: boolean };

    agent?: HttpAgent;

}

export default class WebsocketConfigBuilder {

    private readonly url: string;

    private timeout: number = 0;
    private headers: HttpHeader[];

    private clientConfig: {
        keepalive: boolean,
        keepaliveInterval: number,
        maxReceivedFrameSize: number,
        maxReceivedMessageSize: number
    };

    private reconnect: { auto: boolean, delay: number, maxAttempts: number, onTimeout: boolean };

    private conf : WebsocketConfig;


    constructor(url: string) {
        this.url = url;
    }

    public addTimeout(ms: number) {
        this.timeout = ms;
    }

    public addHeaders(headers: HttpHeader) {
        this.headers.push(headers);
    }

    public addAuthCredentials(ac: AuthCredentials) {
        this.addHeaders({ name: 'authorization', value: ac.username + ":" + ac.password });
    }

    httpProvider() : HttpProvider {
        return new HttpProvider(this.url, this.build());
    }

    public build() : WebsocketConfig {
        this.conf = {
            timeout: this.timeout,
            headers: this.headers,
            clientConfig: this.clientConfig,
            reconnect: this.reconnect,
            agent: {}
        }
        return this.conf;
    }

}
