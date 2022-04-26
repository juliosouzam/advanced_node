import { AuthenticationError } from '../errors';
import { AccessToken } from '../models';

export namespace IFacebookAuthentication {
  export type Params = {
    token: string;
  };

  export type Result = AccessToken | AuthenticationError;
}

export interface IFacebookAuthentication {
  perform(
    params: IFacebookAuthentication.Params,
  ): Promise<IFacebookAuthentication.Result>;
}
