import xlsx from 'node-xlsx';

export class StudentsUtil {

  private static readonly TAG: string = 'StudentsUtil';

  private constructor() {
  }

  public static async storeStudentsInDb(fileContent: Buffer): Promise<void> {
    this.processXMLStudens(fileContent);
  }

  public static processXMLStudens(fileContent: Buffer): void {
    const workSheetsFromFile = xlsx.parse(fileContent);

    workSheetsFromFile[0].data.forEach(element => {
      console.log(element);
    });
  }
}