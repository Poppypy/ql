/*

抓包：请求头里的X-Applet-Token
请求头：admin.shunyi.wenming.city
变量：export TXZX = 'XXXXXX'
 cron: 11 11 * * *

*/
const $ = new Env('天下资讯');
const axios = require('axios');
let request = require("request");
const fs = require('fs');
const cheerio = require('cheerio');
request = request.defaults({
    jar: true
});
const {log} = console;
const Notify = 0; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let TXZX = ($.isNode() ? process.env.TXZX : $.getdata("TXZX")) || ""

let TXZXArr = [];
let data = '';
let msg = '',T1,k,add=0;
let nuaid

!(async () => {
    
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);



            log(`\n=================== 共找到 ${TXZXArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${TXZXArr}`);
            }
//await report() //通知
await poem()//获取随机诗词
// await English()//每日英语
            for (let index = 0; index < TXZXArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)
                TXZX = TXZXArr[index];   
                //let arr = TXZX.split(/&|#/);   usr = arr[0];   zysid= arr[1];

//  if((12 < $.time("HH")) && ($.time("HH") < 15))
// log($.time("yyyy-MM-dd HH:mm:ss"));//yyyy-MM-dd HH:mm:ss,年、月、日、小时、分钟、秒

// hash = MD5(Math.floor(Date.now() / 1000).toString());//MD5加密
// log(hash)

//     await sign();//签到
//     await stop();

   //await into()//试试进入

   for(q=0;q<=13;q++)
   {
    k=1;
     await ID();
 //         await stop();
if(k==1)
{
await  starread()//开始阅读
add=add+1;
await stop()
await   overread()//结束阅读
//await stop()
} 
else 
{log('退出咯'); break;}                       }            }
     }
log(`共阅读${add}次，获得积分：${add*0.9}`)
 await SendMsg(msg); // 所有任务执行完成后发送消息

    }           
})()
.catch((e) => log(e))
    .finally(() => $.done())


