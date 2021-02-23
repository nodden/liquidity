/**
 * Entry base structure
 */
interface Entry {

    key : string;
    value : any;

}

/**
 * Very simple JSON entry in the format of
 *
 * { "key":"value" }
 */
export class BasicEntry implements Entry {

    key : string;
    value : any;

    constructor(key : string, value : any) {
        this.key = key;
        this.value = value;
    }

    public get() : string {
        return JSON.stringify(
            JSON.parse(
                // { "key" : "val" }
                "{ \"" + this.key + "\" : \"" + this.value + " \"" + "}"
            )
        );

    }

}

export class URLEntry implements Entry {

    key : string;
    value : string[];

    constructor(value : string[]) {
        this.key = "urls";
        this.value = value;
    }

    public get() : string {
        let newArr : string[] = [];
        this.value.forEach(val => {
            newArr.push("\"" + val + "\"");
        });

        return JSON.stringify(
            JSON.parse(
                // { "key" : [ val ] }
                "{ \"" + this.key + "\" : [" + newArr.join(",") + "]}"
            )
        );
    }

}

export class ContractEntry implements Entry {

    key : string;
    value : any[];

    constructor(key : string, value : any[]) {
        this.key = key;
        this.value = value;
    }

    public get() : string {
        return JSON.stringify(
            JSON.parse(
                "{\"" + this.key + "\": " + this.value + "}"
            )
        )
    }

}

/**
 * Create a JSON contract entry for solc VIA scanning the file.
 *
 * @inheritDoc unrecommended, but if needed, it's here.
 */
export class InlineContractEntry implements Entry {

    key : string;
    value : any;

    constructor(key : string, value : any) {
        this.key = key;
        this.value = value;
    }

    /**
     * Take handwritten JSON for dynamic inputs and return it back into a string.
     */
    public get() : string {

        return JSON.stringify(
            JSON.parse(
                "{\"" + this.key + "\": { " +
                "\"content\": \"" + this.value + "\"" +
                "}}"
            )
        );

    }

}
