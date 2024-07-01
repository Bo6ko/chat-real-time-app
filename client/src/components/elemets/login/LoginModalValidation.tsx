import { stringValidation, isEmailValid } from "../../../utils/validations";

type LoginData = {
    email: string,
    password: string,
}

export type LoginValidationType = { 
    isValid: boolean,
    response: LoginData | undefined
}

const LoginValidation = (loginData: LoginData): LoginValidationType => {
    let loginDataErrors: LoginData = {
            email: '',
            password: '',
        };

    const emailErr = isEmailValid(loginData.email);
    if ( !emailErr ) {
        loginDataErrors.email = 'Email is not valid!';
    }

    const passwordErr = stringValidation(loginData.password);
    if ( passwordErr !== '' ) {
        loginDataErrors.password = passwordErr;
    }

    if ( loginDataErrors.email !== '' || loginDataErrors.password !== '' ) {
        return {
            isValid: false,
            response: loginDataErrors
        };
    }

    return {
        isValid: true,
        response: undefined
    };
}

export default LoginValidation;
