import postmessage from '../models/postmessage.js'


export const getposts=async (req,res)=>{
    try {
        const postmesseages=await postmessage.find();

        console.log(postmesseages)

        res.status(200).json(postmesseages)

    } catch (error) {
        res.error(404).json({message:error.message})
    }
}

export const createposts=async(req,res)=>{
    const post=req.body;

    const newpost=new postMessage(post);

    try {

        await newpost.save();

        
        res.status(201).json(newpost)
        
    } catch (error) {
        res.error(409).json({message:error.message})
    }
    
}