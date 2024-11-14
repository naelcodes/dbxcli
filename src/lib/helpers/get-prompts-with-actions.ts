import type {DirectusCliPromptsAnswers, Prompt, PromptAction} from '@common/types.js';
import {DIRECTUS_CLI_PROMPTS} from '@common/constants.js';
import {directusPromptActions} from '@lib/prompts';

export function getPromptsWithActions(answer: DirectusCliPromptsAnswers): [Prompt[], PromptAction[]] {
	const prompts: Prompt[] = [];
	const promptActions: PromptAction[] = [];
	const {extensionName, bundleEntryName, extensionType, install, language, path} = answer;

	if (extensionName) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_NAME_PROMPT,
			state: {
				answer: extensionName,
				isExtensionNameSet: false,
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_NAME_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.EXTENSION_NAME_PROMPT],
		} satisfies PromptAction);
	}

	if (bundleEntryName) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.BUNDLE_ENTRY_NAME_PROMPT,
			state: {
				answer: bundleEntryName,
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.BUNDLE_ENTRY_NAME_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.BUNDLE_ENTRY_NAME_PROMPT],
		} satisfies PromptAction);
	}
	if (extensionType) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT,
			state: {
				answer: extensionType,
				promptStartLine: DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT,
				currentChoice: '',
				seenChoices: new Set<string>(),
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT],
		} satisfies PromptAction);
	}
	if (install) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.AUTO_INSTALL_DEPENDENCY_PROMPT,
			state: {
				answer: install,
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.AUTO_INSTALL_DEPENDENCY_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.AUTO_INSTALL_DEPENDENCY_PROMPT],
		});
	}
	if (language) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT,
			state: {
				answer: language,
				promptStartLine: DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT,
				currentChoice: '',
				seenChoices: new Set<string>(),
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT],
		} satisfies PromptAction);
	}
	if (path) {
		prompts.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_SRC_PATH_PROMPT,
			state: {
				answer: path,
			},
		} satisfies Prompt);

		promptActions.push({
			name: DIRECTUS_CLI_PROMPTS.EXTENSION_SRC_PATH_PROMPT,
			action: directusPromptActions[DIRECTUS_CLI_PROMPTS.EXTENSION_SRC_PATH_PROMPT],
		});
	}

	return [prompts, promptActions];
}
