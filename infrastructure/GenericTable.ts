import { RemovalPolicy, Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";

export class GenericTable {
  private table: Table;

  public constructor(
    private stack: Stack,
    private name: string,
    private primaryKey: string
  ) {
    this.initialize();
  }

  private initialize() {
    this.createTable();
  }

  private createTable() {
    this.table = new Table(this.stack, this.name, {
      tableName: this.name,
      partitionKey: {
        name: this.primaryKey,
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
