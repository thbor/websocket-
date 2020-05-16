var ws = require("nodejs-websocket");

console.log("开始建立连接...")

let conns = {};


// function boardcast(obj) {
//   if(obj.bridge && obj.bridge.length){
//     obj.bridge.forEach(item=>{
//       conns[item].sendText(JSON.stringify(obj));
//     })
//     return;
//   }
//   if (obj.groupId) {
//     group = groups.filter(item=>{
//       return item.id === obj.groupId
//     })[0];
//     group.users.forEach(item=>{
//       conns[item.uid].sendText(JSON.stringify(obj));
//     })
//     return;
//   }

//   server.connections.forEach((conn, index) => {
//       conn.sendText(JSON.stringify(obj));
//   })
// }

var server = ws.createServer(function(conn){
  conn.on("text", function (obj) {
    obj = JSON.parse(obj);
    // conns[''+obj.uid+''] = conn;
    console.log("createServer接收來自前台的消息爲：",obj)
    // conn.sendText(obj,function(){
    //   console.log("sendText",obj.data)
    // })
    // let t = JSON.stringify(obj)
    // conn.send(t,function(){
    //   console.log("將前台發送的消息回傳黑前台",t)
    // })
    // setInterval(()=>sendMsg(conn),1000)
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
  let objdata = {name:"bobo",age:24}
  let objdata2 = JSON.stringify(objdata)
  conn.send(objdata2,function(){
    console.log("nodejs發送數據爲",objdata2)
  })
}).listen(8001)
console.log("WebSocket建立完毕")
function getDate(){
  return new Date()
}
function sendMsg(conn){
  console.log("執行sendMsg方法")
  let date = new Date()
  console.log("date",date)
  console.log(typeof date)
  let dateTxt = JSON.stringify(date)
  conn.send(dateTxt,function(){
    console.log("現在的時間爲！",dateTxt)
  })
  // return ()=>{
  //   conn.send(dateTxt,function(){
  //     console.log("現在時間爲",dateTxt)
  //   })
  // }

}
