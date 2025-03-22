const express = require('express');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const profissionalRoutes = require("./routes/professional.routes");

const app = express();
const cors = require('cors');

app.use(cors());

// botoes n tao funcionando
// inclusão
//  

app.use(cookieParser());

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", profissionalRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});