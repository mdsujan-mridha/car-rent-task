


import PropTypes from 'prop-types';

const BillSummary = ({ firstName }) => {
    return (
        <div>
            <p className="font-bold text-gray-800">Bill to :</p>
            <p className="text-gray-500">
                {firstName}.
                <br />
                102, San-Francisco, CA, USA
            </p>
            <p className="text-gray-500">info@laravel.com</p>
        </div>
    );
};

BillSummary.propTypes = {
    firstName: PropTypes.string.isRequired
};

export default BillSummary;

