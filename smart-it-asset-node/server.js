const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Mock Data Aset Universitas
let assetsData = [
    { id: "AST-FTI-001", name: "PC Workstation i7", unit: "Lab FTI", age: "3.5 Thn", temp: "48 °C", ssd: "94%", health: 88, status: "EXTEND", rec: "Perpanjang Masa Pakai (+2 Thn via RAM Upgrade)" },
    { id: "AST-LIB-042", name: "PC Anjungan Katalog", unit: "Perpustakaan", age: "5.1 Thn", temp: "72 °C", ssd: "42%", health: 54, status: "SERVICE", rec: "Ganti SSD & Thermal Paste (Service Rutin)" },
    { id: "AST-REK-012", name: "Laptop Admin Rektorat", unit: "Rektorat", age: "4.0 Thn", temp: "55 °C", ssd: "81%", health: 79, status: "EXTEND", rec: "Perpanjang Masa Pakai (+1.5 Thn)" },
    { id: "AST-ELK-088", name: "Cisco Switch 2960", unit: "Lab Elektro", age: "6.8 Thn", temp: "68 °C", ssd: "N/A", health: 38, status: "RETIRE", rec: "Daur Ulang (E-Waste / Dismantle Spareparts)" },
    { id: "AST-FTI-104", name: "PC Core i5 Graphic Lab", unit: "Lab FTI", age: "2.1 Thn", temp: "42 °C", ssd: "98%", health: 95, status: "EXTEND", rec: "Kondisi Prima (Perpanjang Masa Pakai Otomatis)" },
    { id: "AST-LIB-019", name: "PC Kasir Sirkulasi", unit: "Perpustakaan", age: "4.8 Thn", temp: "64 °C", ssd: "60%", health: 62, status: "SERVICE", rec: "Perbaikan Fan & Pembersihan Debu Komponen" }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { assets: assetsData });
});

app.post('/api/add-asset', (req, res) => {
    const { name, unit, age, temp, ssd, health, status, rec } = req.body;
    const newId = `AST-${unit.substring(0,3).toUpperCase()}-00${assetsData.length + 1}`;
    assetsData.push({
        id: newId,
        name,
        unit,
        age: age + " Thn",
        temp: temp + " °C",
        ssd: ssd + "%",
        health: parseInt(health),
        status,
        rec
    });
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
