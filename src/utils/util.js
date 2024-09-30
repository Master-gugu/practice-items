/**
 *  时间戳 转 y-mm-d HH:m:s
 * 输出格式：2021-12-03 14:12:01
 * @param  {[type]} date 日期
 */
export function formatDateTime(date) {
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    let second = date.getSeconds()
    second = second < 10 ? '0' + second : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
/**
 *  获取某月有多少天
 *
 * @param  {[type]} date 日期
 */
//
export function getDayByMonth(month) {
    var oDate = new Date()
    var year = oDate.getFullYear()
    var newDate = new Date(year, month - 1, 32)
    var day = 32 - newDate.getDate()
    return day
}

/*
* 获取UUID
* */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line one-var
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
/**
* 违规字符串替换
 */
export function doreplace(newtml, word, nword) {
    newtml = newtml.replace(eval('/(' + word + ')/g'), nword)
    return newtml
}
/**
 * 毫秒转换友好的显示格式
 * 输出格式：刚刚 / 13分钟前 / 12小时前 / 2天前
 * @param  {[type]} date 日期
 */
export function dateStr(date) {
    // 获取js 时间戳
    let time = new Date().getTime()
    // 去掉 js 时间戳后三位
    time = parseInt(time - date) / 1000
    // 存储转换值
    let s
    if (time < 60 * 10) {
        // 十分钟内
        return '刚刚'
    } else if (time < 60 * 60 && time >= 60 * 10) {
        // 超过十分钟少于1小时
        s = Math.floor(time / 60)
        return s + '分钟前'
    } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        // 超过1小时少于24小时
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
    } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
        // 超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
    } else {
        // 超过3天
        date = new Date(date)
        return (
            date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        )
    }
}

/**
* 合并多张图片，返回新的图片
* @param {Array} list 图片url数组
* @param {Number} cwith 画布宽度 默认500
* @param {Number} cheight 画布高度 默认500
*/
export function mergeImgs(list, cwith = 15, cheight = 15) {
    return new Promise((resolve, reject) => {
        const baseList = []

        const canvas = document.createElement('canvas')
        let curPx = document.documentElement.style.fontSize
        curPx = parseFloat(curPx.split('px')[0])
        canvas.width = curPx * 4.4
        canvas.height = curPx * 4.4
        const context = canvas.getContext('2d')

        list.map((item, index) => {
            const img = new Image()
            img.src = item
            // 跨域
            img.crossOrigin = 'Anonymous'
            let row = Math.floor(index / 3)
            let sWith = cwith * (index - 3 * row)
            let sHeight = cheight * row

            img.onload = () => {
                context.drawImage(img, sWith, sHeight, cwith, cheight)
                const base64 = canvas.toDataURL('image/png')
                baseList.push(base64)

                if (baseList[list.length - 1]) {
                    // 返回新的图片
                    resolve(baseList[list.length - 1])
                }
            }
        })
    })
}

export function scrollEvent(domId, callbackFunc) {
    var dom = document.getElementById(domId)
    var scrollFunc = function (e) {
        var direct = 0
        e = e || window.event

        if (e.wheelDelta) { // IE/Opera/Chrome
            if (e.wheelDelta > 0) {
                direct = -1
            } else {
                direct = 1
            }
        } else if (e.detail) { // Firefox
            if (e.detail > 0) {
                direct = 1
            } else {
                direct = -1
            }
        }
        if (callbackFunc) {
            callbackFunc(direct)
        }
    }
    /* 注册事件 */
    if (dom.addEventListener) {
        dom.addEventListener('DOMMouseScroll', scrollFunc, false)
    }
    dom.onmousewheel = scrollFunc// IE/Opera/Chrome
}

/**
 * 获取滚动条的位置
 */
export function getScrollTop(id) {
    let scrollPos = document.getElementById(id)
    return scrollPos.scrollTop
}

/**
 * 滚动条到最下方
 * @param id 容器id
 */
export function scrollBottom(id, callback) {
    let div = document.getElementById(id)
    if (div) div.scrollTop = div.scrollHeight
    if (callback) callback(div.scrollHeight)
}

export const altList = [
    '[生气]',
    '[好奇]',
    '[嘿嘿]',
    '[思考]',
    '[为难]',
    '[哭笑]',
    '[吐血]',
    '[微笑]',
    '[害怕]',
    '[喜欢]',
    '[睁眼]',
    '[酷炫]',
    '[哭泣]',
    '[害羞]',
    '[闭嘴]',
    '[睡觉]',
    '[大哭]',
    '[尴尬]',
    '[嘻嘻]',
    '[超生气]',
    '[哼]',
    '[害]',
    '[粑粑]',
    '[鄙视]',
    '[无语]',
    '[努力]',
    '[鼓掌]',
    '[吓人]',
    '[左哼]',
    '[坏笑]',
    '[疑问 ]',
    '[哈哈]',
    '[略略略]',
    '[吐]',
    '[嘤嘤]',
    '[委屈呀]',
    '[开心]',
    '[打哈欠]',
    '[抠鼻]',
    '[哼哼]',
    '[可爱]',
    '[哭哭]',
    '[惊讶]',
    '[嘘]',
    '[右哼]',
    '[再见]',
    '[嘻嘻嘻]',
    '[亲亲]',
    '[汗]',
    '[吐槽]',
    '[晕]',
    '[想吃]]',
    '[累了]]',
    '[没眼看]',
    '[大鼻孔]',
    '[跳舞]'
]
/**
 * gif图
 * @param id 容器id
 */
