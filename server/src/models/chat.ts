import db from '../../database/db_connection.js';
const TABLE = 'users';

interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
}

const User: any = {
    getAll: (callback: any) => {
        const sql = `select * from ${TABLE}`;
        db.query(sql, callback);
    },
    signup: (user: User, callback: any) => {
        const checkUserQuery = `SELECT * FROM ${TABLE} WHERE email = ?`;
        db.query(checkUserQuery, [user.email], (error, results) => {
            if (error) {
                callback(error);
                return;
            }
            if (results.length > 0) {
                // User with the same username or email already exists
                callback('User already exists');
                return;
            }
            const insertUserQuery = `INSERT INTO ${TABLE} (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)`;
            db.query(insertUserQuery, [user.first_name, user.last_name, user.email, user.password, user.role], (error, results) => {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, results.insertId);
            });
        });
    },
    login: (user: User, callback: any) => {
        const findUser = `SELECT * FROM ${TABLE} WHERE email = ?`;
        db.query(findUser, [user.email], callback);
    },
    delete: (user: User, callback: any) => {
        const deleteUser = `DELETE FROM ${TABLE} WHERE id = ?;`;
        db.query(deleteUser, [user.id], callback(null, {message: `User id ${user.id} was deleted!`}));
    },
}

export default User;