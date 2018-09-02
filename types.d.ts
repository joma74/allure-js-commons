export type TESTSTATUS = 'passed' | 'pending' | 'skipped' | 'failed' | 'broken';

export type DESCRIPTIONTYPE = "text" | "html" | "markdown"

export type PARAMETERTYPE = "argument" | "environment-variable"

export type BUFFERTYPE = Uint8Array | undefined

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