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

export async function GET() {
  //   const { limit } = req.query;
  const params = {
    TableName: "crypto_v1",
  };

  try {
    const data = await docClient?.scan(params).promise();
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("Error fetching data from DynamoDB", err);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
