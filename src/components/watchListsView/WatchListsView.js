import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Container, Row, Col } from 'react-bootstrap';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';

const WatchListView = () => {
  const [watchlists, setWatchlists] = useState([]);
  const { user } = useUser();

  const id = user?.id;

  useEffect(() => {

    async function fetchWatchlists() {
      try {
        const response = await api.get(`/api/v1/watchLists/${id}`); 
        setWatchlists(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWatchlists();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
        <br/>
          <h3>My WatchLists</h3>
          <br/>
          <br/>
        </Col>
      </Row>
      {watchlists.map((movie, index) => (
        <div key={index}>
          <Row>
            <Col>Movie Name: {movie.movieName}</Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default WatchListView;
