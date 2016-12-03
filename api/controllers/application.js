import Job from '../models/job';
import JobRef from '../models/job-ref';

function index(req,res){
  JobRef.find({owner: req.user._id,type:"application"}).populate('job').lean()
          .then((refs)=>{
            let jobs = refs.map((job)=>job.job);
            res.json({data:jobs});
          });
};


export default {index}
