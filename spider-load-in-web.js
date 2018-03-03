
//后台数据通过express-ejs模板引擎写入前端页面：
var express = require('express');
var app=new express();
var MongoClient=require('mongodb').MongoClient;
var dburl='mongodb://localhost:27017';
var dbName='luo'

app.set('view engine','ejs');/*设置ejs模板引擎*/

app.get('/',function(req,res){
    MongoClient.connect(dburl,function(err,client){
        const db = client.db(dbName);
        if(err){
            console.log('sb')
        }else{
            var result= db.collection('boss').find({})
            result.toArray(function(err,docs){

                console.log(docs)
                res.render('job-information',{
                    list:docs
                })
            })
        }
    })

})
app.listen(3005);