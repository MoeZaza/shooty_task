module.exports = (req, res) => {

    const id = req.body.postId;
    const fs = require('fs');
    const rawdata = fs.readFileSync('src/mocks/posts.json');
    const jobs = JSON.parse(rawdata);
    const index = jobs.findIndex((job) => job.id === id);
    if (index >= 0) {
        jobs.splice(index, 1);
        const updatedData = JSON.stringify(jobs);
        fs.writeFileSync('src/mocks/posts.json', updatedData);
    }
    return res.status(200).send(jobs);
}

