// Desc: Configuration file for Digitransit API
const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql';
const apiKey = '96d26948555e473e92fa9c62e32f9a2f';
const apiKey2 = '2ed713f28d5045ed9207211eb3557673';
const apiUrl2 = 'http://api.digitransit.fi/geocoding/v1/autocomplete';


const urlWithApiKey2 = `${apiUrl2}?digitransit-subscription-key=${apiKey2}`
const urlWithApiKey = `${apiUrl}?digitransit-subscription-key=${apiKey}`;

export {apiKey , apiKey2, urlWithApiKey, urlWithApiKey2};
  