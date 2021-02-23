import {Contract, getContent} from '../src';
import { getCompiled } from "../src/bindings/solc-impl";

test("Content", async () => {
    let content : Contract = await getContent('./__tests__/contracts/hello_world.sol')
    console.log(content);

    let c = getCompiled(content);
    console.log(JSON.parse(c));
})
