import { IAuthenticate, IconFile, ICredentialType, INodeProperties } from 'n8n-workflow';
const icon: IconFile = 'file:Shlink.icon.svg';
export class ShlinkApi implements ICredentialType {
  name = 'shlinkApi';
  icon = {
    dark: icon,
    light: icon,
  };
  displayName = 'Shlink API';
  documentationUrl: string = 'https://shlink.io/documentation/api-docs/authentication/';
  authenticate: IAuthenticate = {
    type: 'generic',
    properties: {
      headers: {
        'x-api-key': '={{ $credentials["apiKey"] }}',
      },
    },
  };
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      required: true,
      default: '',
    },
    {
      displayName: 'Host',
      name: 'host',
      type: 'string',
      hint: 'prefix with protocol like http:// or https://',
      required: true,
      validateType: 'url',
      default: 'https://shlink.example.com',
    },
  ];
}
