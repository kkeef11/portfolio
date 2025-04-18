import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";

aws.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new aws.DynamoDB.DocumentClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //   const { limit } = req.query;
  const params = {
    TableName: "crypto_v1",
  };

  try {
    const data = await docClient.scan(params).promise();
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