/////任务
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ID()//获取文章ID
{
   return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: `http://haowenzhang.xinzhanyuedu.xuexiajie.com/reads/?code=051N05Ga1B2diF0XA4Ha1zwMjX3N05GW`,
        headers: {
            'Host': 'haowenzhang.xinzhanyuedu.xuexiajie.com',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests':1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309021a) XWEB/6763 Flue',
            'Referer':'http://haowenzhang.xinzhanyuedu.xuexiajie.com/',
            'Cookie': `PHPSESSID=${TXZX}`,
        },
        //data: {},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.code == 'n'){
            const nuaidStart = responseHtml.indexOf("'nuaid':'") + 9;
            log('来了')
            const nuaidEnd = responseHtml.indexOf("'", nuaidStart);
            const nuaid = responseHtml.substring(nuaidStart, nuaidEnd);
            log(nuaid); // 打印 nuaid 值到控制台
            
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {

            //log('来了00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
            //  const regex = /'nuaid':'(.*?)'/;
            //  const match = responseHtml.match(regex);
            // const nuaid = match ? match[1] : null;
            // log(nuaid); // 打印 nuaid 值到控制台
            // 找到发送POST请求的部分，并将'nuaid'的值提取出来
// let postRequest = document.querySelector("script[src='/static/lib/js/axios.min.js']").nextSibling.textContent;
// let nuaidValue = postRequest.match(/'nuaid':'(\d+)'}/)[1];

// // 打印'nuaid'的值
// log(nuaidValue);


           //log(data);
           //log('来了00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
// 假设 data 是包含 HTML 代码的字符串
// 假设 data 是包含 HTML 代码的字符串
const regex = /'nuaid':'(\d+)'/;
const match = data.match(regex);

if (match) {
   nuaid = match[1];
  console.log(nuaid);
} else {
  console.log('未找到 nuaid');
//   nuaid=randomNum(26000,26999)
//   log(nuaid)
k=0;

}

          }
        } catch (e) {k=0;
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function starread()//开始阅读
{
   return new Promise((resolve) => {
      var options = {
        method: 'POST',
        url: `http://haowenzhang.xinzhanyuedu.xuexiajie.com/reads/read`,
        headers: {
            'Host': 'haowenzhang.xinzhanyuedu.xuexiajie.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; OXF-AN10 Build/HUAWEIOXF-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.141 Mobile Safari/537.36 XWEB/5061 MMWEBSDK/20230405 MMWEBID/3628 MicroMessenger/8.0.35.2360(0x2800233D) WeChat/arm64 Weixin Android Tablet NetType/5G Language/zh_CN ABI/arm64',
            'Cookie': `PHPSESSID=${TXZX}`,
            'Origin': 'http://haowenzhang.xinzhanyuedu.xuexiajie.com',
            'Content-Length': '30'

        },
        data: {"type":"rec","nuaid":nuaid},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.errcode == 'SUCCESS'){
            log(`\n开始阅读成功`)
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {
            log(data.msg);
          }
        } catch (e) {
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
  



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function overread()//结束阅读
{
   return new Promise((resolve) => {
      var options = {
        method: 'POST',
        url: `http://haowenzhang.xinzhanyuedu.xuexiajie.com/reads/?code=031NFr0w3texC03xzI0w3WEBjS2NFr0u`,
        headers: {
            'Host': 'haowenzhang.xinzhanyuedu.xuexiajie.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309021a) XWEB/6763 Flue',
            'Cookie': `PHPSESSID=${TXZX}`,
            'Origin': 'http://haowenzhang.xinzhanyuedu.xuexiajie.com',
            //'Content-Length': '32'

        },
        data: {"nuaid":nuaid,"type":"check"},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.errcode == 'READSUCCESS'){
            log(`\n结束阅读成功`)
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {
            log(data.msg);
          }
        } catch (e) {
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function into()//试试进入
{
   return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: `http://haowenzhang.xinzhanyuedu.xuexiajie.com/reads/read`,
        headers: {
            'Host': 'haowenzhang.xinzhanyuedu.xuexiajie.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309021a) XWEB/6763 Flue',
            'Cookie': `PHPSESSID=${TXZX}`,
            'Origin': 'http://haowenzhang.xinzhanyuedu.xuexiajie.com',
            //'Content-Length': '32'

        },
        //data: {"nuaid":nuaid,"type":"check"},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.errcode == 'READSUCCESS'){
            log(`\n进入成功`)
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {
            log(data.msg);
          }
        } catch (e) {
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
  



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function sign()//签到
{
   return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: `http://fenxiang.laozhanyuedu.xuexiajie.com/yaoqingyuedu?fir=100254`,
        headers: {
            'Host': 'fenxiang.laozhanyuedu.xuexiajie.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309021a) XWEB/6763 Flue',
            'Cookie': `PHPSESSID=${TXZX}`,
        },
        //data: {},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.code == ''){
            log(`\n成功`)
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {
            log(data.msg);
          }
        } catch (e) {
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
  
///////////////
async function mem()//旧版卡密
{
   return new Promise((resolve) => {
      var options = {
        method: 'POST',
        url: `http://dagua.hy.k9981.top/read.member/cdkeyrecharge.html`,
        headers: {
            'Host': 'dagua.hy.k9981.top',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309021a) XWEB/6763 Flue',
            'Cookie': `PHPSESSID=${TXZX}`,
        },
        data: {cdkey:T1},
        timeout: 5000 // 设置超时时间为5秒
      };
      if (debug) {
        log(`\n【debug】=============== 这是  请求 url ===============`);
        log(JSON.stringify(options));
      }
      axios.request(options).then(async function(response) {
        try {
          data = response.data;
          if (debug) {
            log(`\n\n【debug】===============这是 返回data==============`);
            log(JSON.stringify(response.data));
          }
          if(data.code == ''){
            log(`\n成功`)
            //addNotifyStr(`\n打卡成功\n`, true)

          } else {
            log(data.msg);
          }
        } catch (e) {
          log(`异常：${data}，原因：${data.message}`);
        }
      }).catch(function(error) {
        console.error(error);
      }).then(res => {
        //这里处理正确返回
        resolve();
      });
    });
}
  





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
 


}
///////////////////////////////////////////////////////////////////////////////
/**

* 获取随机诗词 */

function poem(timeout = 3 * 1000) {

    return new Promise((resolve) => {
    
    let url = {
    
    url: `https://v1.jinrishici.com/all.json` }
    
    $.get(url, async (err, resp, data) => {
    
    try {
    
    data = JSON.parse(data) 
    log(`${data.content}  \n————《${data.origin}》${data.author}`);
    
    } catch (e) {
    
    log(e, resp);
    
    } finally {
    
    resolve() } }, timeout) })
}
/**

* 获取每日英语 */

function English(timeout = 3 * 1000) {

    return new Promise((resolve) => {
    
    let url = {
    
    url: `https://api.oioweb.cn/api/common/OneDayEnglish` }
    
    $.get(url, async (err, resp, data) => {
    
    try {
    
    data = JSON.parse(data) 
    log(`${data.result.content}  \n————${data.result.note}`);
    
    } catch (e) {
    
    log(e, resp);
    
    } finally {
    
    resolve() } }, timeout) })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function report() //通知
{
  const options = {
    method: 'GET',
    url: 'https://github.com/Poppypy/ql',
    headers: {},
    data: {},
    timeout: 5000 // 设置超时时间为2秒

  };

  try {
    const response = await axios(options);

    const responseData = response.data;
    // console.log(responseData);
    const $ = cheerio.load(responseData);
const firstParagraphText = $('p').eq(10).text(); // "随便测试一下"
const secondParagraphText = $('p').eq(11).text(); // "122"
// const thirdaragraphText = $('p').eq(12).text(); // "122"
// const fourthParagraphText = $('p').eq(13).text(); // "122"
// const fifthParagraphText = $('p').eq(14).text(); // "122"

log(firstParagraphText,secondParagraphText); // 打印出："随便测试一下" "122"

    // 将响应结果写入文件
    fs.writeFileSync('response.html', responseData);
  } catch (error) {
    log(error);
  }
}




///////////////////////////////////////延时函数////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function stop() {
delay=randomNum(9000,15000);
log(`随机延迟${delay}毫秒`)
    await $.wait(delay);//
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
////假设现在时间是 2023-03-27 12:30:00，那么以下代码可以判断当前时间是否在今天 24:00:00 之前：
/* 
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 获取今天的零时零分零秒
const deadline = new Date(today.getTime() + 24 * 60 * 60 * 1000); // 获取今天 24:00:00 的时间戳
if (now.getTime() < deadline.getTime()) {
  // 当前时间在今天 24:00:00 之前
  console.log('在今天 24:00:00 之前');
} else {
  // 当前时间在今天 24:00:00 之后
  console.log('在今天 24:00:00 之后');
}
//可以使用下面这段代码判断当前时间是否大于 6 点：
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const now = new Date();
if (now.getHours() >= 6) {
  console.log("当前时间大于等于6点");
} else {
  console.log("当前时间小于6点");
}
 */

///获取json返回值
// for (let i = 0; i < 20 && i < data.data.article_list.length; i++) {
//     ids.push(data.data.article_list[i].id);
  

//   console.log(ids); // 输出存储的id属性值
// }
// 获取打印时间戳
// const timestamp = Date.now();//毫秒级时间戳
// console.log(timestamp);
// log(Math.floor(Date.now() / 1000))//秒级时间戳
//var hash = MD5("Math.floor(Date.now() / 1000)");//MD5加密

  
 







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function Envs() {
    if (TXZX) {
        if (TXZX.indexOf("@") != -1) {
            TXZX.split("@").forEach((item) => {

                TXZXArr.push(item);
            });
        } else if (TXZX.indexOf("\n") != -1) {
            TXZX.split("\n").forEach((item) => {
                TXZXArr.push(item);
            });
        } else {
            TXZXArr.push(TXZX);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 TXZX`)
        return;
    }

    return true;
}
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`)
    }
    msg += `${str}\n`
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}
var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}}function F(x,y,z){return(x&y)|((~x)&z);}function G(x,y,z){return(x&z)|(y&(~z));}function H(x,y,z){return(x^y^z);}function I(x,y,z){return(y^(x|(~z)));}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();}
function randomString(m) {//生成随机字符串
    for (var e = m > 0 && void 0 !== m ? m : 21, t = ""; t.length < e;) t += Math.random().toString(36).slice(2);
    return t.slice(0, e)
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}   
