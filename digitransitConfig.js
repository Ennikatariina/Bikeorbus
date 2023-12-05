const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const apiKey = '96d26948555e473e92fa9c62e32f9a2f';

const urlWithApiKey = `${apiUrl}?digitransit-subscription-key=${apiKey}`;

export default urlWithApiKey;