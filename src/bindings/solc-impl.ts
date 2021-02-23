import * as fs from 'fs';

const solc = require('solc');

export function getContent(path: string) {
    fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(" ( ERROR ) \u26D4 ", err.message, ". :(");
            }
            return data;
        }
    )
}
