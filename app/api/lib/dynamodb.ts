import aws from "aws-sdk";

let docClient: aws.DynamoDB.DocumentClient | null = null;

if (
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_REGION
) {
  aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  docClient = new aws.DynamoDB.DocumentClient();
}

export async function fetchCryptoData() {
  const params = { TableName: "crypto_v1" };
  return await docClient?.scan(params).promise();
}
