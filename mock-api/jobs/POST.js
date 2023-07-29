module.exports = (req, res) => {

    const obj  = {...req.body};
    const fs = require('fs');
    const crypto = require('crypto');
    const rawdata = fs.readFileSync('src/mocks/posts.json');
    const jobs = JSON.parse(rawdata);
    obj.id = crypto.randomBytes(16).toString('hex');
    jobs.unshift(obj);
    const updatedData = JSON.stringify(jobs);
    fs.writeFileSync('src/mocks/posts.json', updatedData);
    return res.status(201).send(jobs);

}

