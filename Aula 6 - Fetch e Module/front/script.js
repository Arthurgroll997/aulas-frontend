import { fetchProducts, createProduct, generateQRCode } from "./fetch-functions.js";

const vitrinePage = document.getElementById("vitrine-page");
const adminPage = document.getElementById("admin-page");
const adminBtn = document.getElementById("adminBtn");
const backBtn = document.getElementById("backBtn");

const productList = document.getElementById("productList");
const productPopup = document.getElementById("productPopup");
const productPopupContent = document.getElementById("productPopupContent");

const qrPopup = document.getElementById("qrPopup");
const qrContent = document.getElementById("qrContent");

let products = [];

(async () => {
    products = await fetchProducts();
    
    renderProducts();
})();


adminBtn.addEventListener("click", () => {
    vitrinePage.classList.add("hidden");
    adminPage.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    adminPage.classList.add("hidden");
    vitrinePage.classList.remove("hidden");
});

function fetchFormData() {
    return {
        title: window.document.getElementById("title").value,
        description: window.document.getElementById("description").value,
        price: window.document.getElementById("price").value,
        imgInput: window.document.getElementById("image"),
    }
}

// TODO
async function addProduct(imageUrl) {
    
}

// TODO
async function renderProducts() {
    
}

// TODO
async function startPurchase(prodId) {
    
}

window.document.getElementById("adminForm").addEventListener("submit", (evt) => {
    evt.preventDefault();

    const { imgInput } = fetchFormData();

    if (imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = () => addProduct(reader.result);
        reader.readAsDataURL(imgInput.files[0]);
    } else {
        addProduct("https://placehold.co/400");
    }
});

function formatarPreco(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function openProductPopup(product) {
    productPopupContent.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto; border-radius: 20px;" />
        <h2>${product.title}</h2>
        <div style="display: flex; justify-content: space-between; gap: 20px; overflow-wrap: anywhere;">
            <p style="flex: 1; text-align: justify;">${product.description}</p>
            <div>
                <p><strong>${formatarPreco(product.price)}</strong></p>
            </div>
        </div>
        <div id="btn-comprar-div-${product.id}" style="margin-top: 5px;">
            <!-- <button class="buy-button" onclick="() => startPurchase()">Comprar</button> -->
        </div>
    `;

    const divBtnBuy = window.document.querySelector(`#btn-comprar-div-${product.id}`);
    
    const btnBuy = window.document.createElement("button");
    btnBuy.addEventListener("click", () => startPurchase(product.id));
    btnBuy.innerHTML = "Comprar";
    btnBuy.classList.add("buy-button");

    divBtnBuy.appendChild(btnBuy);

    productPopup.classList.remove("hidden");
}

// Fechar popups ao clicar fora
window.addEventListener("click", (evt) => {
    if (evt.target === productPopup) {
        productPopup.classList.add("hidden");
    } else if (evt.target === qrPopup) {
        qrPopup.classList.add("hidden");
        productPopup.classList.remove("hidden");
    }
});

export { startPurchase, openProductPopup };
