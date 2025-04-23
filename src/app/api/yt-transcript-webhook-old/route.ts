import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const { url, taskId,dbLength } = await request.json();
  
  // Check if the input is a YouTube link
  const isYoutubeLink = url.includes('https://www.youtube.com/');
  const youtubeWebhookUrls = [
    'https://www.taskade.com/webhooks/flow/01JNNWZPBEBK343J2KFM3BRTCB',
    'https://www.taskade.com/webhooks/flow/01JSBHB6N4AX3MSQ00TKD95NDV',
    'https://www.taskade.com/webhooks/flow/01JSBHC35ZQE97QGWD59BTVGMR',
    'https://www.taskade.com/webhooks/flow/01JSBHCZZDQD4JHS4Q3Z1G5M8Z',
    'https://www.taskade.com/webhooks/flow/01JSBHE0RR77ZGN88N66FHZT01',
    'https://www.taskade.com/webhooks/flow/01JSG2W5EFY0DQB7XDSB188JAQ',
    'https://www.taskade.com/webhooks/flow/01JSG2XRA2RG75WFDQXAQ2YZG3',
    'https://www.taskade.com/webhooks/flow/01JSG2YCJR1NBWZSFST5C9HJBW',
    'https://www.taskade.com/webhooks/flow/01JSG2ZCY2PTRQJEBWMXJRDK57',
    'https://www.taskade.com/webhooks/flow/01JSG300KBFTNYHGFNW1XRV2S3',
    'https://www.taskade.com/webhooks/flow/01JSG30N43FJ2EGZ1MVZN7WMHX',
    'https://www.taskade.com/webhooks/flow/01JSG31JAQADS45YDCR2H9FY3W',
    'https://www.taskade.com/webhooks/flow/01JSG32Q2WBZYGTKZWX67A3SEH',
    'https://www.taskade.com/webhooks/flow/01JSG33E1WYV3X3KGNB7N1ZTXB',
    'https://www.taskade.com/webhooks/flow/01JSG34CAK106CGJD7H01NZ8MP',
    'https://www.taskade.com/webhooks/flow/01JSG3568Z2VQQTPNFCNAMPV96'    
  ];
  const defaultWebhookUrl = 'https://www.taskade.com/webhooks/flow/01JQB6NWP99Q61ZTVQMFH52XB6';
  const index = dbLength % youtubeWebhookUrls.length; 
  const webhookUrl = isYoutubeLink
  ? youtubeWebhookUrls[index]
  : defaultWebhookUrl;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript:url, taskId }),
    });

    if (!response.ok) {
      throw new Error('Webhook request failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}