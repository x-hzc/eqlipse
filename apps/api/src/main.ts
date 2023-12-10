import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      proof: [],
    }),
    headers: {
      'access-control-allow-origin': '*',
    },
  };
};

export { handler };
