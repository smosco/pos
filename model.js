export let tables = {}; // 테이블별 주문 데이터를 저장할 객체
export let selectedTable = null;

export function selectTable(tableNumber) {
  selectedTable = tableNumber;

  if (!tables[selectedTable]) {
    tables[selectedTable] = { cart: {}, totalPrice: 0 };
  }
}

export function addToCart(product, price) {
  if (!selectedTable) {
    console.log('테이블을 선택해주세요.');
    return;
  }

  const tableData = tables[selectedTable];

  if (tableData.cart[product]) {
    tableData.cart[product].qty += 1;
    tableData.cart[product].totalPrice += price;
  } else {
    tableData.cart[product] = { price, qty: 1, totalPrice: price };
  }

  tableData.totalPrice += price;
}

export function updateQuantity(product, change) {
  const tableData = tables[selectedTable];
  const item = tableData.cart[product];

  item.qty += change;
  item.totalPrice += item.price * change;
  tableData.totalPrice += item.price * change;

  if (item.qty <= 0) {
    delete tableData.cart[product];
  }
}

export function checkout() {
  if (!selectedTable || Object.keys(tables[selectedTable].cart).length === 0) {
    console.log('주문 내역이 없어요!');
    return;
  }

  console.log(`${selectedTable}번 테이블 결제가 완료되었습니다.`);
  tables[selectedTable] = { cart: {}, totalPrice: 0 };
}
