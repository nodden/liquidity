/**
 * Interface containing structure of a Block's data
 */
export default interface Block {

    /**
     * Block height
     */
    height: number;

    /**
     * Amount of transactions in the block
     */
    transactions: number;

    /**
     * Hash that mined the block
     */
    minedBy: string;

    /**
     * Gas used for the block
     */
    gasUsed: number;

    /**
     * Limit of gas for the block
     */
    gasLimit: number;

    /**
     * Block size (bytes)
     */
    sizeInBytes: number;

    /**
     * Extra data from the block
     */
    extraData: string;

}
