import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from '@mui/material';

import React from 'react';
import { useUser } from '@clerk/clerk-react';

const WatchLists = ({ getMovieData, movie, WatchLists, setWatchLists }) => { 

    [WatchLists, setWatchLists] = useState([]);

    const movieName = movie?.title; 
    let params = useParams();
    
    const movieId = params.movieId;

    const { user } = useUser();

    const userEmail = (user?.emailAddresses?.[0]).emailAddress;
    const clerkId = user?.id;


    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addToWatchList = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/v1/watchLists", {
              movieName,
              movieId,
              userEmail,
              clerkId,


            });

            const updatedWatchLists = [...WatchLists, { movieName, movieId, userEmail, clerkId }];

            setWatchLists(updatedWatchLists);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>WatchLists</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <Button onClick={addToWatchList}>
                                        Add to Watchlist
                                </Button>    
                             </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        WatchLists?.map((WatchLists, index) => (
                            <div key={index}>
                                <Row>
                                    <Col>Movie Name: {WatchLists.movieName}</Col>
                                </Row>
                                <Row>
                                    <Col>Movie ID: {WatchLists.movieId}</Col>
                                </Row>
                                <Row>
                                    <Col>User Email: {WatchLists.userEmail}</Col>
                                </Row>
                                <Row>
                                    <Col>Clerk ID: {WatchLists.clerkId}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </div>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default WatchLists;
