const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors()); // 启用CORS

app.get('/whois', async (req, res) => {
    const { name, suffix } = req.query;
    try {
        const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
