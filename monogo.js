const https = require('https')

function callback(res) {
    let data = ''

    res.on('data', chunk => data += chunk)
    res.on('end', () => calculate(data))
}

function calculate(data) {
    let all = {}, filtered = [], arr

    const obj = JSON.parse(data)
    obj.products.forEach(it => all[it.id] = {price: it.price})
    obj.colors.forEach(it => Object.assign(all[it.id], {color: it.value}))
    obj.sizes.forEach(it => Object.assign(all[it.id], {size: it.value}))
    arr = Object.values(all);
    obj.selectedFilters.colors.forEach(color => filtered = [...filtered, ...arr.filter(it => it.color === color)])
    arr = filtered
    filtered = []
    obj.selectedFilters.sizes.forEach(size => filtered = [...filtered, ...arr.filter(it => it.size === size)])
    arr = filtered.filter(it => it.price > 200)
        .map(it => it.price)
    arr = Math.round(Math.min(...arr) * Math.max(...arr))
    filtered = []
    Array.prototype.forEach.call(arr + '', (it, idx, string) => {
        if (idx % 2) {
            filtered.push(+it + +string[idx - 1]);
        }
    });
    console.log(filtered.findIndex(it => it === 14) * arr * 'Monogo'.length)
}

https.get('https://www.monogo.pl/competition/input.txt', callback)
