const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

// 使用cors中间件启用CORS，对所有来源开放
app.use(cors());
app.use(express.json());

app.get('/whois', async (req, res) => {
    const { name, suffix } = req.query;

    // 设置CORS相关的头部
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        // 修改请求的 URL 参数名称
        const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            // 处理失败响应
            res.status(response.status).send(`Error: ${response.statusText}`);
        }
    } catch (error) {
        // 处理网络或其他错误
        res.status(500).send(`Server Error: ${error}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
