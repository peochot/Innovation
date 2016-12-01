import Job from '../models/job';
import JobRef from '../models/job-ref';
import MailService from '../services/UserMail';
import libmime from 'libmime';

function list(req,res){
    //cach ngu rat ngu , TODO : Refucktor
    const Promise = require('bluebird');
    Promise.all([
        JobRef.find({owner: req.user._id,type:"bookmark"}).lean().distinct('job'),
        JobRef.find({owner: req.user._id,type:"application"}).lean().distinct('job'),
        Job.getJobs(req.query).lean()
    ]).spread(function(bookmarks, applications,jobs) {
        bookmarks=bookmarks.map((bookmark)=>(bookmark.toString()));
        applications=applications.map((application)=>(application.toString()));
        jobs=jobs.map((job)=>{
          if(bookmarks.indexOf(job._id.toString())!=-1){
            job['bookmarked']=true;
          }
          if(applications.indexOf(job._id.toString())!=-1){
            job['applied']=true;
          }
          return job;
        });
        res.json({
            data: jobs
        });
    }, function(err) {
        res.status(403).json({ message: err });
    });
  };
function ownList(req,res){
  let type="bookmark";
  if(req.query.type=="application"){
      type="application";
  }
  JobRef.find({owner:req.user._id,type:type})
        .populate('job')
        .then((jobRefs)=>{
          let jobs=[];
          jobRefs.map((jobRef)=>{
            jobs.push(jobRef.job);
          });
          res.json({data:jobs});
        });
};
function doAction(req,res){
  Job.findById(req.params.jobId)
    .then((job) => {
        switch (req.params.action) {
            case "apply":
                return apply(job,req.user);
            case "close":
                return close(job, req.user);
            case "bookmark":
                return bookmark(job, req.user);
            case "unBookmark":
                return unBookmark(job, req.user);
            default:
                return Promise.reject("Invalid action");
        }
    })
    .then((object) => {
        res.json({ data: object });
    })
    .catch((err) => {
        res.status(400).json({ message: err });
    });
};
function applyWithFile(req,res){
    const user =req.user;
    const fileData= req.file.buffer.toString('base64');
    if(!user.google.accessToken){
      res.status(401).json({message:"Account is not linked with google"});
    }
    Job.findById(req.params.jobId)
        .then((job)=>{
          return MailService.send(
                          user.google.accessToken,
                          "beochot@gmail.com",
                          user,
                          libmime.encodeWord(job.title, 'Q'),
                          req.body.letter,
                          "application/pdf",
                          "resume.pdf",
                          fileData
                        );
    })
        .then((response)=>{
          console.log(response);
          res.json({message:"ok"})
        },
        (err)=>{
          console.log(err);
          res.status(403).json({message:err});
        });
}
function apply(job,user){

};
function close(job,user){
  return JobRef.remove({ job: job._id,owner:user._id,type:"application"});
};
function bookmark(job,user){
    return JobRef.create({
      owner:user._id,
      job:job._id,
      type:"bookmark"
    });
};
function unBookmark(job,user){
    return Bookmark.remove({ job: job._id,owner:user._id ,type:"bookmark"});
};

export default {list,ownList,doAction,applyWithFile}
