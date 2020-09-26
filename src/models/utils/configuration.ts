interface Server {
  port: number;
}

export interface LoggerConfiguration {
  timeStampPattern: string;
  logDestination: string;
  datePattern: string;
  fileStoreDays: string;
}

export interface Configuration {
  server: Server;
  logger: LoggerConfiguration;
  allowedOrigin: string;
};