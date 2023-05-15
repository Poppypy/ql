import urllib.request
import urllib.parse
import json
import time
#import sys

#抓取login那个包   https://api-farm.game.mgtv.com/api/login

openid = 'afc5be9410fb582dbe69753f0dc97019'
ticket = '6ECB8C9C360C37AFBF4E9BD322FB22D7'
nickName = 'mg5747192958'
did = '6747eaa5037c6c87df6a966bd6dd4833'
pbid = 'android'


# def printf(text):
#     print(text)
#     sys.stdout.flush()
# def load_send():
#     global send
#     cur_path = os.path.abspath(os.path.dirname(__file__))
#     sys.path.append(cur_path)
#     if os.path.exists(cur_path + "/sendNotify.py"):
#         try:
#             from sendNotify import send
#         except:
#             send = False
#             printf("加载通知服务失败~")
#     else:
#         send = False
#         printf("加载通知服务失败~")
# load_send()

#url 访问 返回响应体
def wangye_fangwen(fangfa,cr_url,cr_data,cr_headers):
    tijiao_url = cr_url
    data = cr_data
    data = urllib.parse.urlencode(data).encode('utf-8')
    headers = cr_headers
    if fangfa == 'post' :
        # 执行
        request = urllib.request.Request(url=tijiao_url, headers=headers, data=data)
        response = urllib.request.urlopen(request)
        content = response.read().decode('utf-8')
    elif fangfa == 'get' :
        data = urllib.parse.urlencode(data)
        url = cr_url + data
        request = urllib.request.Request(url=url, headers=headers)
        response = urllib.request.urlopen(request)
        content = response.read().decode('utf‐8')
    else:
        content = "先输入请求方式"
    return content


#任务函数
def renwu_hs(taskid):
    cr_url = 'https://api-farm.game.mgtv.com/api/gainTaskAward'
    cr_data = {
        'taskid': taskid
    }
    fangfa = 'post'
    cr_headers = z_headers
    fanhui = wangye_fangwen(fangfa, cr_url, cr_data, cr_headers)
    fanhui_josn = json.loads(fanhui )
    try:
        jieguo = fanhui_josn.get('data').get('errmsg','任务id:' + str(taskid) + '成功')
        print('******' + jieguo + '******')
    except:
        print('出错啦，在任务这里\n\n')

#浇水
def jiaoshui_hs():
    cr_url = 'https://api-farm.game.mgtv.com/api/watering'
    cr_data = {
        'wateringtype': 1,
    }
    jsfhz = wangye_fangwen('post',cr_url, cr_data, z_headers)
    jsfhz_josn = json.loads(jsfhz)
    jg = jsfhz_josn.get('data').get('errmsg','')
    if jg :
        if jg == 'the drips is not enough!' :
            print('******没有水滴了！*****')
        drips = 0
    else:
        try:
            taskProgress = jsfhz_josn['data']['taskProgress']
            for i in taskProgress:
                if i['gained'] == 1:
                    time.sleep(1)
                    taskid = i['taskid']
                    renwu_hs(taskid)
            drips = jsfhz_josn['data']['drips']
        except:
            print('叫谁这里，其他错误')
            drips = 0
    return drips

def jiaoshui_hszx():
    #执行浇水
    drips = 11
    jscs = 0
    while drips > 10 :
        time.sleep(2)
        jscs = jscs +1
        print('*****执行浇水第' + str(jscs) + '次******')
        drips = jiaoshui_hs()
        if drips < 10 :
            print('*****水滴数量不够了！退出浇水******')

#收集礼盒
def lihe_hs():
    cr_url = 'https://api-farm.game.mgtv.com/api/openbox?'
    cr_data = {}
    lhfhz = wangye_fangwen('post',cr_url, cr_data, z_headers)
    lhfhz_josn = json.loads(lhfhz)
    jg = lhfhz_josn.get('data').get('errmsg','成功')
    #print(jg)  # 调试输出
    if jg == "the daydrip is can't open box!'" :
        print('******没有礼盒了！*****')
        lhqk =  0
    elif jg == "成功" :
        try:
            lhvalue = lhfhz_josn.get('data').get('gainaward').get('value', 0)
            print('******收集礼盒获得:' + str(lhvalue) + '*****')
            lhqk = 1
        except:
            print('******收集错误礼盒，其他原因*****')
            lhqk = 0
    else:
        lhqk = 0
    return  lhqk

