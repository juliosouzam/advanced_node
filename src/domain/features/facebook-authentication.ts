import { AuthenticationError } from '../errors';
import { AccessToken } from '../models';

namespace IFacebookAuthentication {
  export type Params = {
    accessToken: string;
  };

  export type Result = AccessToken | AuthenticationError;
}

export interface IFacebookAuthentication {
  perform: (
    params: IFacebookAuthentication.Params,
  ) => Promise<IFacebookAuthentication.Result>;
}
