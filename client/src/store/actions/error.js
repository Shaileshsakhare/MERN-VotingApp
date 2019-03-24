// import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes.js';

// export const addError = error => ({
//     type: ADD_ERROR,
//     error
// });

// export const removeError = () => ({
//     type: REMOVE_ERROR
// });

import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

export const addError = error => ({
    type: ADD_ERROR,
    error,
});

export const removeError = () => ({
    type: REMOVE_ERROR,
});