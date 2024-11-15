export interface TokenInformation {
    chain_id: number;
    contract_address:string;
    amount:number;
    price_to_usd:number;
    value_usd:number;
    abs_profit_usd:number;
    roi:number;
    status:number;
    tokenName? :string;
    tokenSymbol? :string;
    tokenLogo? :string;
}