import { User, UserValidation } from "../../../types/Users"; 
import { stringValidation, isEmailValid } from "../../../utils/validations";

const UserRegisterValidation = (user: User): UserValidation => {
    let userErrors: User = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        };

    const firstNameErr = stringValidation(user.first_name);
    if ( firstNameErr !== '' ) {
        userErrors.first_name = firstNameErr;
    }

    const lastNameErr = stringValidation(user.last_name);
    if ( lastNameErr !== '' ) {
        userErrors.last_name = lastNameErr;
    }

    const emailErr = isEmailValid(user.email);
    if ( !emailErr ) {
        userErrors.email = 'Email is not valid!';
    }

    const passwordErr = stringValidation(user.password);
    if ( passwordErr !== '' ) {
        userErrors.password = passwordErr;
    }

    if ( user.password !== user.confirm_password ) {
        userErrors.confirm_password = 'The password is not matches!';
    }

    if ( userErrors.first_name !== '' || userErrors.last_name !== '' || userErrors.email !== '' || userErrors.password !== '' || userErrors.confirm_password !== '' ) {
        return {
            isValid: false,
            response: userErrors
        };
    }

    return {
        isValid: true,
        response: undefined
    };
}

export default UserRegisterValidation;