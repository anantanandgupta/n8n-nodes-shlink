import type { INodeProperties } from 'n8n-workflow';
export const resourceKeys = {
	'short-urls': 'short-urls',
} as const;

export const resourceOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Short URL',
			value: resourceKeys['short-urls'],
		},
	],
	default: 'short-urls',
};
