import type {Subprocess} from 'execa';
import type {PromptState, UseState} from '@common/types.js';
import {DIRECTUS_CLI_PROMPTS, ESCAPE_SEQUENCE} from '@common/constants.js';
import {KeyboardInput, selectPromptAction, inputPromptAction} from './prompt-action.helpers.js';

async function extensionNamePromptAction(data: string, subprocess: Subprocess, usePromptState: UseState<PromptState>) {
	const [state, setState] = usePromptState;
	if (!state().isExtensionNameSet && state().answer && data.includes(DIRECTUS_CLI_PROMPTS.EXTENSION_NAME_PROMPT)) {
		await KeyboardInput(subprocess, <string>state().answer, 0);
		await KeyboardInput(subprocess, ESCAPE_SEQUENCE.ENTER_KEY, 0);
		setState({isExtensionNameSet: true});
	}
}

export const directusPromptActions = 
	{
		[DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT]:selectPromptAction(DIRECTUS_CLI_PROMPTS.EXTENSION_TYPE_PROMPT),
		[DIRECTUS_CLI_PROMPTS.BUNDLE_ENTRY_NAME_PROMPT]:
		inputPromptAction(DIRECTUS_CLI_PROMPTS.BUNDLE_ENTRY_NAME_PROMPT, 500),
		[DIRECTUS_CLI_PROMPTS.EXTENSION_NAME_PROMPT]:
		extensionNamePromptAction,
		[DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT]: selectPromptAction(DIRECTUS_CLI_PROMPTS.PROGRAMMING_LANGUAGE_PROMPT),
		[DIRECTUS_CLI_PROMPTS.EXTENSION_SRC_PATH_PROMPT]: inputPromptAction(DIRECTUS_CLI_PROMPTS.EXTENSION_SRC_PATH_PROMPT, 500),
		[DIRECTUS_CLI_PROMPTS.AUTO_INSTALL_DEPENDENCY_PROMPT]: inputPromptAction(DIRECTUS_CLI_PROMPTS.AUTO_INSTALL_DEPENDENCY_PROMPT, 500),
	} as const;
