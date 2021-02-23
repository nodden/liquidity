import { Contract, getContent, LOG } from '../src';
import { getCompiled } from "../src/bindings/solc-impl";

test("Content", async () => {
    let content : Contract = await getContent('./__tests__/contracts/hello_world.sol')
    LOG(content);

    let c = getCompiled(content);
    LOG(JSON.parse(c));
})
