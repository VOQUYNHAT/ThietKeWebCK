document.addEventListener("DOMContentLoaded", function(){

    // ===== Giỏ hàng =====
    let cart = [];
    const bookPrice = 120000;

    const addBtn = document.getElementById("addToCartBtn");
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");

    addBtn.addEventListener("click", function(){
        cart.push({ name: "Lập Trình Web Hiện Đại", price: bookPrice });
        renderCart();
    });

    function renderCart(){
        cartList.innerHTML = "";
        let total = 0;
        cart.forEach((item, index)=>{
            total += item.price;
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `<span>${item.name} - ${item.price.toLocaleString()} đ</span>
                             <button class='remove-btn'>Xóa</button>`;
            div.querySelector(".remove-btn").addEventListener("click", function(){ removeItem(index); });
            cartList.appendChild(div);
        });
        totalPrice.innerText = total.toLocaleString() + " đ";
    }

    function removeItem(index){
        cart.splice(index,1);
        renderCart();
    }

    document.getElementById("checkoutBtn").addEventListener("click", function(){
        if(cart.length === 0){ alert("Giỏ hàng đang trống!"); return; }
        document.getElementById("name").scrollIntoView({behavior:"smooth"});
    });

    // ===== Thanh toán =====
    const methodSelect = document.getElementById("method");
    const cardInfo = document.getElementById("cardInfo");
    const qrInfo = document.getElementById("qrInfo");
    const payBtn = document.getElementById("payBtn");
    const paymentMessage = document.getElementById("paymentMessage");

    methodSelect.addEventListener("change", function(){
        cardInfo.classList.toggle("hidden", this.value !== "card");
        qrInfo.classList.toggle("hidden", this.value !== "QR");
    });

    payBtn.addEventListener("click", function(){
        const name = document.getElementById("name").value.trim();
        const method = methodSelect.value;

        paymentMessage.innerText = "";
        paymentMessage.style.color = "";

        if(name === "") { alert("Vui lòng nhập họ và tên"); return; }
        if(cart.length === 0){ alert("Giỏ hàng đang trống!"); return; }

        if(method === "card"){
            const cardNumber = document.getElementById("cardNumber").value;
            const cardExpiry = document.getElementById("cardExpiry").value;
            const cardCVV = document.getElementById("cardCVV").value;

            if(cardNumber.length !== 16 || isNaN(cardNumber)) { alert("Số thẻ phải gồm 16 chữ số"); return; }
            if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) { alert("Ngày hết hạn không hợp lệ (MM/YY)"); return; }
            if(cardCVV.length !== 3 || isNaN(cardCVV)) { alert("CVV phải gồm 3 số"); return; }
        }

        paymentMessage.innerText = `Cảm ơn ${name}! Thanh toán thành công bằng ${method === "QR" ? "Mã QR" : method === "card" ? "Thẻ ngân hàng" : method}.`;
        paymentMessage.style.color = "#27ae60";

        // Reset giỏ hàng
        cart = [];
        renderCart();

        // Reset form
        document.getElementById("name").value = "";
        document.getElementById("cardNumber").value = "";
        document.getElementById("cardExpiry").value = "";
        document.getElementById("cardCVV").value = "";
        methodSelect.value = "COD";
        cardInfo.classList.add("hidden");
        qrInfo.classList.add("hidden");
    });
});
