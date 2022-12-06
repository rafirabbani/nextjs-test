const { NextRequest, NextResponse } = 'next/server';

export default async function authMiddleWare(req = NextRequest, res = NextResponse) {
  const token = req.headers.authorization;
  console.log('api request')
  if (token) {
    res.status(200).json({ name: 'John Doe' })
  }
  res.status(401).json({message: 'unauthorized'});
};
