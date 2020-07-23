import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared/constants';
import {Photo} from "../entity/Photo";
import PhotoDao from "../dao/photoDao";
const router = Router();
const photoDao:PhotoDao = new PhotoDao(); 

router.get('/', async (req: Request, res: Response) => {
    var data = await photoDao.getAll();
    return res.status(OK).json(data);
});

router.post('/add', async (req: Request, res: Response) => {
    const data = req.body;
    console.log("data ?????",req.body);
    if (!data) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    //add here
    var photo:Photo = new Photo();
    photo.description = data.description;
    photo.filename = data.filename;
    photo.isPublished = true;
    photo.name = data.name;
    photo.views = 0;

    var insertValue = await photoDao.insert(photo);
    
    console.log("create success",insertValue);

    return res.status(OK).json(photo).end();
});

export default router;
