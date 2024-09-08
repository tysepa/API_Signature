const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Signature = require('./model/Signature');


const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tysepa:test123@cluster0.4syb2re.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDb connected'))
.catch(err => console.log(err));


// POST endpoint to push a signature to the database
app.post('/api/signatures', async (req, res) => {
    try {
      const { documentId, signature } = req.body;
  
      // Ensure the required fields are provided
      if (!documentId || !signature) {
        return res.status(400).json({ message: 'Document ID and signature are required.' });
      }
  
      // Create a new signature entry in the database
      const newSignature = new Signature({
        documentId,
        signature
      });
  
      await newSignature.save();
  
      res.status(201).json({ message: 'Signature saved successfully', data: newSignature });
    } catch (error) {
      res.status(500).json({ message: 'Error saving signature', error: error.message });
    }
  });
  
  // GET endpoint to fetch a signature by documentId
  app.get('/api/signatures/:documentId', async (req, res) => {
    try {
      const { documentId } = req.params;
  
      // Fetch the signature for the given documentId
      const signature = await Signature.findOne({ documentId });
  
      if (!signature) {
        return res.status(404).json({ message: 'Signature not found for the given document ID' });
      }
  
      res.status(200).json({ message: 'Signature fetched successfully', data: signature });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching signature', error: error.message });
    }
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });