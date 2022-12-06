const { NextRequest, NextResponse } = 'next/server';

export default async function test(req=NextRequest, res=NextResponse) {
    console.log(req.headers);
    console.log(req.body);
    res.status(200).json({message: 'in controller'});
};