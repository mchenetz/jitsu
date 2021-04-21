declare type DestinationType = 'postgres' | 'bigquery' | 'redshift' | 'clickhouse' | 'snowflake' | 'facebook' | 'google_analytics';

declare interface DestinationData {
  // private _mappings: FieldMappings = new FieldMappings([], true);
  // protected readonly _uid = randomId();
  // protected readonly _onlyKeys = [];

  readonly _type: DestinationType;
  _id: string;
  _uid: string;
  _comment: string;
  _connectionTestOk: boolean;
  _connectionErrorMessage: React.ReactNode;
  _mode: 'batch' | 'stream';
  _formData: {
    [key: string]: any;
  };
}
