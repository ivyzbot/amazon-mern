import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHook';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import Rating from '../components/Rating';

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img className="large" src={product.image} alt={product.name}></img>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroupItem>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </ListGroupItem>
          <ListGroupItem>Price: ${product.price}</ListGroupItem>
          <ListGroupItem>
            Description:
            <p>{product.description}</p>
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <div className="d-grid">
                    <Button variant="primary">Add to Cart</Button>
                  </div>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
