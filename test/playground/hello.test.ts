import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/SpacesTable/Create";

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: "38b4f3d7-f0e1-4384-889a-9d52fbe0b211",
    // location: "London",
  },
  body: {
    location: "Montreal",
  },
} as any;

handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log({ items });
});
