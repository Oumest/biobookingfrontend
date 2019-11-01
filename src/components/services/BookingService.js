
export const bookingService={
    bookingWithoutAccount
    
};

async function bookingWithoutAccount(email, bookingForDate, row, seatNumber, loungeId){
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
    var response = await fetch(`http://localhost:50610/Bookings/CustomerBookings`, requestOptions).then(handleResponse)
    return response;
}
function handleResponse(response) {
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
