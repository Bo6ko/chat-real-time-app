export type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password?: string,
    role?: number
}

export type UserValidation = {
    isValid: boolean, 
    response: User | undefined
}

export type UserRole = {
    id: number,
    users_role_name: UserRoleName
}

export type UserRoleName = 'registered' | 'admin';
