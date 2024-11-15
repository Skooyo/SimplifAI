import { NextRequest, NextResponse } from 'next/server';
import { SDK, NetworkEnum } from "@1inch/cross-chain-sdk";

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Get Portofolio Details of a user */
export async function POST(req: NextRequest){
    if(!process.env.NEXT_PUBLIC_ONEINCH_API_KEY){
        return NextResponse.json({ error: 'API Key Not Detected'}, {status: 500});
    }
    try{
        const data = await req.json();
        const sdk = await new SDK({
            url: "https://api.1inch.dev/fusion-plus",
            authKey: process.env.NEXT_PUBLIC_ONEINCH_API_KEY
        });
        await delay(2000);
        const orders = await sdk.getOrdersByMaker({
            page: 1,
            limit: 2,
            address: "0xfa80cd9b3becc0b4403b0f421384724f2810775f"
        });
        //const orders = await sdk.getActiveOrders({ page: 1, limit: 2 });
        console.log(orders);
        
        return NextResponse.json({status: 200})
    }catch(error){
        return NextResponse.json({ error: 'Unable to fetch data' }, {status: 500});
    }
}