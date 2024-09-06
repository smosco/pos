import { tables, selectedTable } from './model.js';
import { addEventListenersToCart } from './controller.js';

export function updateDOM() {
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');
  cartList.innerHTML = ''; // 기존 주문 내역 초기화

  const tableData = tables[selectedTable];

  for (const product in tableData.cart) {
    const item = tableData.cart[product];
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${product} - ${item.price}원
        <button class="decrease-btn">-</button>
        ${item.qty}
        <button class="increase-btn">+</button>
      `;
    cartList.appendChild(listItem);
  }

  totalPriceElement.textContent = tableData.totalPrice;

  // 버튼에 이벤트 리스너 추가 (Controller에서 처리)
  addEventListenersToCart();
}

export function updateTableDisplay() {
  document.getElementById('table-display').textContent = selectedTable;
}
