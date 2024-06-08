import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useGetCarsQuery } from './redux/api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './component/Loader';
import { useReactToPrint } from 'react-to-print';
import Header from './invoice/Header';
import ClientDetails from './invoice/ClientDetails';
import Table from './invoice/Table';

function App() {
  const [previewInvoice, setPreviewInvoice] = useState(false);
  const [cars, setCars] = useState([]);
  const { data, error, isLoading } = useGetCarsQuery();
  const [selectedCarType, setSelectedCarType] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [additionalCharges, setAdditionalCharges] = useState({
    collisionDamageWaiver: false,
    liabilityInsurance: false,
    rentalTax: false,
  });
  const [additional, setAdditional] = useState(0); // Correct initialization
  // customer information 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Reservation Details
  const [reservationId, setReservationId] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().slice(0, 16)); // Current date and time in 'yyyy-MM-ddTHH:mm' format
  const [returnDate, setReturnDate] = useState(new Date().toISOString().slice(0, 16));
  const [discount, setDiscount] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const [week, setWeek] = useState(0);
  const [baseRate, setBaseRate] = useState(0); // New state for base rate
  const [totalRate, setTotalRate] = useState(0); // New state for total rate



  // use ref for read body data 
  const contentToPrint = useRef();

  useEffect(() => {
    if (data) {
      setCars(data.data);
    }
    if (error) {
      toast.error(`Error: ${error.status} - ${error.originalStatus}`);
    }
    if (data?.message) {
      toast.success(data.message);
    }
  }, [data, error]);

  // Log the additionalCharges whenever it changes
  useEffect(() => {
    const totalAdditionalCharges =
      (additionalCharges.collisionDamageWaiver ? 9.00 : 0) +
      (additionalCharges.liabilityInsurance ? 15.00 : 0) +
      (additionalCharges.rentalTax ? (baseRate * 0.115) : 0);
    // console.log('Total Additional Charges:', totalAdditionalCharges);
    setAdditional(totalAdditionalCharges);
  }, [additionalCharges, baseRate]);

  // this function is for handle which car is selected 
  const handleCarInformation = (e) => {
    const selectedCarId = e.target.value;
    const selectedCar = cars.find((car) => car.id === selectedCarId);
    setSelectedCar(selectedCar);
    toast.success(`You selected ${selectedCar.make} ${selectedCar.model}`);
  };

  // handle car type 
  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedCarType(selectedType);
    const filtered = cars.filter((car) => car.type === selectedType);
    setFilteredCars(filtered);
  };

  // if mark addition charge then sum with rate 
  const handleAdditionalChargeChange = (event) => {
    const { id, checked } = event.target;
    setAdditionalCharges((prevCharges) => ({
      ...prevCharges,
      [id]: checked,
    }));
  };

  // calculate total rate 
  const calculateBaseRate = () => {
    if (!selectedCar) return 0;
    const hourlyRate = selectedCar.rates?.hourly || 0;
    const dailyRate = selectedCar.rates?.daily || 0;
    const weeklyRate = selectedCar.rates?.weekly || 0;

    let baseTotal = (hour * hourlyRate) + (day * dailyRate) + (week * weeklyRate);
    return baseTotal;
  };

  const calculateTotalRate = () => {
    let total = baseRate + additional - discount;
    return total.toFixed(2);
  };

  useEffect(() => {
    const baseTotal = calculateBaseRate();
    setBaseRate(baseTotal);
    const total = calculateTotalRate();
    setTotalRate(total);
  }, [selectedCar, additional, discount, hour, day, week, baseRate]);



  // function for handle print 
  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    onAfterPrint: () => setPreviewInvoice(false),
    onBeforeGetContent: () => setPreviewInvoice(true),
    suppressErrors: true,
    trigger: () => previewInvoice,
    copyStyles: true,
    pageStyle: `@page { size: auto; margin: 0mm; }`,
    bodyClass: 'bg-gray-100',
    title: 'Invoice',
    delay: 500,
    styles: [
      `
        @media print {
          @page { size: auto; margin: 0mm; }
         .page-break { page-break-after: always; }
        }
      `,
    ]
  });

  // console.log(additionalCharges);
  // console.log(pickupDate);
  // console.log(returnDate);
  // console.log(discount);
  // console.log("base price", baseRate);
  // console.log("total price", totalRate);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {
            previewInvoice ?

              (<>
                <div className="max-w-3xl mx-auto p-6 bg-white rounded my-6 shadow-md" id="invoice" ref={contentToPrint}>
                  <div className='flex justify-end py-5 gap-5'>
                    <button className='w-36 h-12  text-white font-bold rounded-xl bg-gray-600' onClick={() => handlePrint(null, () => contentToPrint.current)}> Print/ Download </button>
                    <button className='w-36 h-12  text-white font-bold rounded-xl bg-cyan-400' onClick={() => setPreviewInvoice(false)}> Edit Information </button>
                  </div>
                  {/* ===================header component =========================== */}
                  <div className="grid grid-cols-2 items-center">
                    <Header />
                  </div>

                  <div className="grid grid-cols-2 items-center mt-8">
                    {/*============ client details ============== */}
                    <ClientDetails
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      phone={phone}
                      reservationId={reservationId}
                      pickupDate={pickupDate}
                      returnDate={returnDate}
                    />
                  </div>
                  {/* =============================amount=============================  */}
                  <div className="-mx-4 mt-8 flow-root sm:mx-0">
                    <Table selectedCar={selectedCar} additional={additional} discount={discount} baseRate={baseRate} totalRate={totalRate} />
                  </div>
                  {/* ================================footer =========================================== */}
                  <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                    Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                  </div>
                </div>

              </>)
              :
              (<>
                <div className="p-4 sm:p-10">
                  <div className="max-w-5xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center py-5">
                      <h1 className="text-2xl font-bold mb-6">Reservation</h1>
                      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setPreviewInvoice(true)}> Preview Invoice </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Reservation Details */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>
                          Reservation Details
                        </h2>
                        <form className="space-y-4">
                          <div>
                            <label className="block mb-1" htmlFor="reservationId">Reservation ID</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="text"
                              id="reservationId"
                              value={reservationId}
                              onChange={(e) => setReservationId(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="pickupDate">Pickup Date*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="datetime-local"
                              id="pickupDate"
                              required
                              value={pickupDate}
                              onChange={(e) => setPickupDate(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="returnDate">Return Date*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="datetime-local"
                              id="returnDate"
                              required
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}

                            />
                          </div>
                          <div className='flex justify-between items-center gap-1'>
                            <p> Duration </p>
                            <input
                              className="w-9 border border-gray-300 p-2 rounded"
                              type="text"
                              id="duration"
                              value={hour}
                              onChange={(e) => setHour(e.target.value)}
                            />
                            <span> Hour </span>
                            <input
                              className="w-9 border border-gray-300 p-2 rounded"
                              type="text"
                              id="duration"
                              value={day}
                              onChange={(e) => setDay(e.target.value)}
                            />
                            <span> Day </span>
                            <input
                              className="w-9 border border-gray-300 p-2 rounded"
                              type="text"
                              id="duration"
                              value={week}
                              onChange={(e) => setWeek(e.target.value)}
                            />
                            <span> Week </span>
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="discount">Discount</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="number"
                              id="discount"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                            />
                          </div>
                        </form>
                        <div className="py-5">
                          <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>
                            Vehicle Information
                          </h2>

                          <div>
                            <label className="block mb-1" htmlFor="carTypeDropdown">Vehicle Type <span className="text-red-500">*</span></label>
                            <select id="carTypeDropdown" onChange={handleTypeChange} className="w-full border border-gray-300 p-2 rounded">
                              <option value="">Select a vehicle type</option>
                              {[...new Set(cars.map((car) => car.type))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                          {selectedCarType && (
                            <div className="mt-4">
                              <label className="block mb-1" htmlFor="carDropdown">Vehicle <span className="text-red-500">*</span></label>
                              <select id="carDropdown" className="w-full border border-gray-300 p-2 rounded text-md font-bold" onChange={handleCarInformation}>
                                <option value="">Select a vehicle</option>
                                {filteredCars.map((car) => (
                                  <option key={car.id} value={car.id}>
                                    {`Make: ${car.make}, Model: ${car.model}, Hourly rate: ${car.rates?.hourly}, Daily rate: ${car.rates?.daily}, Weekly rate: ${car.rates?.weekly}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Customer Information</h2>
                        <form className="space-y-4">
                          <div>
                            <label className="block mb-1" htmlFor="firstName">First Name*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="text"
                              id="firstName"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="lastName">Last Name*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="text"
                              id="lastName"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}

                            />
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="email">Email*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="email"
                              id="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block mb-1" htmlFor="phone">Phone*</label>
                            <input
                              className="w-full border border-gray-300 p-2 rounded"
                              type="tel"
                              id="phone"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </form>
                        <h2 className="text-lg font-semibold mt-6 mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Additional Charges</h2>
                        <form className="space-y-4">
                          <div>
                            <input type="checkbox" id="collisionDamageWaiver" onChange={handleAdditionalChargeChange} />
                            <label className="ml-2" htmlFor="collisionDamageWaiver">Collision Damage Waiver $9.00</label>
                          </div>
                          <div>
                            <input type="checkbox" id="liabilityInsurance" onChange={handleAdditionalChargeChange} />
                            <label className="ml-2" htmlFor="liabilityInsurance">Liability Insurance $15.00</label>
                          </div>
                          <div>
                            <input type="checkbox" id="rentalTax" onChange={handleAdditionalChargeChange} />
                            <label className="ml-2" htmlFor="rentalTax">Rental Tax 11.5%</label>
                          </div>
                        </form>
                      </div>

                      {/* Charges Summary */}
                      <div>
                        <h2 className="text-lg font-semibold mb-4 border-b-2" style={{ borderColor: "#5D5CFF" }}>Charges Summary</h2>
                        <div className="p-4 rounded-lg" style={{ backgroundColor: "#DFDFFF" }}>
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
                                <td>Hourly</td>
                                <td>1</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.hourly}` : '-'}</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.hourly}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Daily</td>
                                <td>1</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.daily}` : '-'}</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.daily}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Weekly</td>
                                <td>1</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.weekly}` : '-'}</td>
                                <td>{selectedCar ? `$${selectedCar.rates?.weekly}` : '-'}</td>
                              </tr>
                              <tr>
                                <td>Additional</td>
                                <td>1</td>
                                <td>{selectedCar ? `$${additional}` : '-'}</td>
                                <td>{selectedCar ? `$${additional}` : '-'}</td>
                              </tr>
                              <tr className="font-semibold">
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td> {totalRate} </td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>)
          }
        </>
      )}
      <Toaster />
    </>
  );
}

export default App;
