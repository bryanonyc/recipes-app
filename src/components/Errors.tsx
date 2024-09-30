export const getErrorMessage = (err: any) => {
    let errorMessage = '';

    if (err.status && err.data) {
        errorMessage = `${err.status}: ${err.data.message}`
    } else if (err.status) {
        errorMessage =  errorMessage = `${err.status}: ${err.error}`
    } else {
        errorMessage = 'An unknown error occured.'
    }

    return errorMessage;
}
