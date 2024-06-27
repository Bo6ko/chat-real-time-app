export const stringValidation = (value: string) => {
    if (value === '') {
        return 'This field is required!';
    }
    if (!(value.length >= 3 && value.length < 30))  {
        return 'This field should be more than 3 symbols and less than 30!';
    }
    return '';
}

export const textareaValidation = (value: string) => {
    if ( value === '' ) {
        return 'This field is required!';
    }
    if ( !(value.length > 20) ) {
        return 'This field should be more than 20 symbols!';
    }
}

export const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isNumberValid = (value: string) => {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(value);
};