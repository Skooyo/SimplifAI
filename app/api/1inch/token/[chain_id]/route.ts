import { NextRequest, NextResponse } from 'next/server';

/** Get Portofolio Details of a user */
export async function GET(req: NextRequest, { params }: { params: any }){
    if(!process.env.NEXT_PUBLIC_ONEINCH_API_KEY){
        return NextResponse.json({ error: 'API Key Not Detected'}, {status: 500});
    }
    try{
        const { chain_id } = await params;
        const allTokens = await fetch(`https://api.1inch.dev/token/v1.2/${chain_id}/token-list`, {
            headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONEINCH_API_KEY}` }
        }).then((res) => res.json());
        return NextResponse.json({allTokens})
    }catch(error){
        return NextResponse.json({ error: 'Unable to fetch data' }, {status: 500});
    }
}