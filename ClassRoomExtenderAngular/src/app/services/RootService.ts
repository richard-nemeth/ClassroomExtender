import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';

import {PathConstants} from '../constants/PathConstants';

@Injectable()
export class RootService {

  public constructor(private httpClient: HttpClient) {

  }

  public getRootMessage(): any {
    let responseMsg: any;

    this.httpClient.get(PathConstants.ROOT_PATH).pipe(first()).subscribe(response => {
      responseMsg = response;
    });

    return responseMsg;
  }
}