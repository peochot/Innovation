const Letter= require('../models/letter');
const Attachment= require('../models/attachment');


function index(req,res){
   Letter.find().then((letters)=>{
     res.json({letters:letters});
   });
}
function create(req,res){
   Letter.create({
     owner: req.user._id,
     content: req.body.content,
     category: req.body.category
   }).then((letter)=>{
     res.json({letter:letter});
   });
}
function update(req,res){

}

function uploadCV(req,res){

}

export default {index,create,update,uploadCV};
