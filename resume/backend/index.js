const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure 'resumes' directory exists
const resumesDir = path.join(__dirname, "resumes");
if (!fs.existsSync(resumesDir)) {
    fs.mkdirSync(resumesDir);
}

app.post("/generate-resume", async (req, res) => {
    const doc = new PDFDocument();
    const fileName = `resume-${Date.now()}.pdf`;
    const filePath = path.join(resumesDir, fileName);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(20).text("Resume", { align: "center" });
    doc.fontSize(14).text(`Name: ${req.body.name}`);
    // doc.text("---------------------------------")
    doc.text(`Email: ${req.body.email}`);

    doc.text(`Skills: ${req.body.skills.join(", ")}`);
    doc.text(`Education: ${req.body.education}`);
    doc.text(`Experience: ${req.body.exp}`);
    doc.text('Additional Details')
    doc.text("---------------------------------")
    req.body.additional && req.body.additional.map((value)=>{
        doc.text(`${value.field} :  ${value.value}`)        
        // doc.text(`description:${value.value}`) 
    })
    // doc.text('Additional Details')
    doc.end();

    stream.on("finish", () => {
        res.sendFile(filePath);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
