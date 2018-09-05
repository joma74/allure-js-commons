export type TESTSTATUS = "passed" | "pending" | "skipped" | "failed" | "broken"

export type DESCRIPTIONTYPE_K = "TEXT" | "HTML" | "MARKDOWN"

export type DESCRIPTIONTYPE_V = "text" | "html" | "markdown"

export type SEVERITYTYPE_K = "BLOCKER" | "CRITICAL" | "NORMAL" | "MINOR" | "TRIVIAL"

export type SEVERITYTYPE_V = "blocker" | "critical" | "normal" | "minor" | "trivial"

export type PARAMETERTYPE = "argument" | "environment-variable"

export type BUFFERTYPE = Uint8Array | Buffer | string

export type DESCRIPTIONS = {
	[K in DESCRIPTIONTYPE_K]: DESCRIPTIONTYPE_V
};

export type SEVERITIES = {
	[K in SEVERITYTYPE_K]: SEVERITYTYPE_V
};

export type KeysAndValues<U extends string, V extends string> = {
	[K in U]: V
};

export type KeysAndAnyValues<U extends string, V extends any> = {
	[K in U]: V
};

export type KeysAndValuesFrozen<U extends string, V extends string> = {
	readonly [K in U]: DeepReadonly<V>
};

export interface Parameter {
	kind: PARAMETERTYPE, 
	name: string, 
	value: any
}

export interface Label {
	name: string, 
	value: any
}

export interface SuiteResultXML {
    '@': {
        'xmlns:ns2': string
		start: number
		stop: number
    };
    name: string
    title: string
    'test-cases': {
        'test-case': TestResultXML[]
    };
}

export interface TestResultXML {
	description?: DescriptionResultXML
	failure?: {
		message: string,
		"stack-trace"?: string
	},
	"@" : {
		start: number,
		status: TESTSTATUS | undefined
		stop?: number
	},
	name: string,
	title: string,
	labels: {
		label: {
			"@" : Label
		}[]
	},
	parameters: {
		parameter: {
			"@" : Parameter
		}[]
	},
	steps: {
		step: StepResultXML[]
	},
	attachments: {
		attachment: AttachmentResultXML[]
	},
}

export interface DescriptionResultXML {
    '@': {
        type?: DESCRIPTIONTYPE_V;
    };
    '#': string;
}

export interface StepResultXML {
	"@" : {
		start: number,
		status: TESTSTATUS | undefined
		stop?: number
	},
	name: string,
	title: string,
	attachments: {
		attachment: AttachmentResultXML[]
	},
	steps: {
		step: StepResultXML[]
	}
}

export interface AttachmentResultXML {
	"@" : {
		title: string,
		source: string,
		type: string,
		size: number
	}
}