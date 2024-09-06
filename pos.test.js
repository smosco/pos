import { addToCart, selectTable, tables, selectedTable } from './model.js';

beforeEach(() => {
  // 각 테스트가 실행되기 전에 테이블 상태 초기화
  // model.js에서 export한 tables를 사용
  for (const key in tables) {
    delete tables[key]; // tables 객체를 비웁니다
  }
  selectTable(1); // 테이블 1 선택
});

test('addToCart adds a new product to the cart', () => {
  addToCart('Burger', 10);
  console.log(tables);

  expect(tables[1].cart['Burger'].qty).toBe(1);
  expect(tables[1].totalPrice).toBe(10);
});

test('addToCart increases quantity for the same product', () => {
  addToCart('Burger', 10);
  addToCart('Burger', 10);

  expect(tables[1].cart['Burger'].qty).toBe(2);
  expect(tables[1].cart['Burger'].totalPrice).toBe(20);
  expect(tables[1].totalPrice).toBe(20);
});
