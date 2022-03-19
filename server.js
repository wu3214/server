var express = require('express');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tyfg2580',
  database : 'bishe'
});
connection.connect();

//通过id获取播放的URL
app.get('/getUrl', function (req, res) {
  console.log('req',req.query)
  console.log('reqid',req.query.id)
    
  // var  sql = "SELECT * FROM yonghu where name='$req.query.formname'"
  var  sql = "SELECT * FROM tourl where id= ?"

   connection.query(sql,req.query.id,function (err, result) {
     var str =JSON.stringify(result)
     var str1 = JSON.parse(str);
     console.log('str',str)
     console.log('str1',str1)
     console.log('typestr',typeof str)
     console.log('typestr1',typeof str1)
     res.set({
      'Content-Type': 'text/plain',
    })
    res.send(str1)
    res.end()
    return
   })
  
 })


app.get('/login', function (req, res) {
  console.log('req',req.query)
  console.log('reqname',req.query.formname)
    
  // var  sql = "SELECT * FROM yonghu where name='$req.query.formname'"
  var  sql = "SELECT * FROM yonghu where name= ?"

   connection.query(sql,req.query.formname,function (err, result) {
     var str =JSON.stringify(result)
     var str1 = JSON.parse(str);
     var pw =str1[0].password
     console.log('str',str1)
     console.log('pw',pw)
// var pww=pw.password
    //  console.log('pww',pww)
    //  console.log('result',result.RowDataPacket.password)

    //  var str1 = JSON.parse(pw);
    //  console.log('pw',pw)
    //  console.log('str1',str1)
    //  console.log('typeofpw',typeof pw)
    //  console.log('typeofstr1',typeof str1)
    //  console.log(typeof req.query.formpw)
    //  console.log(typeof result.password)
    //  console.log(typeof result)

    // typeofpw string
    // typeofstr1 object
    // string
    // undefined
    // object
    // 是否一样 false
    // typeof result object

    console.log('是否一样',req.query.formpw==pw)
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      else if(req.query.formpw==pw){
         res.set({
            'Content-Type': 'text/plain',
          })
         console.log(' result', result)
         var yanz=true
         res.send(true);
         res.end()
         return
      }
      else{
        res.set({
          'Content-Type': 'text/plain',
        })
        var yanz=false
        res.send(false);
        res.end()
        return
      }
   })
 })

 app.get('/yonghu', function (req, res) {
  var  sql = 'SELECT * FROM yonghu';
  connection.query(sql,function (err, result) {
     if(err){
       console.log('[SELECT ERROR] - ',err.message);
       return;
     }
     else{
        res.set({
           'Content-Type': 'text/plain',
         })
        console.log('typeof result',typeof result)
        console.log(result)
        res.send(result);
        // res.json(JSON.stringify(result));
        // res.send('Hello World');
res.end()
// connection.end();
     }
  })
     
  // res.send('Hello World');
})
//
app.get('/register', function (req, res) {
  console.log('req',req.query)
  console.log('formname',req.query.formname)
  console.log('formpw',req.query.formpw)
  console.log('formpw',req.query.formemail)
  console.log('formpw',req.query.formphone)
  
  // var  sql = "SELECT * FROM yonghu where name='$req.query.formname'"
  // var  sql = "SELECT * FROM yonghu where name= ?"
  // var  sql = "SELECT * FROM yonghu where name= ?"
  // var  sql = "INSERT INTO yonghu(id, name, registrationDate,email,phone,password) SELECT 0, ?,now(),?,?,? FROM DUAL WHERE NOT EXISTS(SELECT name FROM yonghu WHERE name = ?);"
  var  sql = "INSERT INTO yonghu(id,name,registrationDate,email,phone,password) SELECT 0, ?,now(),?,?,? FROM DUAL WHERE NOT EXISTS(SELECT name FROM yonghu WHERE name = ?);"
  // connection.query(sql,req.query.formname,req.query.formemail,req.query.formphone,req.query.formpw,req.query.formname,function (err, result) {
  
  // connection.query(sql,[req.query.formname,req.query.formemail,req.query.formphone,req.query.formpw,req.query.formname],function (err, result) {
  // connection.query( "INSERT INTO yonghu(id,name,registrationDate,email,phone,password) SELECT 0,"+req.query.formname+",now()","+req.query.formemail+","+req.query.formphone+","+req.query.formpw+" FROM DUAL WHERE NOT EXISTS(SELECT name FROM yonghu WHERE name ="+req.query.formname+");",function (err, result) {
    connection.query( sql,[req.query.formname,req.query.formemail,req.query.formphone,req.query.formpw,req.query.formname],function (err, result) {

     var str =JSON.stringify(result)
     var str1 = JSON.parse(str);
     console.log('str',str)
     console.log('str1',str1)
     console.log('typestr',typeof str)
     console.log('typestr1',typeof str1)
     res.set({
      'Content-Type': 'text/plain',
    })
    // res.send(str1)
    res.end()
    return
   })
  
 })

 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})