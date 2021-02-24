import { ERROR } from "./liquidity";

export function validateJSON(json: string) : boolean {
    try {
        JSON.parse(json);
        return true;
    } catch (err) {
        ERROR(err.messsage);
        return false;
    }
}
