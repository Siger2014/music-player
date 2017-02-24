const express = require('express');
const Contact = require('./models/contact');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// body-parser 专门用来解析表单 post 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router.get('/',(req,res,next)=>{
    Contact
        .find()
        .then(contacts=>{
            // 在响应头中加入以下的字段 浏览器就不会有跨域限制了
            //res.set("Access-Control-Allow-Origin","*");
            res.json({
                err_code: 0,
                result: contacts
            })
        })
})

router.post('/',(req,res,next)=>{
    var body = req.body;
    const contact = new Contact({
        name: body.name,
        phone: body.phone,
        remark: body.remark
    });
    contact
        .save()
        .then(contact=>{
      console.log(contact);
            res.json({
                err_code: 0,
                contact
            })
        })
})

router.get('/:id',(req,res,next)=>{
    Contact
        .findById(req.params.id)
        .then(result=>{
            res.json({
                err_code: 0,
                result: result
            })
        })
})

router.patch('/:id',(req,res,next)=>{
    var body = req.body;
    Contact
        .findById(req.params.id)
        .then(contact=>{
            contact.name = body.name
            contact.phone = body.phone
            contact.remark = body.remark
            return contact.save();
        })
        .then(contact => {
        res.json({
            err_code: 0,
            result: contact
        })
    })
})

router.delete('/:id',(req,res,next)=>{
    Contact
        .remove({
            _id:req.params.id
        })
        .then(() => {
            res.json({
                err_code: 0
            })
        })
})

app.use('/contacts', router)

app.listen(3000, () => {
    console.log('API Server is Running...')
})



