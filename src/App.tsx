import { useEffect } from 'react';
import styled from 'styled-components';
import { addCash, getCash, selectCash } from './redux/slices/cashSlice';
import {
  selectCustomers,
  fetchAllCustomers,
  fetchDeleteCustomer,
  fetchPostCustomer,
} from './redux/slices/customersSlice';
import { useAppDispatch, useAppSelector } from './redux/store';
import { TCustomer } from './types/types';

const Button = styled.button`
  font-size: 17px;
  padding: 5px;
  & + & {
    margin-left: 15px;
  }
`;

const Title = styled.h3`
  font-size: 30px;
`;

const Div = styled.div`
  padding: 5px;
  display: flex;
`;

const App: React.FC = () => {
  const { cash } = useAppSelector(selectCash);
  const { customers } = useAppSelector(selectCustomers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  return (
    <div style={{ padding: '15%' }}>
      <Title>Cash: {cash} </Title>
      <Div>
        <Button onClick={() => dispatch(addCash(Number(prompt())))}>
          Положить на счет
        </Button>
        <Button onClick={() => dispatch(getCash(Number(prompt())))}>
          Снять со счета
        </Button>
        <Button onClick={() => dispatch(fetchPostCustomer(prompt()))}>
          Добавить клиента
        </Button>
        <Button onClick={() => dispatch(fetchAllCustomers())}>
          Получить клиентов из базы
        </Button>
        <Button onClick={() => dispatch(fetchDeleteCustomer(Number(prompt())))}>
          Удалить пользователя по айди
        </Button>
      </Div>
      <Div>
        {customers.length > 0 ? (
          <Div style={{ flexWrap: 'wrap' }}>
            {customers.map((customer: TCustomer) => (
              <Div
                key={customer.id}
                style={{
                  fontSize: '18px',
                  border: '1px solid black',
                  marginLeft: '5px',
                }}>
                {customer.name}
              </Div>
            ))}
          </Div>
        ) : (
          <Div style={{ fontSize: '20px' }}>Клиенты отсутствуют</Div>
        )}
      </Div>
    </div>
  );
};

export default App;
