interface Server {
  port: number;
}

interface Logger {
  timeStampFormat: string;
  logDestination: string;
  datePattern: string;
  maxFilesStore: string;
}

export interface Configuration {
  server: Server;
  logger: Logger;
};