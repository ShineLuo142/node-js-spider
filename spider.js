//var http=require('http');
//var cheerio=require('cheerio');
////var mongoClient=require('mongodb').MongoClient;
////var dburl='mongodb://localhost:27017';
//var url='http://news.baidu.com/';
//var arr=[];
//http.get(url,function(response){
//    var str=''
//    response.on('data',function(a){
//        str+=a;
//    });
//    response.on('end',function(){
//        const $=cheerio.load(str,{decodeEntities: false});
//        $('.hotnews li a').each(function(key,val){
//            //console.log(key,val)
//            arr.push({
//                'title':$(this).html(),
//                'address':$(this).attr('href')
//            });
//        })
//        console.log(arr);
//        http.creatSever()
//
//
//    })
//})
var http=require('http');
var https=require('https');
var url=require('url');
var cheerio=require('cheerio');

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"})
    if(req.url!='/favicon.ico'){
        var page=url.parse(req.url,true).query.page||'1'
        requestData(page,function(){
            ++page
            res.end("<script>location.href='http://localhost:3001/?page="+page+"'</script>")
        })
    }
}).listen('3001');

//爬虫抓取分页数据：

function requestData(page,cb){
    //boss直聘前端招聘数据链接:
    var requrl='https://www.zhipin.com/c101280600-p100901/';
    https.get(requrl,function(response){
        var arr=[];
        var str='';
        response.on('data',function(a){
            str+=a;
        });
        response.on('end',function(){
            doSpider(str,cb);
        })
    })
}

//处理数据：
function doSpider(data,cb){
    var arr=[];
    const $ = cheerio.load(data,{decodeEntities: false})
    $('.job-primary').each(function(){
        arr.push(
            {
                'title':$(this).find('.job-title').html(),
                'href':'https://www.zhipin.com/'+$(this).find('.name a').attr('href'),
                'money':$(this).find('h3 .red').html(),
                'conpany':$(this).find('.company-text h3 a').html()
            })
    })
    //连接数据库：
    var MongoClient=require('mongodb').MongoClient;
    var dburl='mongodb://localhost:27017';
    MongoClient.connect(dburl,function(err,db){
        if(err){
            console.log(err)
        }else{
            (function insertData(i){
                if(i==arr.length){
                    db.close();
                    cb()
                    return false
                }
                db.db('luo').collection('boss').insertOne(arr[i],function(err){
                    if(err){
                        console.log('增加数据失败')
                    }else{
                        i++;
                        insertData(i)
                    }
                })
            })(0)

        }
    })




}