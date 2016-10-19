const db = require('../config/db.js');

let jobSchema = db.Schema({
    __v: {
      type: Number,
      select: false
    },
    mol_id: { //ilmoitusnumero
        type: String,
        unique: true,
        required: true,
        select:false
    },
    region: { //kunta
        type: String,
        required: true
    },
    company: {//tyonantajanNimi
        type: String,
        required: true
    },
    title: {//tehtavanimi
        type: String,
        required: true
    },
    created:{ //ilmoituspaivamaarateksti
        type:String,
        required:true
    },
    coords: {type: [Number], index: '2dsphere'},
    email:{//yhteystiedotSahkoposti
        type: String,
        required:true
    },
    phone:{//yhteystiedotPuhelin
        type: String
    },
    description:{//kuvausteksti     //below belong to detail
        type:String,
    },
    address:{//tyopaikanOsoite
        type:String,
    },
    representative: { //yhteystiedot
        type:String,
    },
    expire:{//hakuPaattyy
        type:String,
    },
    website:{//tyonantajanWwwOsoite
        type:String,
    },
    apply_email:{//hakemusLahetetaan
        type:String,
    },
    salary:{//palkkausteksti
        type:String,
    },
    duration:{//tyonKestoTekstiYhdistetty
       type:String,
    },
});
/*
jobSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.mol_id
  return obj
}
*/

const Job =db.model('Job',jobSchema);
module.exports = Job;
