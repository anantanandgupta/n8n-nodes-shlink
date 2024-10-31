import { INodeType, INodeTypeDescription } from "n8n-workflow";
import { resourceOptions } from "./resources";
import { shortURLsOperationOptions } from "./operations";

export class Shlink implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Shlink',
    name: 'shlink',
    icon: {
      dark: 'file:Shlink.icon.svg',
      light: 'file:Shlink.icon.svg',
    },
    group: ['transform'],
    version: [1],
    defaultVersion: 1,
    subtitle: '={{ $parameter["resource"] + " (" + $parameter["operation"] + ")" }}',
    description: 'Call Shlink endpoints.',
    defaults: {
      name: 'Shlink',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'shlinkApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{ $credentials.host.replace(new RegExp("/$"), "") + "/rest/v3" }}',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    },
    properties: [
      resourceOptions,
      ...shortURLsOperationOptions,
    ]
  };
}
