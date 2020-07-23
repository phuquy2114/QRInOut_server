import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseResponse } from '../entity/BaseResponse';
import { User } from '../entity/User';
import UserDAO from '../dao/userDAO';
import { paramMissingError } from '@shared/constants';

const dataResponse: BaseResponse = new BaseResponse();
const userDAO: UserDAO = new UserDAO();
// Init shared
const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const insertValue = await userDAO.getAll();
    dataResponse.status = OK;
    dataResponse.data = insertValue;
    dataResponse.message = 'Successfull';
    return res.status(OK).json(dataResponse);
});


router.post('/register', async (req: Request, res: Response) => {
    console.log('ubhiuhui', req.body);


    if (!req.body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    // add user here
    const users: User = new User();
    users.id = makeid(10);
    users.name = req.body.name;
    users.phone = req.body.phone;
    users.uniqueAppID = "com.primarynet.qrinout"
    users.password = req.body.password;
    users.deviceToken = req.body.deviceToken;

    try {
        const insertValue = await userDAO.insert(users);
    } catch (error) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'Email đã được sử dụng';
        return res.status(BAD_REQUEST).json(dataResponse);
    }

    dataResponse.status = CREATED;
    dataResponse.data = users;
    dataResponse.message = 'Successfull';
    return res.status(CREATED).json(dataResponse);
});


router.post('/', async (req: Request, res: Response) => {

    if (!req.body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    var id = req.query.prmEmployeeID as string;
    var getInfor : User;
    try {
         getInfor = await userDAO.getUserByID(id) as User;
    } catch (error) {
        //If not found, send a 404 response
        return res.status(404).send("User not found");;
    }

    dataResponse.status = OK;
    dataResponse.data = getInfor;
    dataResponse.message = 'Successfull';
    return res.status(OK).json(dataResponse);

});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    //add user here
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    //updateUser
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    //delete user
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;


function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
