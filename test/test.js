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
    console.log(__dirname);
    var obj = fs.readFileSync(`${__dirname}/testData.json`)
    var data = JSON.parse(obj);
    return data;
}

describe('status and content',() => {
    var data = readFile();
    /**
     * @description : It will create for testing Registration Api.
     */
        // it('Registration',(done) => {
        //     chai.request(server).post('/register').send(data.registration).end((err,res) =>{
        //         if(err){
        //             console.log("expect ==>",err)
        //             err.should.have.status(400);
        //         }
        //         else{
        //             console.log('expect Body ==>',res.body)
        //             res.should.have.status(200);
        //         }
        //         done();
        //     })
        // })    
    /**
     * @description : It will create for testing Confirmation Api.
     */            
        it("Confirmation",(done) => {
            chai.request(server).post('/verify/:token').set('token',data.emailVerification.token).send(data.emailVerification).end((err,res) => {
                if(err){
                    console.log('expect Body ==>',err)
                    err.should.have.status(400)
                }
                else{
                    console.log('expect Body ==>',res.body);
                    res.should.have.status(200);
                }
                done();
            })
        })
    /**
     * @description : It will create for testing Login Api.
     */               
        it("Login",(done) => {
            chai.request(server).post("/login").send(data.login).end((err,res) => {
                if(err){
                    console.log('expect Body ==>',err)
                    err.should.have.status(400)
                }
                else{
                    console.log('expect Body ==>',res.body);
                    res.should.have.status(200);
                }
                done();
            })
        })                                   
    /**
     * @description : It will create for Email availabel or note for forget Password.
     */
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
                done();
            })
        }) 
    /**
     * @description : It will create for testing Reset password Api.
     */                                                                         
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
                done();
            })
        })
    /**
     * @description : It will create for testing Shoet Url from original Url Api.
     */         
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
                done();
            })
        })
    /**
     * @description : It will create for testing get original url from short base url Api.
     */                                                                                                
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
    /**
     * @description : It will create for testing create note Api.
     */
        it("Create Note",(done) => {
            chai.request(server).post('/createNote').send(data.createNote).end((err,res) => {
                if(err){
                    console.log("Expected Body ==> " ,err);
                    err.should.have.status(400)                   
                }
                else{
                    console.log("Expected Body ==> ",res.body);
                    res.should.have.status(200)
                }
                done();
            })
        })
    /**
     * @description : It will create for testing get note Api.
     */ 
        it("Get Note Of users",(done) => {
            chai.request(server).get('/getNotes').send(data.getNotes).end((err,res) => {
                if(err){
                    console.log("Expected Body ==> ",err);
                    err.should.have.status(400)                    
                }
                else{
                    console.log("Expected Body ==> ",res.body);
                    res.should.have.status(200)                    
                }
                done();
            })
        })
    /**
     * @description : It will create for testing delete note Api.
     */ 
    it("Delete Note Of users",(done) => {
        chai.request(server).post('/deleteNote').send(data.deleteNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing edit Title Api.
     */ 
    it("Edit Title",(done) => {
        chai.request(server).post('/editTitle').send(data.editTitle).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing edit Description Api.
     */ 
    it("Edit Description",(done) => {
        chai.request(server).post('/editDescription').send(data.editDescription).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing add label Api.
     */ 
    it("Add Label",(done) => {
        chai.request(server).post('/addLabel').send(data.addLabel).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing update label Api.
     */ 
    it("update Label",(done) => {
        chai.request(server).post('/updateLabel').send(data.updateLabel).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing delete label Api.
     */ 
    it("delete Label",(done) => {
        chai.request(server).post('/deleteLabel').send(data.deleteLabel).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing get all label Api.
     */ 
    it("get all Label",(done) => {
        chai.request(server).get('/getAllLabel').send(data.getAllLabel).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing get all label Api.
     */ 
    it("get all Label",(done) => {
        chai.request(server).get('/getAllLabel').send(data.getAllLabel).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing save Label to Note Api.
     */ 
    it("save Label To Note",(done) => {
        chai.request(server).post('/saveLabelToNote').send(data.saveLabelToNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing delet Label to Note Api.
     */ 
    // it("delete Label from Note",(done) => {
    //     chai.request(server).post('/deleteLabelToNote').send(data.deleteLabelToNote).end((err,res) => {
    //         if(err){
    //             console.log("Expected Body ==> ",err);
    //             err.should.have.status(400)                    
    //         }
    //         else{
    //             console.log("Expected Body ==> ",res.body);
    //             res.should.have.status(200)                    
    //         }
    //         done();
    //     })
    // })
    /**
     * @description : It will create for testing archive Api.
     */ 
    it("archive",(done) => {
        chai.request(server).post('/archive').send(data.isArchive).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
    /**
     * @description : It will create for testing reminder Api.
     */ 
    it("Reminder",(done) => {
        chai.request(server).post('/reminder').send(data.reminder).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })
})
