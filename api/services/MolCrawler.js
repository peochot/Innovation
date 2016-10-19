const Job= require('../models/job');
const MolService = require('./Mol');
/*

*/
function insertJobList(jobs){
    jobs.forEach((element, index, array)=>{
        let coords;
        if(element.sijainti){
          coords =element.sijainti.split(",").map(Number);
        }
        let email=element.yhteystiedotSahkoposti?element.yhteystiedotSahkoposti[0]:"";
        let phone=element.yhteystiedotPuhelin?element.yhteystiedotPuhelin[0]:"";
        let job = new Job({
          mol_id:element.ilmoitusnumero,
          region:element.kunta,
          company: element.tyonantajanNimi,
          title:element.tehtavanimi,
          created:element.ilmoituspaivamaarateksti,
          coords:coords,
          email:email,
          phone:phone,
      });
        job.save().then(
          (newJob)=>{
              return MolService.getJobDetail(newJob.mol_id)
                  .then((response)=>{
                      let detail =JSON.parse(response).response.docs[0];
                      console.log(detail);
                      newJob.description=detail.kuvausteksti;
                      newJob.address=detail.tyopaikanOsoite;
                      newJob.representative=detail.yhteystiedot;
                      newJob.expire=detail.hakuPaattyy;
                      newJob.website=detail.tyonantajanWwwOsoite;
                      newJob.apply_email=detail.hakemusLahetetaan;
                      newJob.salary=detail.palkkausteksti;
                      newJob.duration=detail.duration;
                      newJob.save();
                  });
          },
          (err)=>{
              //console.log(err.message);
          }
        );
    });
    console.log("Finnish crawl");

}
module.exports.crawl = ()=>{
   MolService.getJobLists().then((response)=>{
     response =JSON.parse(response).response.docs;
     insertJobList(response);
     //console.log(response);
   })
   .catch((reason)=>{
      console.log("Error "+reason);
   });
}
