import Music from "../../utlis/musicModel";
import mongo from "../../utlis/mongoCunnect";
import mongoose from "mongoose";

export default function (req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      massage: 'not allowed¡'
    });
  } else if (req.method === "POST") {
    const {name,music,image}=req.body;
    const errors=[];
    if (!name) errors.push("Name Is Required");
    if (!music)errors.push("Music File Is Required");
    if (errors.length) return res.status(406).json({
        massage:errors
      });
    const musicData = {
      author: mongoose.Types.ObjectId("621b4321b217d8a3e93cbcd9"),
      name,
      music,
    };
    if (image) musicData.image=image;
    mongo(()=> {
      Music.create(musicData).then((data)=> {
        return res.status(200).json({
          data
        });
      }).catch((e)=> {
        console.error({e});
        return res.status(500).json({
          massage: 'someThing Went Wrong'
        });
      });
    });
  }
}