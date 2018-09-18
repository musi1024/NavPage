// 1.初始化
var mainHash = init()
var keys = mainHash['keys']
var hash = mainHash['hash']

// 2.生成键盘
keyboard(keys, hash)

// 3.监听键盘
listenToUser(hash)

function init() {
    var keys = {
        '0' : ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        '1' : ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        '2' : ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        'length': 3,
    }
    
    var hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'r': 'ruanyifeng.com',
        't': 'taobao.com',
        'y': 'youku.com',
        'i': 'iqiyi.com',
    }
    
    var hashInLocalStorage = getFromLocalStorage('website')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }

    return {
        'keys': keys,
        'hash': hash,
    }
}

function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null')
}

function dc(tagName) {
    return document.createElement(tagName)
}

function keyboard(keys, hash) {
    for (var index1 = 0; index1 < keys.length; index1++) {
        var div = dc('div')
        kb.appendChild(div)
        var row = keys[index1]
        for (var index2 = 0; index2 < keys[index1].length; index2++) {

            var editorButton = createEditorButton(row[index2])
    
            var websiteIcon = addWebsiteIcon(hash[row[index2]])
    
            var kbd = createKbd(row[index2]) 

            kbd.appendChild(websiteIcon)   
            kbd.appendChild(editorButton)
             
            div.appendChild(kbd)
        }
    }
}

function createEditorButton(id) {
    var editorButton = dc('button')
    editorButton.textContent = 'E'
    editorButton.id = id
    editorButton.onclick = function(even) {
        var e = even.target
        var newIcon = e.previousSibling
        var newWebsite = prompt('请输入你所要修改的网址')
        console.log(newIcon.src)
        newIcon.src = 'http://' + newWebsite + '/favicon.ico'
        hash[e.id] = newWebsite   
        
        newIcon.onerror = function(even) {
            var e = even.target
            e.src = 'img/wrong.jpg'
        }
        localStorage.setItem('website', JSON.stringify(hash))
    }
    return editorButton
}

function addWebsiteIcon(domain) {
    var websiteIcon = dc('img')
    if (domain != undefined) {
        websiteIcon.src = 'https://' + domain + '/favicon.ico' 
    } else {
        websiteIcon.src = 'img/wrong.jpg'
    }
    websiteIcon.onerror = function(even) {
        var e = even.target
        e.src = 'img/wrong.jpg'
    }
    return websiteIcon
}

function createKbd(className) {
    var kbd = dc('kbd')
    kbd.textContent = className
    kbd.className = className
    kbd.onclick = function(even) {
        var e = even.target
        if (hash[e.className] != undefined) {
            window.open('https://' + hash[e.className]) 
        }
    }
    return kbd
}

function listenToUser(hash) {
    document.onkeypress = function(even) {
        var key = even.key
        if (hash[key] != undefined) {
            window.open('https://' + hash[key]) 
        }   
    }
}