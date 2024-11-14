import type {UseState} from '@common/types.js';

export class StateManager {
	private localState: Map<string, Record<string, unknown>>;

	constructor() {
		this.localState = new Map<string, Record<string, unknown>>();
	}

	registerState(key: string, newState: Record<string, unknown>) {
		if (key in this.localState) {
			throw new Error(`Error : Duplicate key "${key}" in state`);
		}
		this.localState.set(key, newState);
	}

	useState<T>(key: string): UseState<T> {
		if (!this.localState.get(key)) {
			throw new Error(`Error : state key "${key}" not found`);
		}

		const getState = () => this.localState.get(key) as T;
		const setState = (newValue: unknown) => {
			const updatedState = {...this.localState.get(key), ...(typeof newValue === 'function' ? newValue(this.localState.get(key)) : newValue)};
			this.localState.set(key, updatedState);
		};

		return [getState, setState] as const;
	}
}
