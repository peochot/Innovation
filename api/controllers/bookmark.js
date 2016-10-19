/*
import Job from '../models/job';
import Bookmark from '../models/bookmark';

function list(req,res){
  Bookmark.find({owner: req.user._id}).lean().distinct('job')
          .then((ids)=>{
            req.query.ids=ids;
            return Job.getJobs(req.query);
          })
          .then((jobs)=>{
            res.json({data:jobs});
          });
};


export default {list}
*/
