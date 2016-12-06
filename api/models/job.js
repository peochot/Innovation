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
    cid:{
        type:db.SchemaTypes.ObjectId,
        ref:'Company'
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

jobSchema.statics.getQuery = function(params,ids=null) {
    var today = new Date();
    //let criteria = [{ expire: { $gte: today } },{coords: {$exists: true}}];
    let criteria = [{coords: {$exists: true,$ne: null }}];
    for (let key in params) {
        if(params[key]){
            switch (key) {
                case "company":
                    criteria.push({ 'company': new RegExp('.*' + params[key] + '.*', "i") });
                case "title":
                    criteria.push({ 'title': new RegExp('.*' + params[key] + '.*', "i") });
                    break;
                case "description":
                    criteria.push({ 'description': new RegExp('.*' + params[key] + '.*', "i") });
                    break;
                case "ids":
                    criteria.push({ '_id': { $in: params[key]}});
                    break;
            }
      }
    }
    let query = "";
    if (criteria.length) {
        query = { $and: criteria };
    }
    return query;
}
jobSchema.statics.getOrder = function(str) {
    if (!str) {
        return { "created": -1 }
    }
    let orderBy = {};
    let orders = str.split("|");
    orders.map((order)=>{
        const o=order.split("*");
        orderBy[o[0]]=(o[1]=="asc")?1:-1;
        return;
    });
    return orderBy;
}
jobSchema.statics.getJobs = function(query) {
    const criteria = this.getQuery(query);
    const orderBy = this.getOrder(query.order);
    return this.find(criteria).sort(orderBy).select("-__v");
}
const Job =db.model('Job',jobSchema);
module.exports = Job;
