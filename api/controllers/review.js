import Review from '../models/review';

function index(req,res){
  Company.findById(req.params.companyId).populate('reviews')
          .then((company)=>{
            //let jobs = refs.map((job)=>job.job);
            res.json({data:company.reviews});
          });
}

function create(req,res){
  Company.findById(req.params.companyId).populate('reviews')
          .then((company)=>{
            return Review.create({
              "owner":req.user._id,
              "content":req.body.content
            }).then((review)=>{
              company.review.push(review);
              return company.save();
            });
          })
          .then((company)=>{
              res.json({data:company.reviews});
          })
          .catch((err)=>{
              res.status(400).json({ message: err });
          });
}
function update(req,res){
    Review.findById(req.params.reviewId).then((review)=>{
      review.content = req.body.content;
      return review.save();
    })
    .then((review)=>{
        res.json({data:review});
    })
    .catch((err)=>{
        res.status(400).json({ message: err });
    });
}
function remove(req,res){
  /*
  Company.findById(req.params.companyId).populate('reviews')
          .then((company)=>{
            return Review.create({
              "owner":req.user._id,
              "content":req.body.content
            }).then((review)=>{
              company.review.push(review);
              return company.save();
            });
          })
          .then((company)=>{
              res.json({data:company.reviews});
          })
          .catch((err)=>{
              res.status(400).json({ message: err });
          });
          */
}
export default {index,create,update}
