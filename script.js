function checkDomain() {
    var domainName = document.getElementById('domainName').value;
    var domainSuffix = document.getElementById('domainSuffix').value;
    var queryButton = document.getElementById('queryButton');
    var resultDiv = document.getElementById('result');

    queryButton.disabled = true;
    queryButton.textContent = '查询中...';

    fetch(`https://whois.freeaiapi.xyz/?name=${domainName}&suffix=${domainSuffix}`)
        .then(response => response.json())
        .then(data => {
            displayResult(data);
            queryButton.disabled = false;
            queryButton.textContent = '查询';
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>查询失败！请联系jhhofficail@gmail.com</p>';
            queryButton.disabled = false;
            queryButton.textContent = '查询';
        });
}

function displayResult(data) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (data.status === "ok") {
        resultDiv.innerHTML += `<p>查询成功！</p>`;
        resultDiv.innerHTML += `<p>状态: ${data.available ? '未注册' : '已注册'}</p>`;
        resultDiv.innerHTML += `<p>名称: ${data.name}</p>`;
        resultDiv.innerHTML += `<p>后缀: ${data.suffix}</p>`;
        resultDiv.innerHTML += `<p>域名: ${data.domain}</p>`;
        if (data.creation_datetime) {
            resultDiv.innerHTML += `<p>注册时间: ${data.creation_datetime}</p>`;
        }
        resultDiv.innerHTML += `<p>能否注册: ${data.available ? '是' : '否'}</p>`;
        resultDiv.innerHTML += `<p>详细信息: <pre>${data.info}</pre></p>`;
    } else {
        resultDiv.innerHTML = `<p>查询失败！请联系jhhofficail@gmail.com</p>`;
    }
}

function clearInputs() {
    document.getElementById('domainName').value = '';
    document.getElementById('domainSuffix').value = '';
    document.getElementById('result').innerHTML = '';
}
