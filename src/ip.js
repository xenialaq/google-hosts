function val2Ip(ipVal) {
    let output = [];
    let ipValue = ipVal
    for (let i = 0; i < 4; i+=1) {
        output.unshift(ipValue % 256)
        ipValue = Math.floor(ipValue / 256)
    }
    return output.join('.');
}

module.exports = function ipToRange(ip, prefix) {
    let ipValue = 0;
    ip.split('.').map((v, i) => {
        ipValue += parseInt(v, 10) * Math.pow(256,3-i)
    })
    const mod = Math.pow(2, 32 - prefix)
    return val2Ip(ipValue - ipValue % mod);
}
