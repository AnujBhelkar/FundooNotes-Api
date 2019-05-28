/******************************************************************************************
 * @Purpose     : Here we have to write test script in mocha for testing backend using
 *                chai
 * @file        : test.js
 * @author      : Anuj
 * @since       : 28-05-2019
 ******************************************************************************************/

 var chai = require('chai')
 var chaiHttp = require('chai-http')
 chai.use(chaiHttp);
 chai.should()
 var server = require('../server');
 var fs = require('fs')
 function readFile() {
     var obj = fs.readFileSync('/home/admin1/FundooNotes/Server/test/testData.json')
     var data = JSON.parse(obj);
     return data;
 }

 describe('status and content',() => {
     /**
      * @description    : test Script for Registration
      */
     describe('Registration Page',() => {
        var data = readFile();
        //console.log(data.registration)
            // it('status',(done) => {
            //     chai.request(server).post('/register').send(data.registration).end((err,res) =>{
            //         if(err){
            //             console.log("expect ==>",err)
            //             err.should.have.status(400);
            //         }
            //         else{
            //             console.log('expect Body ==>',res.body)
            //             res.should.have.status(200);
            //         }
                    describe('Verifing user',() => {
                        it("Verification",(done) => {
                            chai.request(server).post('/verify/:token').send(data.emailVerification).end((err,res) => {
                                if(err){
                                    console.log('expect Body ==>',err)
                                    err.should.have.status(400)
                                }
                                else{
                                    console.log('expect Body ==>',res.body);
                                    res.should.have.status(400);
                                }
                                done();
                            })
                        })
                    })
                        //done();
                //})
          //  })
     })
  })