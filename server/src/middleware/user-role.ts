import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
    userData?: {
        role: string
    }
}

function userRole(role: string) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log('req.body', req.userData)
        if ( req.userData && req.userData.role !== role ) {
            //401 you don't have access
            res.status(401);
            return res.send('Not allowed')
        }

        next();
    }
}

export default {
    userRole
}
