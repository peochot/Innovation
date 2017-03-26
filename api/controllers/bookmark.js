import Job from '../models/job';
import Bookmark from '../models/bookmark';

function index(req, res) {
  Bookmark.find({owner: req.user._id}).populate('job')
          .then((bookmarks)=>{
            //let jobs = refs.map((job)=>job.job);
            res.json({ data: bookmarks });
          });
};
function create(req, res) {
  Job.findById(req.params.jobId)
    .then((job) => {
      return Bookmark.create({
        owner: req.user._id,
        job: job._id
      });
    }).then((object) => {
        res.json({ data: object });
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
}

export default {index,create}
