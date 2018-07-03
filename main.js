var keys = {
    '0' : ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    '1' : ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    '2' : ['z', 'x', 'c', 'v', 'b', 'b', 'n', 'm'],
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

var hashInLocalStorage = JSON.parse(localStorage.getItem('website') || 'null')
if (hashInLocalStorage) {
    hash = hashInLocalStorage
}

for (var index1 = 0; index1 < keys.length; index1++) {
    console.log(keys.length)
    var div = document.createElement('div')
    kb.appendChild(div)
    for (var index2 = 0; index2 < keys[index1].length; index2++) {
        var kbd = document.createElement('kbd')
        var editorButton = document.createElement('button')
        kbd.textContent = keys[index1][index2]
        editorButton.textContent = 'E'
        editorButton.id = keys[index1][index2]
        div.appendChild(kbd)
        kbd.appendChild(editorButton)
        editorButton.onclick = function(even) {
            var e = even.target.id
            var newWebsite = prompt('请输入你所要修改的网址')
            hash[e] = newWebsite
            localStorage.setItem('website', JSON.stringify(hash))
        }
    }
}

document.onkeypress = function(even) {
    var key = even.key
    // location.href = 'http://' + hash[key] 
    window.open('http://' + hash[key]) //新开标签页
}