export let faceUtils = {
    faces: () => {
        let arr = {}
        for (let i = 0; i < altList.length; i++) {
            arr[altList[i]] = './static/face/' + i + '.gif'
        }
        return arr
    }
}

// 转义
export function transform(content) {
    // 支持的html标签
    let html = function (end) {
        return new RegExp(
            '\\n*\\[' +
            (end || '') +
            '(code|pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)]\\n*',
            'g'
        )
    }
    let fa = faceUtils.faces()
    if (content) {
        content = content
            .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;') // XSS
            .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2')

            .replace(/face\[([^\s\\[\]]+?)]/g, function (face) {
                // 转义表情
                let alt = face.replace(/^face/g, '')
                return (
                    '<img alt="' +
                    fa[alt] +
                    '" title="' +
                    fa[alt] +
                    '" src="' +
                    fa[alt] +
                    '">'
                )
            })
            .replace(/img\[([^\s]+?)]/g, function (img) {
                // 转义图片
                let href = img.replace(/(^img\[)|(]$)/g, '')
                return (
                    '<img class="message-img" src="' + href + '" alt="消息图片不能加载">'
                )
            })
            .replace(/file\([\s\S]+?\)\[[\s\S]*?]/g, function (str) {
                // 转义文件
                let href = (str.match(/file\(([\s\S]+?)\)\[/) || [])[1]
                let text = (str.match(/\)\[([\s\S]*?)]/) || [])[1]
                if (!href) return str
                return (
                    '<a class="message-file" href="' +
                    href +
                    '"><i class="ivu-icon ivu-icon-md-arrow-down"></i>' +
                    (text || href) +
                    '</a>'
                )
            })
            .replace(/audio\[([^\s]+?)]/g, function (audio) {
                // 转义音频
                return (
                    '<div class="message-audio" data-src="' +
                    audio.replace(/(^audio\[)|(]$)/g, '') +
                    '"><i class="layui-icon">&#xe652;</i><p>音频消息</p></div>'
                )
            })
            .replace(/video\[([^\s]+?)]/g, function (video) {
                // 转义音频
                return (
                    '<div class="message-video"  data-src="' +
                    video.replace(/(^video\[)|(]$)/g, '') +
                    '"><i class="layui-icon">&#xe652;</i></div>'
                )
            })
            .replace(/a\([\s\S]+?\)\[[\s\S]*?]/g, function (str) {
                // 转义链接
                let href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1]
                let text = (str.match(/\)\[([\s\S]*?)]/) || [])[1]
                if (!href) return str
                return (
                    '<a href="' + href + '" target="_blank">' + (text || href) + '</a>'
                )
            })
            .replace(html(), '<$1 $2>')
            .replace(html('/'), '</$1>') // 转移HTML代码
            .replace(/\n/g, '<br>') // 转义换行
    }
    return content
}

export function bSort(arr, flig) {
    var len = arr.length
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j][flig] < arr[j + 1][flig]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

export function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
    })
}

let timeout = null
export function delayFun(fn, dey) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        fn()
    }, dey)
}

// 字符串转数字
export function strToNum(str) {
    let quantityList = str.split(',')
    if (quantityList.length > 0) {
        let curQuantity = ''
        quantityList.forEach(x => {
            curQuantity += x
        })
        return curQuantity
    }
    return 0
}

// 字符串数组去重
export function unique(arr) {
    return arr.filter(function (ele, index, array) {
        return array.indexOf(ele) === index
    })
}

// 1000转1K 1000000转1M
export function addChineseUnit(number, digits) {
    digits = digits == null ? 2 : digits
    const si = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'B' },
        { value: 1E12, symbol: 'T' },
        { value: 1E15, symbol: 'P' },
        { value: 1E18, symbol: 'E' }
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let i
    for (i = si.length - 1; i > 0; i--) {
        if (number >= si[i].value) {
            break
        }
    }
    if (number < 1000) {
        return Number(number).toFixed(digits)
    }
    let a = (number / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
    return a
}

// 整数逢三','
export function NumFormat(value) {
    let intPart = Number(value)
    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return intPartFormat
}

// 判断字符串为空
export function isNull(str) {
    if (str === '') return true
    var regu = '^[ ]+$'
    var re = new RegExp(regu)
    return re.test(str)
}
export function isvalidPhone(str) { // 手机号校验
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}

export function isPassword(str) { // 密码校验
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,24}$/
    return reg.test(str)
}
