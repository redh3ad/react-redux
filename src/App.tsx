import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useGetUsersQuery,
  usePostUserMutation,
  useDeleteUserMutation,
} from './redux/usersApi';
import { addCash, getCash, selectCash } from './redux/slices/cashSlice';
import {
  selectCustomers,
  fetchAllCustomers,
  fetchDeleteCustomer,
  fetchPostCustomer,
} from './redux/slices/customersSlice';
import { useAppDispatch, useAppSelector } from './redux/store';
import { TCustomer, TUser } from './types/types';

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

  const [count, setCount] = useState('');
  const { data = [], error, isLoading } = useGetUsersQuery(count);
  const [postUser, { isError }] = usePostUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handlePostUser = async () => {
    const userName = prompt();
    if (userName) {
      const user = {
        name: userName,
      };
      await postUser(user).unwrap();
    }
  };

  // useEffect(() => {
  //   dispatch(fetchAllCustomers());
  // }, [dispatch]);

  if (isLoading) return <Div>Loading...</Div>;
  if (error) return <Div>Error</Div>;

  return (
    <div style={{ padding: '15%' }}>
      {/* <Title>Cash: {cash} </Title>
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
      </Div> */}
      {/* <Div>
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
      </Div> */}
      <Button onClick={() => handlePostUser()}>Добавить пользователя</Button>
      <Div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value=''>all</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
          <option value='25'>25</option>
        </select>
      </Div>
      <Div>
        {data.length > 0 ? (
          <Div
            style={{
              flexWrap: 'wrap',
              maxWidth: '450px',
            }}>
            {data.map((user: TUser) => (
              <Div
                onClick={async () => await deleteUser(user.id)}
                key={user.id}
                style={{
                  fontSize: '18px',
                  border: '1px solid black',
                  marginLeft: '5px',
                  marginTop: '5px',
                }}>
                {user.name}
              </Div>
            ))}
          </Div>
        ) : (
          <Div style={{ fontSize: '20px' }}>Клиенты отсутствуют 2</Div>
        )}
      </Div>
    </div>
  );
};

export default App;
