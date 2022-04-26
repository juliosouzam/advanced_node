// eslint-disable-next-line max-classes-per-file
import { IFacebookAuthentication } from '@/domain/features';

interface ILoadFacebookUserApi {
  loadUser(params: ILoadFacebookUserApi.Params): Promise<void>;
}

namespace ILoadFacebookUserApi {
  export type Params = {
    token: string;
  };
}

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) {
    //
  }

  async perform(params: IFacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params);
  }
}

class ILoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string;
  async loadUser(params: ILoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token;
  }
}

describe('Facebook Authentication Service', () => {
  test('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new ILoadFacebookUserApiSpy();
    const sut = new FacebookAuthenticationService(loadFacebookUserApi);
    const token = 'any_token';

    await sut.perform({ token });

    expect(loadFacebookUserApi.token).toBe(token);
  });
});
