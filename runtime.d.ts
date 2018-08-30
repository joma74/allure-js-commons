export class AllureRuntime {

	constructor(allure: Allure)

	readonly SEVERITY: SEVERITYTYPE;

	createStep(name: string, stepFunc: Function): Function;

	createAttachment(name: string, content: Buffer | Function | Uint8Array, mimeType: string);

	addLabel(name: string, value: any): void;
}

type SEVERITYTYPE = 'blocker' | 'critical' | 'minor' | 'normal' | 'trivial'