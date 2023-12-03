function checkDomain() {
    var domainName = document.getElementById('domainName').value;
    var domainSuffix = document.getElementById('domainSuffix').value;

    fetch(`https://whois.freeaiapi.xyz/?name=${domainName}&suffix=${domainSuffix}`)
        .then(response => response.json())
        .then(data => displayResult(data))
        .catch(error => console.error('Error:', error));
}

function displayResult(data) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.status === "ok") {
        resultDiv.innerHTML += `<p>域名: ${data.domain}</p>`;
        resultDiv.innerHTML += `<p>是否注册: ${data.available ? '未注册' : '已注册'}</p>`;
        if (data.creation_datetime) {
            resultDiv.innerHTML += `<p>注册时间: ${data.creation_datetime}</p>`;
        }
        // 可以根据需要添加更多信息
    } else {
        resultDiv.innerHTML = `<p>查询出错，请重试。</p>`;
    }
}
