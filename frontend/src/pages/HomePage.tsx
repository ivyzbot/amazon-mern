import { Col, Row } from 'react-bootstrap';
import { sampleProducts } from '../assets/data';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Row>
      {sampleProducts.map((product) => (
        // responsive design
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={`/product/${product.slug}`}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
