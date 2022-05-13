export default function handler(req, res) {
  setTimeout(()=>{
    res.status(200).json({ data: `hi,${req.query.id}` });
  },req.query.id * 1000)
}
