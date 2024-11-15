import { NextRequest, NextResponse } from 'next/server';

/** Get Portofolio Details of a user */
export async function POST(req: NextRequest){
    if(!process.env.NEXT_PUBLIC_ONEINCH_API_KEY){
        return NextResponse.json({ error: 'API Key Not Detected'}, {status: 500});
    }
    try{
        const data = await req.json();
        console.log(data);
        if(!data.src){
            return NextResponse.json({ error: 'Source Token Specified'}, {status: 500});
        }
        if(!data.dst){
            return NextResponse.json({ error: 'Destination Token Specified'}, {status: 500});
        }
        if(!data.amount){
            return NextResponse.json({ error: 'Approval Amount Not Specified'}, {status: 500});
        }
        if(!data.from){
            return NextResponse.json({error: 'Wallet Address Not Specified'}, {status: 500});
        }
        if(!data.slippage){
            data.slippage = 1; //Set default to 1%
        }
        if(!data.chainId){
            return NextResponse.json({ error: 'Chain Id Not Specified'}, {status: 500});
        }
        const endpoint = `https://api.1inch.dev/swap/v6.0/${data.chainId}/swap?src=${data.src}&dst=${data.dst}&amount=${data.amount}&from=${data.from}&slippage=${data.slippage}`;
        console.log(endpoint);    
        const tx = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONEINCH_API_KEY}` }
        }).then((res) => res.json());
        console.log(tx);
        return NextResponse.json({tx})
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Unable to fetch data' }, {status: 500});
    }
}



// swapParams = {
//     "src": "0x111111111117dc0aa78b770fa6a738034120c302",  # Token address of 1INCH
//     "dst": "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",  # Token address of DAI
//     "amount": "100000000000000000",  # Amount of 1INCH to swap (in wei)
//     "from": walletAddress,
//     "slippage": 1,  # Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
//     "disableEstimate": False,  # Set to True to disable estimation of swap details
//     "allowPartialFill": False,  # Set to True to allow partial filling of the swap order
// }

//`https://api.1inch.dev/swap/v6.0/${chainId}/`?tokenAddress=${token.address}&amount=${token.amount}
/* `https://api.1inch.io/v5.0/1/swap?
fromTokenAddress=${tokenOne.address}
&toTokenAddress=${tokenTwo.address}
&amount=${tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount.length, '0')}
&fromAddress=${address}
&slippage=${slippage}`)*/