import Job from '../models/job';
import Bookmark from '../models/bookmark';

function index(req,res){
  Bookmark.find({owner: req.user._id}).populate('job')
          .then((bookmarks)=>{
            //let jobs = refs.map((job)=>job.job);
            res.json({data:bookmarks});
          });
};


export default {index}
