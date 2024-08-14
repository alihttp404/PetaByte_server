const bowlModel = require('../models/bowlModel');
const PDFDocument = require('pdfkit');
const axios = require('axios');

const getBowls = async (req, res) => {
  try {
    const bowls = await bowlModel.getBowls();
    res.json(bowls);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getBowlById = async (req, res) => {
  const { id } = req.params;
  try {
    const bowl = await bowlModel.getBowlById(id);
    if (!bowl) {
      res.status(404).send('Bowl not found');
    } else {
      res.json(bowl);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
 
const createBowl = async (req, res) => {
  const { location, status, description, lastupdated } = req.body;
  const { x, y } = location;

  try {
    const newBowl = await bowlModel.createBowl({ x, y }, status, description, lastupdated);
    res.status(201).json(newBowl);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateBowl = async (req, res) => {
  const { id } = req.params;
  const { location, status, description, lastupdated } = req.body;

  if (!location || !status || !description || !lastupdated) {
    return res.status(400).send("All fields (location, status, description, lastupdated) are required.");
  }

  try {
    const updatedBowl = await bowlModel.updateBowl(id, location, status, description, lastupdated);
    if (!updatedBowl) {
      return res.status(404).send("Bowl not found");
    }
    res.status(200).json(updatedBowl);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBowl = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBowl = await bowlModel.deleteBowl(id);
    if (!deletedBowl) {
      res.status(404).send('Bowl not found');
    } else {
      res.json(deletedBowl);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const exportBowls = async (req, res) => {
  const ids = req.query.ids;
  if (!ids) {
    return res.status(400).send('IDs are required');
  }

  const bowlIds = ids.split(',');

  try {
    // Fetch data for each bowl from the database
    const bowls = await Promise.all(bowlIds.map(id => bowlModel.getBowlById(id)));

    if (!bowls.length) {
      return res.status(404).send('No bowls found for the provided IDs');
    }

    const doc = new PDFDocument({autoFirstPage: false});
    
    res.setHeader('Content-disposition', 'attachment; filename=bowls.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    // Add bowl information and QR code to the PDF
    for (const bowl of bowls) {
      if (bowl) {
        doc.addPage();
        const qrUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${bowl.id}`;
        const qrImage = await axios.get(qrUrl, { responseType: 'arraybuffer' });
        const qrBuffer = Buffer.from(qrImage.data, 'binary');

        doc.fontSize(25).text(bowl.id, { underline: true });
        doc.fontSize(12).text(bowl.description);
        doc.image(qrBuffer, {
          fit: [100, 100],
          align: 'center',
          valign: 'center'
        });
      }
    }
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
};

module.exports = {
  getBowls,
  getBowlById,
  createBowl,
  updateBowl,
  deleteBowl,
  exportBowls,
};
