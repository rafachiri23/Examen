const express = require("express");
let router = express.Router();

router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbOrdenesModel.getAll()
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbOrdenesModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.get('/name/:nameid', async(req, res)=>{
  try{
    const { skuid } = req.params;
    let rsltset = await mdbOrdenesModel.getByAttibutes({name: nameid});
    res.status(200).json(rsltset);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.post('/new', async (req, res)=>{
  try{
    let { name, email, phone, produc, pago, state=1 } = req.body;
    pago = Number(pago);
    var rslt = await mdbOrdenesModel.addOne({ name, email, phone, produc, pago, state});
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {produc, sales} = req.body;
    sales = Number(sales);
    produc = Number(produc);
    let rslt = await mdbOrdenesModel.updateById(id, produc, sales);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.delete('/del/:id',async (req, res)=>{
  let {id} = req.params;
  try{
    let rslt = await mdbOrdenesModel.removeById(id);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});
module.exports = router;