if __name__ == '__main__':
    #登入
    cr_url = 'https://api-farm.game.mgtv.com/api/login'
    cr_data = {
        'openid' : openid,
        'ticket' : ticket,
        'nickName' : nickName,
        'did' : did,
        'pbid' : pbid
    }
    cr_headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ImgoTV-iphone/7.1.2.2206302110'
    }
    fanhuizhi = wangye_fangwen('post',cr_url,cr_data,cr_headers)

    fanhuizhi_josn = json.loads(fanhuizhi )
    if fanhuizhi_josn['code'] == 200 :
        #print('******URL访问成功******')
        token = fanhuizhi_josn.get('data').get('token','未获取到')

        if token == '未获取到' :
            print('!!!!!!未获取到token!!!!!')
        else:
            print('******获取到token******')
    else:
        print('******URL登陆失败******')
        token = '访问失败'
        #获取信息
    sg_sfcs = fanhuizhi_josn['data']['userdata']['hasSeed'] #是否成熟
    sg_level = fanhuizhi_josn['data']['userdata']['level'] #等级

    #设置表头
    z_headers = {
        'Usere; -Agent': 'Mozilla/5.0 (iPhonCPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ImgoTV-iphone/7.1.2.2206302110',
        'autohrization':token
    }

    #下雨
    time.sleep(1)
    cr_url ='https://api-farm.game.mgtv.com/api/uploadSunlightRain'
    cr_data = {
        'sunlight': 20
    }
    xiayu = wangye_fangwen('post', cr_url, cr_data, z_headers)
    xiayu_josn = json.loads(xiayu)
    if xiayu_josn.get('data').get('sunlight',0) > 0 :
        print('******领取下雨成功*****')
    else:
        sbyy = xiayu_josn.get('data').get('errmsg','其他原因')
        print('******领取下雨失败，失败原因：' + sbyy + '*****')

    #签到
    time.sleep(1)
    cr_url = 'https://api-farm.game.mgtv.com/api/sign'
    cr_data = {}
    qiandao = wangye_fangwen('post', cr_url, cr_data, z_headers)
    qiandao_josn = json.loads(qiandao)
    qdjg = qiandao_josn.get('data').get('errmsg','成功')
    if qdjg == "It's already sign!" :
        print('******重复签到！*****')
    elif qdjg == "成功" :
        print('******签到成功！*****')
    else:
        print('↓↓↓↓↓签到其他情况↓↓↓↓↓')
        print(qdjg)
    #领取水桶
    time.sleep(1)
    cr_url = 'https://api-farm.game.mgtv.com/api/collectBottle?'
    cr_data = {}
    shoujishuit = wangye_fangwen('post', cr_url, cr_data, z_headers)
    shoujishuit_josn = json.loads(shoujishuit)
    stjg = shoujishuit_josn.get('data').get('errmsg','成功')
    if stjg == "成功" :
        sdsl = shoujishuit_josn.get('data').get('gainaward').get('value')
        print(f'******领取到隔夜水滴:{sdsl}个*****')
    elif stjg == "too least drips to collect" :
        print('******滴水太少而无法收集*****')
    elif stjg == "重复请求" :
        print('******重复请求！*****')
    elif stjg == "time is no up" :
        print('******时间还没有到！*****')
    else:
        print('↓↓↓↓↓水桶其他情况↓↓↓↓↓')
        print(stjg)
    #执行浇水
    jiaoshui_hszx()
    #收集礼盒 浇水有礼盒收集礼盒
    lhqk = 1
    lhcs = 0
    while lhqk > 0 :
        time.sleep(2)
        lhcs = lhcs +1
        print('*****领取礼盒第' + str(lhcs) + '次******')
        lhqk = lihe_hs()
        if lhqk == 0 :
            print('*****礼盒没了！退出礼盒领取******')
            if lhcs > 1 :
                print('*****领取到礼盒再次去浇水******')
                jiaoshui_hszx()  # 去浇水
                lhqk = lihe_hs()
