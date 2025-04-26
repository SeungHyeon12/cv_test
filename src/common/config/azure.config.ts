import { registerAs } from '@nestjs/config';

export default registerAs('azure', () => ({
  //azure blob
  blobAccKey: process.env.AZURE_ACCOUNT_KEY,
  blobAccName: process.env.AZURE_ACCOUNT_NAME,
  blobConnection: process.env.AZURE_CONNECTION_STRING,
  blobContainer: process.env.AZURE_CONTAINER,

  //azure openAI
  openAIUrl: process.env.AZURE_ENDPOINT_URL,
  openAIKey: process.env.AZURE_ENDPINT_KEY,
  openAIVersion: process.env.OPEN_API_VERSION,
  openAiDeployName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
}));
