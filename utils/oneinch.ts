const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Get Portofolio Details of a user */
export async function getTokenDetails(walletAddress:string, chainId:number) {
    try{
        const res = await fetch('/api/1inch/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({walletAddress, chainId})
        })
        const data:any = await res.json();
        return data.tokenDetails;
    }catch(error){
        console.error('Error:', error);
    }
}

/** Get Details of a Token */
export async function getTokenInformations(tokens:string[], chainId:number) {
    try{
        const res = await fetch('/api/1inch/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokens, chainId})
        })
        const data:any = await res.json();
        return data.tokenDetails; 
    }catch(error){
        console.error('Error:', error);
    }
}

export interface SwapParams {
    src: string;        // Sold Token
    dst: string;        // Purchased Token
    amount: string;     // Amount of Token to Swap
    from: string;       // Wallet Address of the User
    slippage: number;   // Maximum Slippage Percentage
    chainId: number;    // Chain Id
}

/** Get Approval for a Token Transaction */
export async function getApproval(tokenAddress:string, amount:number, chainId:number, walletAddress:string) {
    try{
        // Search for Token Decimal
        const token = await getTokenInformations([tokenAddress], chainId);
        const decimal:number = token[tokenAddress].decimals;
        await delay(2000);
        // Calculate the Approval Amount using the decimals
        const tokenApproval = BigInt(amount * (10**decimal)).toString();
        
        // Request Approval Transaction from 1inch
        const res = await fetch('/api/1inch/approval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tokenAddress, amount: tokenApproval, chainId})
        })
        const data:any = await res.json();
        return data.tx;
    }catch(error){
        console.error('Error:', error);
    }
}

/** Request Swap Transaction to One Inch */
export async function getSwapTransaction(swapParams: SwapParams) {
    try{
        // Request Swap Transaction from 1inch
        const res = await fetch('/api/1inch/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(swapParams)
        })
        const data:any = await res.json();
        return data.tx;
    }catch(error){
        console.error('Error:', error);
    }
}