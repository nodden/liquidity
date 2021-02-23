import * as fs from 'fs';
import * as pathUtil from 'path';

import Contract from "../types/contract";
import {ContractEntry, BasicEntry, URLEntry, InlineContractEntry} from "../types/contract-entry";
import { ERROR } from "../base/liquidity";

const solc = require('solc');

/**
 * Get the content of a CONTRACT FILE from the given path.
 *
 * @param path full path of the contract
 */
export async function getContent(path: string): Promise<Contract> {
    let finalContent: string[] = [];
    let licenseCount = 0;
    const lines = fs.readFileSync(pathUtil.resolve(path), 'UTF-8').split(/\r?\n/);

    lines.forEach(line => {
        // Restrict comments and blank lines.
        if (line.startsWith("//") && line.indexOf("SPDX") != -1 && licenseCount == 0) {
            finalContent.push(line + "\\n");
            licenseCount ++;
        }
        if (!line.startsWith("//") && line.indexOf("\n") == -1 && line.indexOf("\r") == -1 && line.length > 0) {
            finalContent.push(line);
        }
    });

    // This is the path-splitting regex -- used to split the entire input path to get the name of the contract.
    let fullPathContents = path.match("((?:[^/]*/)*)(.*)");
    let contractName = fullPathContents != null
        // Here we want the `last` capturing group.
        // Taking no chances with regex[2], letting it decide last value itself.
        ? fullPathContents[fullPathContents.length - 1]
        // If it somehow comes out as undefined, we will return the entire path.
        : path;
    return { contractName: contractName, codeContents: finalContent.join(" ") };
}

/**
 * Create a solc input JSON
 *
 * @param contract contract to parse from
 * @param settings input settings
 *
 * For more on settings and compilation, see below:
 * @link https://docs.soliditylang.org/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description
 */
function createSolidityInput(contract: Contract, settings?: any[]) {

    if (contract.codeContents !== undefined && settings === undefined) {
        let sources: JSON = JSON.parse((new InlineContractEntry(contract.contractName, contract.codeContents)).get());

        return {
            language: 'Solidity',
            sources,
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        }

    } else if (contract.contractUrls !== undefined) {
        let sources = JSON.parse(
            new ContractEntry(
                contract.contractName,
                [ new URLEntry(contract.contractUrls).get() ]
            ).get())
        ;
        if (settings !== undefined) {
            return {
                language: 'Solidity',
                sources,
                settings
            }
        } else {
            return {
                language: 'Solidity',
                sources,
                settings: {}
            }
        }
    } else {
        ERROR("( ERROR ) \u26D4 ", " Missing either settings or contract location / url(s)!");
    }
}

/**
 * Compile the contract and return output
 *
 * @param contract contract to compile
 */
export function getCompiled(contract: Contract) {
    return solc.compile(JSON.stringify(createSolidityInput(contract)));
}
