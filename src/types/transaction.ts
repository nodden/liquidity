import { TransactionStatus } from "./transaction-status";
import Block from "./block";

/**
 * Interface containing a generic struct for a transaction
 */
export default interface Transaction {

    /**
     * Block that the transaction belongs to
     */
    block : Block;

    /**
     * Status of the transaction
     */
    status : TransactionStatus;

    /**
     * Hash of the transaction
     */
    hash : string;

    /**
     * From hash
     */
    fromHash : string;

    /**
     * To hash
     */
    toHash : string;

    /**
     * Value of the transaction (in eth)
     */
    ethValue : number;

    /**
     * Price of the gas for the transaction in eth)
     */
    gasPrice : number;

    /**
     * Limit of the gas for the transaction (in eth)
     */
    gasLimit : number;

    /**
     * Gas used in the transaction (eth)
     */
    gasUsed : number;

    /**
     * Nonce
     */
    nonce : number;

}

