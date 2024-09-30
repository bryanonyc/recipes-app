import { isNotNil } from 'ramda';

export const getErrorMessage = (err: any) => {
    let errorMessage = '';

    if (err.status && err.data) {
        const msg = isNotNil(err.data.message) ? err.data.message : err.data;
        errorMessage = `${err.status}: ${msg}`;
    } else if (err.status) {
        errorMessage =  errorMessage = `${err.status}: ${err.error}`
    } else {
        errorMessage = 'An unknown error occured.'
    }

    return errorMessage;
}
