import { INodeProperties } from 'n8n-workflow';
import { resourceKeys } from '../resources';

const operations = {
	short_url_create: 'short_url_create',
	short_url_list: 'short_url_list'
} as const;

const operationParameters: INodeProperties[] = [
	{
		displayName: 'Long URL',
		description: 'URL to be shortened',
		name: 'shortURLLongURL',
		required: true,
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Title',
		description: 'Display title of the URL',
		name: 'shortURLTitle',
		type: 'string',
		default: undefined,
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Crawlable',
		description: "Whether this URL will be included as 'Allow' in Shlink's robots.txt",
		name: 'shortURLIsCrawlable',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Forward Query',
		description: 'Whether the query params should be forwarded from the short URL to the long one',
		name: 'shortURLForwardQuery',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Find If Exists',
		description:
			'Whether force existing matching URL to be returned if found, instead of creating a new one',
		name: 'shortURLFindIfExists',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Domain',
		description: 'The domain to which the short URL will be attached',
		required: true,
		name: 'shortURLDomain',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Path Prefix',
		description:
			'A prefix that will be prepended to provided custom slug or auto-generated short code',
		name: 'shortURLPathPrefix',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'URL Generation Method',
		description: 'Choose how to generate the short URL',
		name: 'shortURLGenerationMethod',
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
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Custom Slug',
		description: 'A unique custom slug to be used instead of the generated short code',
		name: 'shortURLCustomSlug',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
				shortURLGenerationMethod: ['custom_slug'],
			},
		},
	},
	{
		displayName: 'Short Code Length',
		description: 'The length for generated short code. It has to be at least 4 and defaults to 5.',
		name: 'shortURLLength',
		type: 'number',
		typeOptions: {
			minValue: 4,
		},
		default: 5,
		displayOptions: {
			show: {
				operation: [operations.short_url_create],
				resource: [resourceKeys['short-urls']],
				shortURLGenerationMethod: ['short_code'],
			},
		},
	},
	{
		displayName: 'Page',
		description: 'The length for generated short code. It has to be at least 4 and defaults to 5.',
		name: 'shortURLPage',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				operation: [operations.short_url_list],
				resource: [resourceKeys['short-urls']],
			},
		},
	},
	{
		displayName: 'Items / Page',
		description: 'The length for generated short code. It has to be at least 4 and defaults to 5.',
		name: 'shortURLItemsPerPage',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: undefined,
		displayOptions: {
			show: {
				operation: [operations.short_url_list],
				resource: [resourceKeys['short-urls']],
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
				value: operations.short_url_create,
				action: 'Create short url',
				routing: {
					request: {
						method: 'POST',
						url: '/short-urls',
						body: {
							longUrl: '={{ $parameter["shortURLLongURL"] }}',
							title: '={{ $parameter["shortURLTitle"] ? $parameter["shortURLTitle"] : $parameter["shortURLLongURL"] }}',
							crawlable: '={{ $parameter["shortURLIsCrawlable"] }}',
							forwardQuery: '={{ $parameter["shortURLForwardQuery"] }}',
							domain: '={{ $parameter["shortURLDomain"] }}',
							pathPrefix: '={{ $parameter["shortURLPathPrefix"] }}',
							customSlug: '={{ $parameter["shortURLGenerationMethod"] === "custom_slug" ? $parameter["shortURLCustomSlug"] : undefined }}',
							findIfExists: '={{ $parameter["shortURLFindIfExists"] }}',
							shortCodeLength: '={{ $parameter["shortURLGenerationMethod"] === "short_code" ? $parameter["shortURLLength"] : undefined }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'List',
				value: operations.short_url_list,
				action: 'List short urls',
				routing: {
					request: {
						method: 'GET',
						url: '/short-urls',
						qs: {
							itemsPerPage: '={{ $parameter["shortURLItemsPerPage"] }}',
							page: '={{ $parameter["shortURLPage"] }}',
						},
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'short_url_create',
	},
	...operationParameters,
];

export const shortURLsOperationOptions = operationOptions;
