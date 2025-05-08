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
  const TextWebhookUrls = ['https://www.taskade.com/webhooks/flow/01JQB6NWP99Q61ZTVQMFH52XB6',
    'https://www.taskade.com/webhooks/flow/01JT7M368F7GPA2DDNFFXF3PRD',
    'https://www.taskade.com/webhooks/flow/01JT7M34WRWJX3C3C7CSQ9W282',
    'https://www.taskade.com/webhooks/flow/01JT7M33GDZWEEX5KW5C198RRH',
    'https://www.taskade.com/webhooks/flow/01JT7M32F1807Z8PK5GZ4ZPZ0K',
    'https://www.taskade.com/webhooks/flow/01JT7M30YXSFFE4C2QVTS5D99V',
    'https://www.taskade.com/webhooks/flow/01JT7M2ZWDCY5MDBTBN8G3K6C4',
    'https://www.taskade.com/webhooks/flow/01JT7M2YH99XZ4AK9QDBM5ZQ2A',
    'https://www.taskade.com/webhooks/flow/01JT7M2XDJB0E0ZV82DP1S748M',
    'https://www.taskade.com/webhooks/flow/01JT7M2W8M195HQX95NYB36HGY',
    'https://www.taskade.com/webhooks/flow/01JT7M2V19G6V67PJ9C75NZ833',
    'https://www.taskade.com/webhooks/flow/01JT7M2SHVQBPY5SYHQQ8V6WSP',
    'https://www.taskade.com/webhooks/flow/01JT7M2R8RG7E3G2AAMJMR1BC9',
    'https://www.taskade.com/webhooks/flow/01JT7MGTHRSSC73EJRDS4MRVJB',
    'https://www.taskade.com/webhooks/flow/01JT7MGRJEKZK73SHY6NXRC51N'
  ]
  const index = dbLength % youtubeWebhookUrls.length; 
  const webhookUrl = isYoutubeLink
  ? youtubeWebhookUrls[index]
  : TextWebhookUrls[index];
  console.log(dbLength)
  console.log(url)
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