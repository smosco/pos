let tables = {}; // 테이블별 주문 데이터를 저장할 객체
let selectedTable = null;

function selectTable(tableNumber) {
  selectedTable = tableNumber;
  document.getElementById('table-display').textContent = selectedTable;

  if (!tables[selectedTable]) {
    // 선택된 테이블이 처음 선택되었을 경우 초기화
    tables[selectedTable] = { cart: {}, totalPrice: 0 };
  }

  updateCart();
}

function addToCart(product, price) {
  if (!selectedTable) {
    alert('Please select a table.');
    return;
  }

  const tableData = tables[selectedTable];

  // 같은 메뉴가 이미 있을 경우 개수 증가
  if (tableData.cart[product]) {
    tableData.cart[product].qty += 1;
    tableData.cart[product].totalPrice += price;
  } else {
    // 새로운 메뉴를 추가할 경우
    tableData.cart[product] = { price, qty: 1, totalPrice: price };
  }

  tableData.totalPrice += price;

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');
  cartList.innerHTML = ''; // 기존 주문 내역 초기화

  const tableData = tables[selectedTable];

  // 테이블의 주문 목록을 화면에 표시
  for (const product in tableData.cart) {
    const item = tableData.cart[product];

    const listItem = document.createElement('li');
    listItem.innerHTML = `
            ${product} - $${item.price} x ${item.qty} = $${item.totalPrice}
            <button onclick="updateQuantity('${product}', -1)">-</button>
            <button onclick="updateQuantity('${product}', 1)">+</button>
        `;
    cartList.appendChild(listItem);
  }

  totalPriceElement.textContent = tableData.totalPrice;
}

function updateQuantity(product, change) {
  const tableData = tables[selectedTable];
  const item = tableData.cart[product];

  // 개수 변경 및 가격 업데이트
  item.qty += change;
  item.totalPrice += item.price * change;
  tableData.totalPrice += item.price * change;

  // 개수가 0 이하가 되면 메뉴 삭제
  if (item.qty <= 0) {
    delete tableData.cart[product];
  }

  updateCart();
}

function checkout() {
  if (!selectedTable || Object.keys(tables[selectedTable].cart).length === 0) {
    alert('주문 내역이 없어요!');
    return;
  }

  document.getElementById(
    'checkout-message'
  ).textContent = `${selectedTable}번 테이블 결제가 완료되었습니다.`;

  // 결제 후 선택된 테이블의 주문 내역 초기화
  tables[selectedTable] = { cart: {}, totalPrice: 0 };
  updateCart();
}
