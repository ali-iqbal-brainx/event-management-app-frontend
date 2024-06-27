import React, { useState, useEffect, useContext } from 'react';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList/BookingList';

const BookingsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const context = useContext(AuthContext);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        setIsLoading(true);
        const requestBody = {
            query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
             }
            }
          }
        `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'access_token': 'Bearer ' + context.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                const bookings = resData.data.bookings;
                setBookings(bookings);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };

    const deleteBookingHandler = bookingId => {
        setIsLoading(true);
        const requestBody = {
            query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
            _id
             title
            }
          }
        `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'access_token': 'Bearer ' + context.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json();
            })
            .then(resData => {
                setBookings(prevBookings => {
                    const updatedBookings = prevBookings.filter(booking => booking._id !== bookingId);
                    return updatedBookings;
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <BookingList
                    bookings={bookings}
                    onDelete={deleteBookingHandler}
                />
            )}
        </React.Fragment>
    );
};

export default BookingsPage;
