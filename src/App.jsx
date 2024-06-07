
import { useEffect, useState } from 'react';
import './App.css'
import { useGetCarsQuery } from './redux/api';


function App() {

  const [cars, setCars] = useState([]);

  const { data, error, isLoading } = useGetCarsQuery();



  useEffect(() => {

    if (data) {
      setCars(data.data)
    }

  }, [data]);

  console.log(cars);

  return (
    <>
      <div className="p-4 sm:p-10">
        <div className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-lg">
          <div className='flex justify-between items-center py-5'>
            <h1 className="text-2xl font-bold mb-6">Reservation</h1>
            <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Print / Download</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reservation Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Reservation Details</h2>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1" htmlFor="reservationId">Reservation ID</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="text" id="reservationId" />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="pickupDate">Pickup Date*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="datetime-local" id="pickupDate" required />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="returnDate">Return Date*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="datetime-local" id="returnDate" required />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="duration">Duration</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="text" id="duration" />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="discount">Discount</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="number" id="discount" />
                </div>
              </form>
              <div className='py-5'>
                <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Reservation Details</h2>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Customer Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1" htmlFor="firstName">First Name*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="text" id="firstName" required />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="lastName">Last Name*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="text" id="lastName" required />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="email">Email*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="email" id="email" required />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="phone">Phone*</label>
                  <input className="w-full border border-gray-300 p-2 rounded" type="tel" id="phone" required />
                </div>
              </form>
              <h2 className="text-lg font-semibold mt-6 mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Additional Charges</h2>
              <form className="space-y-4">
                <div>
                  <input type="checkbox" id="collisionDamageWaiver" />
                  <label className="ml-2" htmlFor="collisionDamageWaiver">Collision Damage Waiver $9.00</label>
                </div>
                <div>
                  <input type="checkbox" id="liabilityInsurance" />
                  <label className="ml-2" htmlFor="liabilityInsurance">Liability Insurance $15.00</label>
                </div>
                <div>
                  <input type="checkbox" id="rentalTax" />
                  <label className="ml-2" htmlFor="rentalTax">Rental Tax 11.5%</label>
                </div>
              </form>
            </div>

            {/* Charges Summary */}
            <div>
              <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Charges Summary</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="pb-2">Charge</th>
                      <th className="pb-2">Unit</th>
                      <th className="pb-2">Rate</th>
                      <th className="pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Daily</td>
                      <td>1</td>
                      <td>$99.00</td>
                      <td>$99.00</td>
                    </tr>
                    <tr>
                      <td>Weekly</td>
                      <td>1</td>
                      <td>$390.00</td>
                      <td>$390.00</td>
                    </tr>
                    <tr>
                      <td>Collision Damage Waiver</td>
                      <td></td>
                      <td>$9.00</td>
                      <td>$9.00</td>
                    </tr>
                    <tr className="font-semibold">
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td>$498.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
