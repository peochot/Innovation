import Job from '../models/job';
import Application from '../models/application';

function index(req,res){
  Application.find({owner: req.user._id}).populate('job')
          .then((applications)=>{
            //let jobs = refs.map((job)=>job.job);
            res.json({data:applications});
          });
};


export default {index}
