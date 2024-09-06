// 테이블 별로 주문 상태 저장할 객체
let tables = {};
let selectedTable = null;

const selectTable = (tableNumber) => {
  selectedTable = tableNumber;
  document.getElementById('table-display').textContent = selectedTable;

  if (!tables[selectedTable]) {
    // 처음 선택된 테이블이라면 해당 테이블의 주문 상태 초기화
    tables[selectedTable] = { cart: [], totalPrice: 0 };
  }

  //  선택된 테이블의 주문 내역을 업데이트하여 화면에 표시
};

const addToCart = (product, price) => {
  if (!selectedTable) {
    alert('테이블을 선택해주세요');
    return;
  }

  //   선택된 테이블의 주문에 항목 추가
  tables[selectedTable].cart.push({ product, price });
  tables[selectedTable].totalPrice += price;

  console.log(selectedTable, tables);

  //  선택된 테이블의 주문 내역을 업데이트하여 화면에 표시
  updateCart();
};

const updateCart = () => {
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');
  //   기존 주문 내역 초기화
  cartList.innerHTML = '';

  const tableData = tables[selectedTable];
  console.log(tableData);

  if (tableData) {
    // 선택된 테이블의 주문 내역의 표시
    tableData.cart.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.product}-${item.price}`;
      cartList.appendChild(listItem);
    });

    // 총 금액 업데이트
    totalPriceElement.textContent = tableData.totalPrice;
  } else {
    totalPriceElement.textContent = '0';
  }
};

const checkout = () => {
  if (!selectedTable || tables[selectedTable].cart.length === 0) {
    alert('아직 주문 내역이 없어요!');
    return;
  }

  document.getElementById(
    'checkout-message'
  ).textContent = `${selectedTable} 테이블 결제가 완료되었습니다.`;

  //   결제 후 선택된 테이블의 주문 내역 초기화
  tables[selectedTable] = { cart: [], totalPrice: 0 };
  updateCart();
};
