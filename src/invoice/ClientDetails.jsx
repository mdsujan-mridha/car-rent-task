import React from 'react';

const ClientDetails = ({ firstName, lastName, email, phone }) => {
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
                    <span className="text-gray-500">INV-2023786123</span>
                </p>
                <p>
                    Invoice date: <span className="text-gray-500">03/07/2023</span>
                    <br />
                    Due date:<span className="text-gray-500">31/07/2023</span>
                </p>
            </div>
        </>
    );
};

export default ClientDetails;