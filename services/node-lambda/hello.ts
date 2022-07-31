import { APIGatewayProxyEvent } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3Client = new S3();

async function handler(event: APIGatewayProxyEvent, context: any) {
  if (!isAuthorized(event)) {
    return {
      statusCode: 200,
      body: JSON.stringify("You are not authorized"),
    };
  }

  const buckets = await s3Client.listBuckets().promise();
  console.log("Got an event");
  console.log(event);
  return {
    statusCode: 200,
    body: "Buckets: " + JSON.stringify(buckets.Buckets),
  };
}

function isAuthorized(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims["cognito:groups"];
  if (groups) {
    return (groups as string).includes("admins");
  } else {
    return false;
  }
}

export { handler };
