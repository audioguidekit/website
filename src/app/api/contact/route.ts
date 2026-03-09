import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, organization, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email via Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        name,
        email,
        subject: `Contact Form: ${name}${organization ? ` from ${organization}` : ''}`,
        message: `
Organization: ${organization || 'Not provided'}

${message}
        `.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
