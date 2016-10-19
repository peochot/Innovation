import Job from '../models/job';
import Application from '../models/application';
import Bookmark from '../models/bookmark';
import MailService from '../services/UserMail';
import libmime from 'libmime';
function list(req,res){
    Job.find({coords: {$exists: true}}).then((jobs)=>{
      res.json({jobs:jobs});
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
                          `${user.firstName} ${user.lastName} <${user.email}>`,
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
  return Application.remove({ job: job._id,owner:user._id });
};
function bookmark(job,user){
    return Bookmark.create({
      owner:user._id,
      job:job._id
    });
};
function unBookmark(job,user){
    return Bookmark.remove({ job: job._id,owner:user._id });
};

export default {list,doAction,applyWithFile}
