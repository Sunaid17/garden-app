export function createStore(initialState) {
    let state = { ...initialState };
    const listeners = new Set();

    return {
        getState: () => state,
        
        setState: (partial) => {
            const nextState = typeof partial === 'function' ? partial(state) : partial;
            state = { ...state, ...nextState };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
}

export const plantStore = createStore({
    plants: [],
    filteredPlants: [],
    filter: {
        search: '',
        category: ''
    },
    isLoading: false,
    error: null
});