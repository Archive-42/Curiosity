import { 
    SET_CURRENT_CATEGORY, 
    SET_CURRENT_PRODUCT, 
    OPEN_SIGN_IN, 
    OPEN_SIGN_UP, 
    CLOSE_AUTH_DIALOG, 
    REMOVE_CURRENT_CATEGORY 
} from "../actions/ui";

const initialState = {
    signInOpen: false,
    signUpOpen: false,
    currentProductList: {}
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };

    switch (action.type) {
        case REMOVE_CURRENT_CATEGORY:
            newState.currentCategory = null;
            return newState;
        case CLOSE_AUTH_DIALOG:
            newState.signInOpen = false;
            newState.signUpOpen = false;
            return newState;
        case OPEN_SIGN_IN:
            newState.signInOpen = true;
            newState.signUpOpen = false;
            return newState;
        case OPEN_SIGN_UP:
            newState.signInOpen = false;
            newState.signUpOpen = true;
            return newState;
        case SET_CURRENT_CATEGORY:
            newState.currentCategory = action.id;
            return newState;
        case SET_CURRENT_PRODUCT:
            newState.currentProduct = action.id;
            return newState;
        default:
            return state;
    }
}
