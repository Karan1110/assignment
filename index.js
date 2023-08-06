require("dotenv").config()
const express = require("express")
const multer = require("multer")
const app = express()
const port = 3001
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const fs = require("fs")
const { PDFDocument, rgb } = require("pdf-lib")

// Set up multer storage
const storage = multer.diskStorage({
  destination: "./uploads", // Save the uploaded file to the "uploads" folder
  filename: function (req, file, cb) {
    cb(null, "example.pdf") // Save the file with the name "example.pdf"
  },
})
const upload = multer({ storage })

app.get("/load-pdf", async (req, res) => {
  try {
    const pdfPath = "./uploads/example.pdf"

    // Check if the PDF file already exists
    if (!fs.existsSync(pdfPath)) {
      // Create a new PDF with an input field
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([500, 300])

      const form = pdfDoc.getForm()
      const inputField = form.createTextField("my-input-field")
      inputField.setText("") // Set the initial value (optional)
      inputField.addToPage(page, {
        x: 50,
        y: 200,
        width: 200,
        height: 30,
        textColor: rgb(0, 0, 0),
        backgroundColor: rgb(1, 1, 1),
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      })

      // Save the newly created PDF as 'example.pdf' file
      const pdfBytes = await pdfDoc.save()
      fs.writeFileSync(pdfPath, pdfBytes)
    }

    // Load the existing PDF from the file
    const pdfBytes = fs.readFileSync(pdfPath)

    // Set the response content type to 'application/pdf'
    res.setHeader("Content-Type", "application/pdf")

    res.send(pdfBytes)
  } catch (error) {
    console.error("Error loading PDF:", error)
    res.status(500).send("Error loading PDF")
  }
})

app.post("/save-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    const pdfPath = "./uploads/example.pdf"

    // Load the existing PDF from the file
    const pdfBytes = fs.readFileSync(pdfPath)
    const pdfDoc = await PDFDocument.load(pdfBytes)

    // Fill the form (Assuming the PDF has a form field named 'my-input-field')
    const form = pdfDoc.getForm()
    form.getTextField("my-input-field").setText(req.body.input)

    // Save the filled PDF back to the file
    const filledPdfBytes = await pdfDoc.save()
    fs.writeFileSync(pdfPath, filledPdfBytes)

    res.send("PDF form filled and saved successfully")
  } catch (error) {
    console.error("Error saving PDF:", error)
    res.status(500).send("Error saving PDF")
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
