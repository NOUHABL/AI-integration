const express = require("express");
const itemsRoutes = require("./routes/items.routes");
const infoRoutes = require('./routes/infoRoutes');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use("/items", itemsRoutes);
app.use('/api', infoRoutes); 
app.use('/api/ai', aiRoutes);

app.use(express.json());
app.use(express.static('.'));


app.use('/api/info', infoRoutes);
app.use('/api/ai', aiRoutes);


module.exports = app;

