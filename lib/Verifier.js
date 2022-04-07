import {httpClient} from '@digitalbazaar/http-client/main.js';
import {agent} from './constants.js';

export class Verifier {
  constructor({settings, oath2}) {
    this.settings = settings;
    this.oauth2 = oath2;
  }
  async verify({credential, auth}) {
    try {
      const body = {
        verifiableCredential: credential,
        options: {
          checks: ['proof', 'credentialStatus'],
        },
      };
      const headers = {
        ...this.settings.headers
      };
      if(auth && auth.type === 'oauth2-bearer-token') {
        headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      let result;
      if(this.settings.verifier.zcap) {
        /* const zcapClient = await _getZcapClient();
        result = await zcapClient.write({
          url: this.settings.verifier.endpoint,
          capability: JSON.parse(this.settings.verifier.zcap),
          json: body
        });
        */
      } else {
          /*
        result = await httpClient.post(
          this.settings.endpoint,
          {headers, agent, json: body}
        );
        */
      }
      return result;
    } catch(e) {
      // this is just to make debugging easier
      if(e && e.response && e.response.data) {
        throw new Error(JSON.stringify(e.response.data, null, 2));
      }
      throw e;
    }
  }
}