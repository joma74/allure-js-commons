// Type definitions for allure-js-commons
// Project: allure-framework/allure-js-commons
// Definitions by: joma74 <dev-mails@gmx.net>

export class Allure {

	private suites: string[]

	private options: Option

	setOptions(options: Option): void

	getCurrentSuite(): any

	getCurrentTest(): any

	startSuite(suiteName: string, timestamp?: number): void

	endSuite(timestamp: number): void

	startCase(testName: string, timestamp?: number): void

	endCase(status: STATUSES, err: Error, timestamp?: number): void

	startStep(stepName: string, timestamp?: number): void

	endStep(status: STATUSES, timestamp?: number): void

	setDescription(description: string, type: DESCRIPTIONTYPE): void

	addAttachment(attachmentName: string, buffer: Buffer | Uint8Array, mimeType: string): void

	pendingCase(testName: string, timestamp?: number): void
}

interface Option {
	[key: string]: string
	targetDir: string = 'allure-results'
}

type STATUSES = 'passed' | 'pending' | 'skipped' | 'failed' | 'broken'  | string

type DESCRIPTIONTYPE = "text" | "html" | "markdown" | string

