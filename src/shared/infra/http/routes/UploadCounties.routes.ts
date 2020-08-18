import Router from 'express';
import UploadCountiesController from '../controllers/UploadCountiesController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig);

const uploadCountiesController = new UploadCountiesController();

const uploadCountiesRouter = Router();

uploadCountiesRouter.post(
  '/',
  upload.single('file'),
  uploadCountiesController.create
);

export default uploadCountiesRouter;
