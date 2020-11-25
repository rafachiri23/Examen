const express = require("express");
const fs = require("fs");
let router = express.Router();

let ordenesArray = [];

const writeToFile = ()=>{
  fs.writeFileSync('ordenes.json', JSON.stringify(ordenesArray));
}

const readFromFile = ()=>{
  try{
  let tmpJsonStr = fs.readFileSync('ordenes.json');
  ordenesArray = JSON.parse(tmpJsonStr);
  } catch(ex){
    ordenesArray = [];
  }
}


router.get('/all', (req, res)=>{
  res.status(200).json(ordenesArray);
} );

router.get('/one/:id', (req, res)=>{
  let { id } = req.params;
  id = Number(id);
  let ordenes = ordenesArray.find((o, i)=>{
    return o.id === id;
  })
  res.status(200).json(ordenes);

});

router.post('/new', (req, res)=>{
  const { name, email, phone, produc, pago} = req.body;
  const id = ordenesArray.length + 1;
  ordenesArray.push({ id, name, email, phone, produc, pago });
  writeToFile();
  res.status(200).json({ id, name, email, phone, produc, pago });
});

router.put('/upd/:id', (req, res)=>{
  let {id} = req.params;
  id = Number(id);
  let {produc} = req.body;
  produc = Number(produc);

  let modified = false;
  let product = null;
  let newOrdenesArray = ordenesArray.map( (o,i)=>{
    if( o.id === id) {
      modified = true;
      o.stock = stock;
      product = o;
    }
    return o;
  } );
  writeToFile();
  ordenesArray = newOrdenesArray;

  res.status(200).json({modified, product});
});

router.delete('/del/:id', (req, res)=>{
  let {id} = req.params;
  id = Number(id);
  let deleted = false;
  let product = null;
  let newOrdenesArray = ordenesArray.find( (o,i)=>{
    if (o.id !== id)
    {
      return true;
    } else {
      deleted = true;
      product = o;
      return false;
    }
  });
  ordenesArray = newOrdenesArray;
  writeToFile();
  res.status(200).json({deleted, product});
});

readFromFile();

module.exports = router;
