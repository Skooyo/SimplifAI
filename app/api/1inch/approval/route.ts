import { NextRequest, NextResponse } from 'next/server';

/** Get Portofolio Details of a user */
export async function POST(req: NextRequest){
    if(!process.env.NEXT_PUBLIC_ONEINCH_API_KEY){
        return NextResponse.json({ error: 'API Key Not Detected'}, {status: 500});
    }
    try{
        const data = await req.json();
        console.log(data);
        if(!data.tokenAddress){
            return NextResponse.json({ error: 'Token Not Specified'}, {status: 500});
        }
        if(!data.amount){
            return NextResponse.json({ error: 'Approval Amount Not Specified'}, {status: 500});
        }
        if(!data.chainId){
            return NextResponse.json({ error: 'Chain Id Not Specified'}, {status: 500});
        }
        const endpoint = `https://api.1inch.dev/swap/v6.0/${data.chainId}/approve/transaction?tokenAddress=${data.tokenAddress}&amount=${data.amount}`;    
        const tx = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONEINCH_API_KEY}` }
        }).then((res) => res.json());
        return NextResponse.json({tx})
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Unable to fetch data' }, {status: 500});
    }
}


//`https://api.1inch.dev/swap/v6.0/${chainId}/`?tokenAddress=${token.address}&amount=${token.amount}