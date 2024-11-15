import { NextRequest, NextResponse } from 'next/server';

/** Get Portofolio Details of a user */
export async function POST(req: NextRequest){
    if(!process.env.NEXT_PUBLIC_ONEINCH_API_KEY){
        return NextResponse.json({ error: 'API Key Not Detected'}, {status: 500});
    }
    try{
        const data = await req.json();
        if(!data.tokens){
            return NextResponse.json({ error: 'Tokens Not Specified'}, {status: 500});
        }
        if(!data.chainId){
            return NextResponse.json({ error: 'Chain Id Not Specified'}, {status: 500});
        }
        const tokenRequests = data.tokens.map((token:string)=>`addresses=${token}`).join('&');
        const endpoint = `https://api.1inch.dev/token/v1.2/1/custom?${tokenRequests}&chain_id=${data.chainId}`;
        console.log("Calling API at endpoint:", endpoint);
    
        const tokenDetails = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONEINCH_API_KEY}` }
        }).then((res) => res.json());
        console.log(tokenDetails)
        return NextResponse.json({tokenDetails})
    }catch(error){
        return NextResponse.json({ error: 'Unable to fetch data' }, {status: 500});
    }
}