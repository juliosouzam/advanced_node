// eslint-disable-next-line max-classes-per-file
import { ILoadFacebookUserApi } from '@/data/contracts/apis';
import { AuthenticationError } from '@/domain/errors';
import { IFacebookAuthentication } from '@/domain/features';

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserApi: ILoadFacebookUserApi) {
    //
  }

  async perform(
    params: IFacebookAuthentication.Params,
  ): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params);

    return new AuthenticationError();
  }
}

class ILoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string;
  result = undefined;

  async loadUser(
    params: ILoadFacebookUserApi.Params,
  ): Promise<ILoadFacebookUserApi.Result> {
    this.token = params.token;

    return this.result;
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

  test('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new ILoadFacebookUserApiSpy();
    loadFacebookUserApi.result = undefined;
    const sut = new FacebookAuthenticationService(loadFacebookUserApi);
    const token = 'any_token';

    const authResult = await sut.perform({ token });

    expect(authResult).toEqual(new AuthenticationError());
  });
});
