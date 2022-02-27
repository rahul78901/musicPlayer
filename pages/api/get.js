import Music from "../../utlis/musicModel"
import mongo from "../../utlis/mongoCunnect"

export default function (req, res) {
  if (req.method === "GET") {
    mongo(()=> {
      Music.find().then(data=> {
        return res.status(200).json({
          data
        });
      }).catch(err=> {
        return res.status(500).json({
          massage: "something went wrong!"
        });
      });
    });
  }else{
    return res.status(405).json({
      massage:"not allowed"
    });
  }
}