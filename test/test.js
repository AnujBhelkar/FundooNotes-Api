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
/**
 * @description : Reading JSON
 */
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
   // console.log(data.registration)
        it('status',(done) => {
            chai.request(server).post('/register').send(data.registration).end((err,res) =>{
                if(err){
                    console.log("expect ==>",err)
                    err.should.have.status(400);
                }
                else{
                    console.log('expect Body ==>',res.body)
                    res.should.have.status(200);
                }
                    describe('Verifing user',() => {
                        it("Verification",(done) => {
                            chai.request(server).post('/verify/:token').set('token',data.emailVerification.token).send(data.emailVerification).end((err,res) => {
                                if(err){
                                    console.log('expect Body ==>',err)
                                    err.should.have.status(400)
                                }
                                else{
                                    console.log('expect Body ==>',res.body);
                                    res.should.have.status(200);
                                }
                                        describe('Login User', () => {
                                            it("Login Or Not",(done) => {
                                                chai.request(server).post("/login").send(data.login).end((err,res) => {
                                                    if(err){
                                                        console.log('expect Body ==>',err)
                                                        err.should.have.status(400)
                                                    }
                                                    else{
                                                        console.log('expect Body ==>',res.body);
                                                        res.should.have.status(200);
                                                    }
                                                        describe("Verify User for forget Password",() => {
                                                            it("Email Available or Not",(done) => {
                                                                chai.request(server).post('/verifyUser').send(data.verifyUser).end((err,res) => {
                                                                    if(err){
                                                                        console.log("expect Body ==>",err)
                                                                        err.should.have.status(400)
                                                                    }
                                                                    else{
                                                                        console.log("expect Body ==>",res.body)
                                                                        res.should.have.status(200)
                                                                    }
                                                                        describe("Reset Password", () => {
                                                                            it("Reseting Password",(done) => {
                                                                                chai.request(server).post('/resetPassword/:token').set('token',data.resetPassword.token).send(data.resetPassword).end((err,res) => {
                                                                                    if(err){
                                                                                        console.log("expect Body ==>",err);
                                                                                        err.should.have.status(400)
                                                                                    }
                                                                                    else{
                                                                                        console.log("expect Body ==>",res.body);
                                                                                        res.should.have.status(200);
                                                                                    }
                                                                                        describe("Short Url From Original Url",() => {
                                                                                            it("Create Short Url",(done) => {
                                                                                                chai.request(server).post('/item').send(data.shortUrl).end((err,res) => {
                                                                                                    if(err){
                                                                                                        console.log("expect Body ==> ",err);
                                                                                                        err.should.have.status(400);
                                                                                                    }
                                                                                                    else{
                                                                                                        console.log("expect body ==>",res.body);
                                                                                                        res.should.have.status(200);
                                                                                                    }
                                                                                                        describe("Get Orinal Url From Short Url", () => {
                                                                                                            it("get Original Url",(done) => {
                                                                                                                chai.request(server).get('/item/:code').send(data.getOriginal).end((err,res)=> {
                                                                                                                    if(err){
                                                                                                                        console.log("Expected Body ==>",err);
                                                                                                                        err.should.have.status(400)
                                                                                                                    }
                                                                                                                    else{
                                                                                                                        console.log("Expected Body ==>",res.body);
                                                                                                                        res.should.have.status(200)
                                                                                                                    }
                                                                                                                    done();
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    done();
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    done();
                                                                                })
                                                                            })
                                                                        })
                                                                    done();               
                                                                })
                                                            })                                                    
                                                        })
                                                    done();
                                                })
                                            })
                                        })
                                done();
                            })
                        })
                    })
                done();
            })
        })
    })
})