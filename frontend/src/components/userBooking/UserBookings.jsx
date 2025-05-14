import { Fragment, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { userBookings as userBookingsAction } from '../../actions/bookingActions'
import { Link } from 'react-router-dom'

export default function UserBookings() {
    const { userBookings = [] } = useSelector(state => state.bookingState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userBookingsAction())
    }, [dispatch])

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: "Booking ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Services",
                    field: 'numOfServices',
                    sort: "asc"
                },
                {
                    label: "Amount (LKR)",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows: []
        }

        userBookings.forEach(booking => {
            data.rows.push({
                id: booking._id,
                numOfServices: booking.bookServices.length,
                amount: `Rs. ${booking.amount.toFixed(2)}`,
                status: (
                    <p style={{ color: 
                        booking.bookingStatus === 'Completed' ? 'green' :
                        booking.bookingStatus === 'On going' ? 'orange' : 'red' 
                    }}>
                        {booking.bookingStatus}
                    </p>
                ),
                actions: (
                    <Link to={`/booking/${booking._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i>
                    </Link>
                )
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title="My Bookings" />
            <h1 className='mt-5'>My Bookings</h1> 
            <MDBDataTable
                className='px-3'
                bordered
                striped
                hover
                data={setBookings()}
            />
        </Fragment>
    )
}
