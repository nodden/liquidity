import { Contract, getContent, LOG } from '../src';
import { getCompiled } from "../src/bindings/solc-impl";
import { liquidity } from "../dist";

test("Content",  () => {
    let content : Contract = getContent('./__tests__/contracts/hello_world.sol')
    LOG(content);

    let c = getCompiled(content);
    LOG(JSON.parse(c!.codeContents));
})

test("Compile and Deploy", () => {
    let content : Contract = getContent('./__tests__/contracts/hello_world.sol');
    LOG(content);

    let compiledContent = getCompiled(content);
    LOG(JSON.parse(JSON.stringify(compiledContent!.codeContents, null, 4)));

    // liquidity.deploy(compiledContent, liquidity.getGoerli().provider());
})
