// ===============================
// INSTAORDERLY – INVOICE LOGIC
// ===============================

let products = [];

document.addEventListener("DOMContentLoaded", () => {
  const addProductBtn = document.getElementById("addProductBtn");
  const generateBtn = document.getElementById("generateInvoiceBtn");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const pdfBtn = document.getElementById("pdfBtn");

  const productContainer = document.getElementById("productList");
  const invoiceBox = document.getElementById("invoiceBox");
  const invoiceProducts = document.getElementById("invoiceProducts");
  const totalAmountEl = document.getElementById("totalAmount");

  invoiceBox.style.display = "none";

  // ➕ Add Product
  addProductBtn.addEventListener("click", () => {
    const name = prompt("Product name?");
    const price = prompt("Product price?");
    const qty = prompt("Quantity?");

    if (!name || !price || !qty) return alert("All fields required");

    const product = {
      name,
      price: Number(price),
      qty: Number(qty),
      total: Number(price) * Number(qty)
    };

    products.push(product);

    const div = document.createElement("div");
    div.innerHTML = ${product.name} — Rs ${product.price} × ${product.qty};
    productContainer.appendChild(div);
  });

  // 🧾 Generate Invoice
  generateBtn.addEventListener("click", () => {
    if (products.length === 0) {
      alert("Add at least one product");
      return;
    }

    invoiceProducts.innerHTML = "";
    let grandTotal = 0;

    products.forEach(p => {
      const row = document.createElement("div");
      row.innerText = ${p.name} | Rs ${p.price} × ${p.qty} = Rs ${p.total};
      invoiceProducts.appendChild(row);
      grandTotal += p.total;
    });

    totalAmountEl.innerText = "Rs " + grandTotal;
    invoiceBox.style.display = "block";
  });

  // 📲 WhatsApp Share
  whatsappBtn.addEventListener("click", () => {
    let text = "Invoice Details:%0A";

    products.forEach(p => {
      text += ${p.name} - Rs ${p.total}%0A;
    });

    text += %0ATotal: Rs ${totalAmountEl.innerText};

    window.open(https://wa.me/?text=${text}, "_blank");
  });

  // 📄 PDF Download
  pdfBtn.addEventListener("click", () => {
    const element = document.getElementById("invoiceBox");
    html2pdf().from(element).save("invoice.pdf");
  });
});
