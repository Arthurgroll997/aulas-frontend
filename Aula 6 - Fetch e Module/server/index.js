import express from "express";
import qrcode from "qrcode";
import cors from "cors";
import imgNotebook from "./notebookImg.js";

const app = express();

const port = 3000;

const products = [
    {
        id: 1,
        title: "Notebook Dell",
        description: "O melhor notebook dessa geração!",
        image: imgNotebook,
        price: 4999.90,
    },
];

const isValidProduct = (prod) => {
    if (typeof prod !== "object" || prod === null)
        return false;

    const reqFields = [ "title", "description", "image", "price" ];

    let valid = true;

    reqFields.forEach(field => {
        if (!(field in prod) || prod[field] === undefined || prod[field] === null ||
            (typeof prod[field] === "string" && prod[field].trim() === ""))
                valid = false;
    });

    return valid;
}

const getProdById = (prodId) => products.filter(prod => prod.id == prodId).length > 0 ?
    products.filter(prod => prod.id == prodId)[0] : null;

const getProductDto = (prod) => {
    return { id: prod.id, title: prod.title, price: prod.price }
}

app.use(express.json());
app.use(cors());

app.get("/ping", (_, res) => {
    res.send(`{ "message": "Pong!" }`);
});

app.post("/product", (req, res) => {
    const prod = req.body;
    
    if (!isValidProduct(prod)) {
        res.status(400);

        res.send(`{ "message": "Invalid product structure" }`);
        
        return;
    }
    
    products.push({
        id: products.length + 1,
        title: prod.title,
        description: prod.description,
        image: prod.image,
        price: prod.price,
    });

    res.status(201);
    res.send(`{ "productId": ${products.length} }`);
});

app.get("/product", (req, res) => {
    res.send(`{ "products": ${JSON.stringify(products)} }`);
});

app.get("/product/:productId", (req, res) => {
    if (!getProdById(req.params.productId)) {
        res.status(400);

        res.send(`{ "message": "Product with ID ${req.params.productId} not found" }`);
        return;
    }
    
    res.send(`{ "product": ${JSON.stringify(getProdById(req.params.productId))} }`);
});

app.post("/product/qr-code/:productId", async (req, res) => {
    if (!getProdById(req.params.productId)) {
        res.status(400);

        res.send(`{ "message": "Product with ID ${req.params.productId} not found" }`);
        return;
    }

    res.status(200);
    res.send(`{ "qrCode": "${await qrcode.toDataURL(
        JSON.stringify(getProductDto(getProdById(req.params.productId))))}" }`);
});

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`);
});
