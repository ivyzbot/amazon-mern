// import { useReducer, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { Product } from '../types/Product';
// import { getError } from '../utils';
// import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductItem from '../components/ProductItem';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '../hooks/productHook';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';

// type State = {
//   products: Product[];
//   loading: boolean;
//   error: string;
// };

// type Action =
//   | { type: 'FETCH_REQUEST' }
//   | { type: 'FETCH_SUCCESS'; payload: Product[] }
//   | { type: 'FETCH_FAIL'; payload: string };

// const initialState: State = {
//   products: [
//     {
//       name: 'aNike Slim shirtaaaaaaaa',
//       slug: 'nike-slim-shirt',
//       category: 'Shirts',
//       image: '../images/p1.jpg',
//       price: 120,
//       countInStock: 10,
//       brand: 'Nike',
//       rating: 4.5,
//       numReviews: 10,
//       description: 'high quality shirt',
//     },
//   ],
//   loading: true,
//   error: '',
// };

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, products: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//   }
// };

export default function HomePage() {
  //rename data to products
  const { data: products, isLoading, error } = useGetProductsQuery();
  // const [{ loading, error, products }, dispatch] = useReducer<
  //   React.Reducer<State, Action>
  // >(reducer, initialState);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const result = await axios.get('/api/products');
  //       console.log(1);
  //       dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
  //     } catch (err) {
  //       console.log(2);
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) });
  //     }
  //   };
  //   fetchData();
  // }, []);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>TS Amazon</title>
      </Helmet>
      {products!.map((product) => (
        // responsive design
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product}></ProductItem>
        </Col>
      ))}
    </Row>
  );
}
