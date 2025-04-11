import { NextResponse } from 'next/server';

interface RootCause {
  key_aspect_1: string;
  key_aspect_2: string;
  key_aspect_3?: string;
}

interface Impact {
  customer_experience: string;
  trust_loss: string;
  financial_loss: string;
}

interface CustomerService {
  bot_reliance: string;
  human_agents: string;
  escalation_process: string;
}

interface SuggestedFixes {
  aspect_1: string;
  aspect_2: string;
  customer_service?: CustomerService;
}

interface Issue {
  issue_type: string;
  root_cause: RootCause;
  impact: Impact;
  severity: string;
  frequency: string;
  suggested_fixes: SuggestedFixes;
}

interface BusinessInsight {
  category: string;
  issues: Issue[];
}

export async function GET() {
  try {
    console.log('Fetching data from external API...');
    
    const response = await fetch('http://localhost:8000/data', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      cache: 'no-store',
      mode: 'cors',
    });
    
    console.log('API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const responseData = await response.json();
    console.log('Raw API Response:', responseData);
    
    // Handle different response formats
    let data: BusinessInsight[];
    if (Array.isArray(responseData)) {
      data = responseData;
    } else if (responseData && typeof responseData === 'object') {
      if (Array.isArray(responseData.data)) {
        data = responseData.data;
      } else if (Array.isArray(responseData.business_insights)) {
        data = responseData.business_insights;
      } else {
        throw new Error('Invalid API response format: data not found');
      }
    } else {
      throw new Error('Invalid API response format: not an object or array');
    }
    
    console.log('Extracted Data:', data);
    
    // Process and validate each business insight
    const processedData = data.map((item: any) => {
      if (!item || typeof item !== 'object') {
        console.warn('Invalid item format:', item);
        return null;
      }

      // Validate required fields
      if (!item.category || !Array.isArray(item.issues)) {
        console.warn('Missing required fields in item:', item);
        return null;
      }

      return {
        category: item.category,
        issues: item.issues.map((issue: any) => ({
          issue_type: issue.issue_type || 'Unknown Issue',
          root_cause: {
            key_aspect_1: issue.root_cause?.key_aspect_1 || '',
            key_aspect_2: issue.root_cause?.key_aspect_2 || '',
            key_aspect_3: issue.root_cause?.key_aspect_3 || '',
          },
          impact: {
            customer_experience: issue.impact?.customer_experience || '',
            trust_loss: issue.impact?.trust_loss || '',
            financial_loss: issue.impact?.financial_loss || '',
          },
          severity: issue.severity || 'Unknown',
          frequency: issue.frequency || 'Unknown',
          suggested_fixes: {
            aspect_1: issue.suggested_fixes?.aspect_1 || '',
            aspect_2: issue.suggested_fixes?.aspect_2 || '',
            customer_service: issue.suggested_fixes?.customer_service ? {
              bot_reliance: issue.suggested_fixes.customer_service.bot_reliance || '',
              human_agents: issue.suggested_fixes.customer_service.human_agents || '',
              escalation_process: issue.suggested_fixes.customer_service.escalation_process || '',
            } : undefined,
          },
        })),
      };
    }).filter((item): item is BusinessInsight => item !== null);
    
    if (processedData.length === 0) {
      throw new Error('No valid business insights found in the response');
    }
    
    console.log('Processed Data:', processedData);
    
    return new NextResponse(JSON.stringify(processedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in business insights API:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to fetch business insights data',
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

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 