import React from 'react';

const Table = ({ selectedCar, additional, discount, baseRate, totalRate }) => {
    return (
        <table className="min-w-full">
            <colgroup>
                <col className="w-full sm:w-1/2" />
                <col className="sm:w-1/6" />
                <col className="sm:w-1/6" />
                <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Charge</th>
                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Unit</th>
                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Rate</th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-gray-200">
                    <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="font-medium text-gray-900">{selectedCar?.make}</div>
                        <div className="mt-1 truncate text-gray-500">{selectedCar?.model},{selectedCar?.type}</div>
                    </td>
                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">1</td>
                    <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell"> {baseRate} </td>
                    <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">{baseRate}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
                    <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">{baseRate}</td>
                </tr>
                <tr>
                    <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Additional</th>
                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Additional</th>
                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">{additional}</td>
                </tr>
                <tr>
                    <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount</th>
                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">{discount}</td>
                </tr>
                <tr>
                    <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">{totalRate}</td>
                </tr>
            </tfoot>
        </table>
    );
};

export default Table;