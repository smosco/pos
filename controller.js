import { addToCart, selectTable, updateQuantity, checkout } from './model.js';
import { updateDOM, updateTableDisplay } from './view.js';

// 테이블 선택시 데이터 로직 처리 후 UI 업데이트
document.querySelectorAll('.table-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const tableNumber = parseInt(e.target.innerText);
    selectTable(tableNumber);
    updateTableDisplay();
    updateDOM();
  });
});

// 장바구니에 상품 추가
document.querySelectorAll('.add-product-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const menu = e.target.dataset.name;
    const price = Number(e.target.dataset.price);

    addToCart(menu, price);
    updateDOM();
  });
});

// 장바구니 수량 변경 이벤트 처리
export function addEventListenersToCart() {
  document.querySelectorAll('.decrease-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const product = e.target.getAttribute('data-product');
      updateQuantity(product, -1);
      updateDOM();
    });
  });

  document.querySelectorAll('.increase-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const product = e.target.getAttribute('data-product');
      updateQuantity(product, 1);
      updateDOM();
    });
  });
}

// 결제
document.querySelector('.checkout-btn').addEventListener('click', () => {
  checkout();
  updateDOM();
});
