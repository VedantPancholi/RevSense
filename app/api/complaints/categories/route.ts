import { NextResponse } from 'next/server';

// Sample complaint categories data
const complaintCategories = [
  {
    category: "Food Quality Issues",
    count: 1245,
    details: "Issues related to food taste, temperature, and freshness"
  },
  {
    category: "Delivery Delays",
    count: 856,
    details: "Late deliveries and timing issues"
  },
  {
    category: "Order Accuracy",
    count: 643,
    details: "Wrong or missing items in orders"
  },
  {
    category: "Payment Issues",
    count: 412,
    details: "Problems with payments, refunds, and billing"
  },
  {
    category: "App/Website Issues",
    count: 325,
    details: "Technical problems with ordering platform"
  },
  {
    category: "Customer Service",
    count: 298,
    details: "Issues with customer support and service"
  }
];

export async function GET() {
  try {
    // Add artificial delay to simulate real API call (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));

    return new NextResponse(JSON.stringify(complaintCategories), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in complaints categories API:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to fetch complaint categories',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
} 