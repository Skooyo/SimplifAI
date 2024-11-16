import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try{
        console.log("attempting fetch")
        const data = await fetch('https://2bc2-115-135-182-155.ngrok-free.app/api/eth-signal'
        , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log("data: ", data)
        const response = await data.json()
        console.log("datajson: ", response)
        return NextResponse.json(response, { status: response.status })
    } catch(error) {
        return NextResponse.json({ error: 'Error in here, Unable to fetch data' }, {status: 500});
    }
}