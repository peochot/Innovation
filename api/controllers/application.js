/*
import Job from '../models/job';
import Application from '../models/application';

function list(req,res){
  Application.find({owner: req.user._id}).lean().distinct('job')
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
