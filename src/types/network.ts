export default class Network {

    public readonly name : string;
    public readonly url : string;
    public readonly chainId : number;

    constructor(name: string, url: string, chainId: number) {
        this.name = name;
        this.url = url;
        this.chainId = chainId;
    }

}

export const Goerli : Network = { name: "Goerli Test Network", url: "https://goerli.prylabs.net/", chainId: 5 };
