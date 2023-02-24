import { RootState } from './../store';
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { TCustomer } from '../../types/types';
import axios, { AxiosError } from 'axios';

interface ICustomersSlice {
  customers: TCustomer[];
  status: string;
}

export const fetchAllCustomers = createAsyncThunk<
  TCustomer[],
  undefined,
  { rejectValue: string }
>('customers/fetchAllCustomers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<TCustomer[]>(
      'https://630fb35336e6a2a04ee0239b.mockapi.io/users',
    );
    if (data) {
      return data;
    } else {
      throw new Error('error');
    }
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const fetchDeleteCustomer = createAsyncThunk<
  TCustomer,
  number,
  { rejectValue: string }
>(
  'customers/fetchDeleteCustomer',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data, status } = await axios.delete<TCustomer>(
        `https://630fb35336e6a2a04ee0239b.mockapi.io/users/${id}`,
      );
      if (status !== 200) {
        throw new Error('error');
      } else {
        dispatch(fetchAllCustomers());
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  },
);

export const fetchPostCustomer = createAsyncThunk<
  TCustomer,
  string | null,
  { rejectValue: string }
>(
  'customers/fetchPostCustomer',
  async (text, { rejectWithValue, dispatch }) => {
    try {
      const { data, status } = await axios.post<TCustomer>(
        `https://630fb35336e6a2a04ee0239b.mockapi.io/users`,
        {
          name: text,
        },
      );
      if (status !== 201) {
        throw new Error('error');
      } else {
        dispatch(fetchAllCustomers());
        return data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  },
);

const initialState: ICustomersSlice = {
  customers: [],
  status: 'loading' || 'error' || 'success',
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllCustomers.fulfilled,
        (state, action: PayloadAction<TCustomer[]>) => {
          state.customers = action.payload;
          state.status = 'success';
        },
      )
      .addCase(fetchDeleteCustomer.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(fetchPostCustomer.fulfilled, (state) => {
        state.status = 'success';
      })
      .addMatcher(isError, (state, action: PayloadAction<string | unknown>) => {
        state.status = 'error';
        console.log(action.payload);
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

export const selectCustomers = (state: RootState) => state.customers;

export default customersSlice.reducer;
