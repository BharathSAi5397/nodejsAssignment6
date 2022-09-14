const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog', async (req,res)=>{
    try{
        const {page,search}=req.query;
        
    const data = await Blog.find({"topic":search}).skip(5*(Number(page)-1)).limit(5);
    const data1= await Blog.findById()
    console.log(req.query.search)
    //console.log(req.query)
    res.json(data)
    }catch(e){
        res.send(e)
    }
    
})

//posting the data
router.post('/blog',  async (req,res)=>{
    try{
      const data=req.body;
      //console.log(data);
      if(data)
      {
        await Blog.create(data)
        res.json({
            status :"success",
            result :data
          })
      }
      else{
        res.json({
            status:"failure",
            message:"enter the data"

        })
      }
     
    }catch(e){
        res.send(e.message)
    }
    
})

//updating
router.put('/blog/:id', async (req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const data=await Blog.findById(id);
        console.log(data);
        const datatoupdate=req.body;
        if(data)
        {
            await Blog.findByIdAndUpdate(id,datatoupdate,{
                runValidators:true,
                new:true
            })
            res.json({
                status:"success",
                result:datatoupdate,
            })
        }
        else{
            res.json({
                result:"failure",
                message:"enter valid id"
            })
        }
    }catch(e){
        res.send(e)
    }
    
})

//deleting data
router.delete('/blog/:id', async (req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const data=await Blog.findOne({"_id" : id});
        console.log(data);
        if(data)
        {
            await Blog.findByIdAndDelete(id);
            const dataAfterDeletion= await Blog.find();
            res.json({
                status:"success",
               dataAfterDeletion
            })
        }
        else{
            res.json({
                result:"failure",
                message:"enter valid id"
            })
        }
    }catch(e){
        res.send(e)
    }
    
})


module.exports = router;