import Company from '../models/company';

function index(req,res){
  Company.find()
          .then((companies)=>{
            //let jobs = refs.map((job)=>job.job);
            res.json({data:companies});
          });
};

function create(req,res){

}
export default {index,create}
