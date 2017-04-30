import { Router } from 'express';
import authController from '../controllers/authenthication';
import jobController from '../controllers/job';
import letterController from '../controllers/letter';
import profileController from '../controllers/profile';
import applicationController from '../controllers/application';
import bookmarkController from '../controllers/bookmark';
import companyController from '../controllers/company';
import reviewController from '../controllers/review';
import multer from 'multer';

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
const router = Router();


router.post('/login', authController.login);
router.post('/register', authController.register);


router.get('/job', jobController.list);
router.get('/job/:jobId',jobController.one)
router.get('/myJob', jobController.ownList);


router.post('/job/:jobId/applyWithFile', upload.single('file'), jobController.applyWithFile);
router.post('/job/:jobId/:action', jobController.doAction);

router.get('/application',applicationController.index);

router.get('/bookmark',bookmarkController.index);

router.get('/letter', letterController.index);
router.post('/letter', letterController.create);


router.get('/profile', profileController.getProfile);
router.post('/profile', profileController.updateProfile);

router.get('/company',companyController.index);

router.get('/company/:companyId/review',reviewController.index);
router.post('/company/:companyid/review',reviewController.create);
router.put('/review/:reviewId',reviewController.update);

module.exports = router;
