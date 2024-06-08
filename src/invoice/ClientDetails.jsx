
import React from 'react';

const ClientDetails = ({ firstName, lastName, email, phone, reservationId, returnDate }) => {

    const date = new Date().toJSON().slice(0, 10);
    // console.log(date);
    // console.log(returnDate().toJSON().slice(0, 16))

    return (
        <>
            <div>
                <p className="font-bold text-gray-800">
                    Bill to :
                </p>
                <p className="text-gray-500">
                    {firstName} {lastName}.
                    <br />
                    {phone}
                </p>
                <p className="text-gray-500">
                    {email}
                </p>
            </div>

            <div className="text-right">
                <p className="">
                    Invoice number:
                    <span className="text-gray-500">INV-#{reservationId}</span>
                </p>
                <p>
                    Invoice date: <span className="text-gray-500">{date}</span>
                    <br />
                    Due date:<span className="text-gray-500">{returnDate}</span>
                </p>
            </div>
        </>
    );
};

export default ClientDetails;