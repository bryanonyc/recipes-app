export const getErrorMessage = (err: any) => {
    let errorMessage = '';

    if (err.status) {
        errorMessage = `${err.status}: ${err.error}`
    } else if (err.data) {
        errorMessage = `${err.data.message}`
    } else {
        errorMessage = 'An unknown error occured.'
    }

    return errorMessage;
}
