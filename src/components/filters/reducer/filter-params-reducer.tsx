import { Reducer } from "react";

type State = {
    keyword: string;
    offset: number;
    limit: number;
};
const initialState: State = { keyword: '', offset: 0, limit: 10 };
type Action =
    | { type: 'handleKeyword', keyword: string }
    | { type: 'setOffset', offset: number }
    | { type: 'setLimit'; limit: number }
    | { type: 'reset' };

const filterReducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'handleKeyword':
            return { ...state, keyword: action.keyword };
        case 'setOffset':
            return { ...state, offset: action.offset };
        case 'setLimit':
            return { ...state, limit: action.limit };
        case 'reset':
            return initialState
        default:
            throw new Error('Unknown action type');
    }
};

export {
    filterReducer,
    initialState,
    type State,
    type Action
}
