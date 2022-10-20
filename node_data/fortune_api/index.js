const fs = require('fs');
 const express = require('express');
 const patientNames = require('./data/patientNames');
 const patientDetail = require('./data/patientDetail.json');
 const bodyParser = require('body-parser');

 const app = express();

app.use(bodyParser.json());

app.get('/patientNames0', (req, res) => {
    // res.send('To get all details using get function!!!');
    res.json(patientNames);
});

// app.get('/patientNames/random', (req, res) => {
//     console.log('To get details by Random id');

//     const random_index = Math.floor(Math.random() * patientNames.length);

//     const r_patientNames = patientNames[random_index];

//     res.json(r_patientNames);
// });

const writepatientNames = json => {
    fs.writeFile('./data/patientNames.json', JSON.stringify(json), (err) => console.log(err));
}

app.post('/patientNames', (req, res) => {
    console.log();
    const { id, name, age, gender } = req.body;
    const patientNames_ids = patientNames.map(f => f.id);
    const new_patientNames = patientNames.concat({ id: (patientNames_ids.length > 0 ? Math.max(...patientNames_ids) : 0) + 1,
    id,
    name,
    age,
    gender
});

    writepatientNames(new_patientNames);
    res.json(new_patientNames);

});

app.put('/patientNames/:id', (req, res) => {
    const { id } = req.params;
    const old_patientNames = patientNames.find(f => f.id == id);
    ['name', 'age', 'gender'].forEach(key => {
        if(req.body[key]) old_patientNames[key] = req.body[key];
    });

    writepatientNames(patientNames);
    res.json(patientNames);

});

app.delete('/patientNames/:id', (req, res) => {
    const { id } = req.params;
    const new_patientNames = patientNames.filter(f => f.id != id);
    writepatientNames(new_patientNames);
    res.json(new_patientNames);
});

const writePdetail = json => {
    fs.writeFile('./data/patientDetail.json', JSON.stringify(json), (err) => console.log(err));
}

app.get('/patientDetail/:patid', (req, res) => {
    // res.json(patientNames);
    const {patid} = req.params;
    console.log(patientDetail[1]);
     // const pd = patientDetail.filter(f => f.id != id);
    //  for(var i=0; i<patientDetail.length; i++){
    //      if(patid==patientDetail[i].patid)
    //      console.log(i);
    //  }
    const pd = patientDetail.filter(f => patid == f.patid);
    ['Nid', 'prescrption', 'date']
    // console.log("patient detail!!!!", pd);
    // writePdetail(pd);
    // res.send('txt');
    res.json(pd);
});

const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
