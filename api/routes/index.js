import {Router} from 'express';
import authController from '../controllers/authenthication';
import searchController from '../controllers/search';
import jobController from '../controllers/job';
import bookmarkController from '../controllers/bookmark';
import multer from 'multer';

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
const router = Router();


router.post('/login',authController.login);
router.post('/register',authController.register);



router.get('/video',searchController.videos);
router.get('/song',searchController.songs);
router.get('/playlist',searchController.playlists);


router.get('/job',jobController.list);
router.get('/myJob',jobController.ownList);

router.post('/job/:jobId/applyWithFile',upload.single('document'),jobController.applyWithFile);
router.post('/job/:jobId/:action',jobController.doAction);


module.exports=router;
