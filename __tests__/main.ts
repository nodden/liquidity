import { Contract, getContent, LOG } from '../src';
import { getCompiled } from "../src/bindings/solc-impl";
import { Goerli, liquidity } from "../dist";
import { Web3Goerli } from "../src/bindings/web3-impl";

test("Content",  () => {
    let content : Contract = getContent('./__tests__/contracts/hello_world.sol')
    LOG(content);

    let c = getCompiled(content);
    LOG(JSON.parse(c!.codeContents));
})

test("Compile and Deploy", async () => {
    let content : Contract = getContent('./__tests__/contracts/hello_world.sol');

    let compiledContent = getCompiled(content);
    let json = JSON.parse(compiledContent!.codeContents);

    // let contract = new web3.eth.Contract(json.abi);
    let abi = json.contracts['hello_world.sol']['hello_world'].abi;
    let bytecode = json.contracts['hello_world.sol']['hello_world'].evm.bytecode.object;
    let contract = new Web3Goerli.eth.Contract(abi);

    // create an account
    let account = Web3Goerli.eth.accounts.create();

    // However, this account does "not exist"
    // https://github.com/ChainSafe/web3.js/issues/986#issuecomment-379733058

    // https://www.edureka.co/blog/ethereum-smart-contract-deployment-web3/
    // as well as see deployment from the RemixIDE
    const deployed = contract.deploy({
        data: bytecode
    } );

    const instance = await deployed.send({
        from: account.address,
        gas: 1500000,
        gasPrice: '30000000000'
    })

    LOG(instance.options.address)

    expect(bytecode != null);
    expect(abi != null);
})
