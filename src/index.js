const express = require('express')
const cors= require('cors')
const mongoose = require('mongoose')
const event = require('./module/events');

const app = express()
app.use(cors())
app.use(express.json())


const PORT = 3000
mongoose.connect('mongodb+srv://Elgizawy:elgizawy123@cluster0.fo96rsh.mongodb.net/Events?retryWrites=true&w=majority')
.then(()=>{console.log('✅ Connected to MongoDB')})
.catch((err)=>{console.error('❌ MongoDB connection error:', err)})

app.get('/api/event', async (req,res)=>{
    const events = await event.find() 
    res.json(events)
})

// app.get('/api/event', async (req, res) => {
//   try {
//     // قراءة page و limit من الـ query parameters
//     const page = parseInt(req.query.page) || 1;  // الصفحة المطلوبة
//     const limit = parseInt(req.query.limit) || 10; // عدد العناصر في الصفحة
//     const skip = (page - 1) * limit;

//     const events = await event.find().skip(skip).limit(limit);
//     const total = await event.countDocuments();

//     res.json({
//       total,       // إجمالي الأحداث
//       page,        // الصفحة الحالية
//       limit,       // عدد العناصر في الصفحة
//       events       // البيانات نفسها
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'حدث خطأ', error });
//   }
// });


app.get('/api/event/:id',async(req,res)=>{
    const singleEvent = await event.findOne({ id: parseInt(req.params.id) });
    if(singleEvent){
        res.json(singleEvent)
    }else{
        res.status(404).json({message: "الحدث غير موجود"})
    }
})





app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


