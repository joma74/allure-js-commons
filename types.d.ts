export type TESTSTATUS = "passed" | "pending" | "skipped" | "failed" | "broken"

export type DESCRIPTIONTYPE_K = "TEXT" | "HTML" | "MARKDOWN"

export type DESCRIPTIONTYPE_V = "text" | "html" | "markdown"

export type SEVERITYTYPE_K = "BLOCKER" | "CRITICAL" | "NORMAL" | "MINOR" | "TRIVIAL"

export type SEVERITYTYPE_V = "blocker" | "critical" | "normal" | "minor" | "trivial"

export type PARAMETERTYPE = "argument" | "environment-variable"

export type BUFFERTYPE = Uint8Array | Buffer

export type DESCRIPTIONS = {
	[K in DESCRIPTIONTYPE_K]: DESCRIPTIONTYPE_V
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

export type SEVERITIES = KeysAndValuesFrozen<SEVERITYTYPE_K, SEVERITYTYPE_V>

export interface Parameter {
	kind: PARAMETERTYPE, 
	name: string, 
	value: any
}

export interface Label {
	name: string, 
	value: any
}

export class IRuntime {
	createAttachment(name: string, content: Function, type: string): Function
	createAttachment(name: string, content: BUFFERTYPE, type: string): void
	createAttachment(name: string, content: Function | BUFFERTYPE | any, type: string): Function | void
}