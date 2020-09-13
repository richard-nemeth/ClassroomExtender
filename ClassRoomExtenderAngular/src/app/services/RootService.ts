import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';

import {PathConstants} from '../constants/PathConstants';

@Injectable()
export class RootService {

  public constructor(private httpClient: HttpClient) {

  }

  public async getRootMessage(): Promise<string> {
    let responseMsg: string;

    await this.httpClient.get(PathConstants.ROOT_PATH).toPromise().then(response => {
      responseMsg = JSON.stringify(response);
    });

    return responseMsg;
  }
}