import { INodeProperties } from 'n8n-workflow';
import { resourceKeys } from '../resources';

const operations = {
	create: 'create',
} as const;

const operationParameters: INodeProperties[] = [
	{
		displayName: 'Long URL',
		description: 'URL to be shortened',
		name: 'shortCodeLongURL',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Title',
		description: 'Display title of the URL',
		name: 'shortCodeTitle',
		type: 'string',
		default: undefined,
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Crawlable',
		description: "Whether this URL will be included as 'Allow' in Shlink's robots.txt",
		name: 'shortCodeIsCrawlable',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Forward Query',
		description: 'Whether the query params should be forwarded from the short URL to the long one',
		name: 'shortCodeForwardQuery',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Find If Exists',
		description:
			'Whether force existing matching URL to be returned if found, instead of creating a new one',
		name: 'shortCodeFindIfExists',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Domain',
		description: 'The domain to which the short URL will be attached',
		required: true,
		name: 'shortCodeDomain',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Path Prefix',
		description:
			'A prefix that will be prepended to provided custom slug or auto-generated short code',
		name: 'shortCodePathPrefix',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'URL Generation Method',
		description: 'Choose how to generate the short URL',
		name: 'urlGenerateOption',
		type: 'options',
		required: true,
		default: 'short_code',
		options: [
			{
				name: 'Short Code',
				value: 'short_code',
			},
			{
				name: 'Custom Slug',
				value: 'custom_slug',
			},
		],
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Custom Slug',
		description: 'A unique custom slug to be used instead of the generated short code',
		name: 'shortCodeCustomSlug',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
				urlGenerateOption: ['custom_slug'],
			},
		},
	},
	{
		displayName: 'Short Code Length',
		description: 'The length for generated short code. It has to be at least 4 and defaults to 5.',
		name: 'shortCodeLength',
		type: 'number',
		typeOptions: {
			minValue: 4,
		},
		default: 5,
		displayOptions: {
			show: {
				operation: [operations.create],
				resource: [resourceKeys['short-urls']],
				urlGenerateOption: ['short_code'],
			},
		},
	},
];

const operationOptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [resourceKeys['short-urls']],
			},
		},
		options: [
			{
				name: 'Create',
				value: operations.create,
				action: 'Create short url',
				routing: {
					request: {
						method: 'POST',
						url: '/short-urls',
						body: {
							longUrl: '={{ $parameter["shortCodeLongURL"] }}',
							title: '={{ $parameter["shortCodeTitle"] ? $parameter["shortCodeTitle"] : $parameter["shortCodeLongURL"] }}',
							crawlable: '={{ $parameter["shortCodeIsCrawlable"] }}',
							forwardQuery: '={{ $parameter["shortCodeForwardQuery"] }}',
							domain: '={{ $parameter["shortCodeDomain"] }}',
							pathPrefix: '={{ $parameter["shortCodePathPrefix"] }}',
							customSlug: '={{ $parameter["urlGenerateOption"] === "custom_slug" ? $parameter["shortCodeCustomSlug"] : undefined }}',
							findIfExists: '={{ $parameter["shortCodeFindIfExists"] }}',
							shortCodeLength: '={{ $parameter["urlGenerateOption"] === "short_code" ? $parameter["shortCodeLength"] : undefined }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'create',
	},
	...operationParameters,
];

export const shortURLsOperationOptions = operationOptions;
