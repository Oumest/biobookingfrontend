import { BACKEND_LINK, BACKEND_BOOKING} from '../../helpers/const'

export const bookingService={
    bookingWithoutAccount,
    bookinWithAccount
    
};

async function bookingWithoutAccount(email, bookingForDate, row, seatNumber, loungeId){
    const URL = BACKEND_LINK + BACKEND_BOOKING
    const data = {
        "Email" : email,
        "BookingForDate" : bookingForDate,
        "RowNumber" : row,
        "SeatNumber" : seatNumber,
        "LoungeId" : loungeId
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    console.log(data)
    var response = await fetch(URL, requestOptions).then(handleResponse)
    return response;
}

async function bookinWithAccount(bookingForDate, row, seatNumber, loungeId){
    const data = {
        "Email" : localStorage.user.email, // or user tokken? For that backend needs to send back user token on login
        "BookingForDate" : bookingForDate,
        "RowNumber" : row,
        "SeatNumber" : seatNumber,
        "LoungeId" : loungeId
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(data)
    }
    var response = await fetch(`http://localhost:50610/Bookings/CustomerBookings`, requestOptions).then(handleResponse)
    return response;
}

function handleResponse(response) {
    console.log(response)
    const seatTaken = "That seat is taken!"
    const failedBooking = "Could not make booking!"
    const bookingMade = "Booking completed!"

    return response.text().then(text => {
        var data = text;
        if (data.text === seatTaken) {          
            return seatTaken;
        }
        else if(data.text === failedBooking){
            return failedBooking;
        }
        else if(data.text === bookingMade){
            return bookingMade;
        }       
    });
}
