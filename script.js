document.addEventListener('DOMContentLoaded', function() {
    // 给输入框添加事件监听器
    document.getElementById('name').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkDomain();
        }
    });

    document.getElementById('suffix').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkDomain();
        }
    });

    // 给查询按钮添加点击事件监听器
    document.getElementById('queryButton').addEventListener('click', checkDomain);
});

function checkDomain() {
    console.log("checkDomain called");
    var name = document.getElementById('name').value;
    var suffix = document.getElementById('suffix').value;
    var queryButton = document.getElementById('queryButton');
    var resultDiv = document.getElementById('result');

    queryButton.disabled = true;
    queryButton.textContent = '查询中...';

    fetch(`https://onereed.xyz/whois?name=${name}&suffix=${suffix}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不是OK');
            }
            return response.text();
        })
        .then(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error('解析JSON时出错:', text);
                throw e;
            }
        })
        .then(data => {
            displayResult(data);
            queryButton.disabled = false;
            queryButton.textContent = '查询';
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p>查询失败：${error.message}</p>`;
            queryButton.disabled = false;
            queryButton.textContent = '查询';
        });
    console.log("checkDomain finished");
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
    document.getElementById('name').value = '';
    document.getElementById('suffix').value = '';
    document.getElementById('result').innerHTML = '';
}
