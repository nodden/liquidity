import { Contract, ERROR, getContent, LOG } from '../src';
import { getCompiled } from "../src/bindings/solc-impl";
import { Goerli, liquidity } from "../dist";
import { Web3GoerliInfura } from "../src/bindings/web3-impl";

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
    let contract = new Web3GoerliInfura.eth.Contract(abi);

    // create an account
    let wallet = Web3GoerliInfura.eth.accounts.wallet.create(1);
    let account = wallet[0];

    expect(account != null);

    // https://www.edureka.co/blog/ethereum-smart-contract-deployment-web3/
    // as well as see deployment from the RemixIDE

    // This deploys, get we don't have the finances (???)
    const deployed = await contract.deploy({
        data: bytecode
    }).send({
        from: account.address,
        gas: 5000000
    }).then((deployment) => {
        LOG(deployment.options.address);
        return deployment;
    }).catch(ERROR);

    expect(deployed != null);
    expect(bytecode != null);
    expect(abi != null);
})
