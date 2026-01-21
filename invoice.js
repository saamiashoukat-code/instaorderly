let products = [];

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = Number(document.getElementById("productPrice").value);
  const qty = Number(document.getElementById("productQty").value);

  if (!name || !price || !qty) {
    alert("Please fill product name, price and quantity");
    return;
  }

  products.push({
    name: name,
    price: price,
    qty: qty
  });

  // clear inputs
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQty").value = "";
}

  products.push({ name, price, qty });
  alert("Product added");
}

function generateInvoice() {
  document.getElementById("iName").innerText =
    document.getElementById("customerName").value;

  document.getElementById("iContact").innerText =
    document.getElementById("customerContact").value;

  document.getElementById("iAddress").innerText =
    document.getElementById("customerAddress").value;

  document.getElementById("iPayment").innerText =
    document.getElementById("paymentMethod").value;

  const invoiceBody = document.getElementById("invoiceBody");
  const grandTotal = document.getElementById("grandTotal");

  invoiceBody.innerHTML = "";
  let total = 0;

  products.forEach(p => {
    const t = p.price * p.qty;
    total += t;

    invoiceBody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.qty}</td>
        <td>${t}</td>
      </tr>
    `;
  });

  grandTotal.innerText = total;
}

function downloadPDF() {
  html2pdf().from(document.getElementById("invoice")).save("invoice.pdf");
}

function shareWhatsApp() {
  const msg =
    "Invoice for " +
    document.getElementById("customerName").value +
    "\nTotal: Rs " +
    document.getElementById("grandTotal").innerText;

  window.open(
    "https://wa.me/?text=" + encodeURIComponent(msg),
    "_blank"
  );
}
