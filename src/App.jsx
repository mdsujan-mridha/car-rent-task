import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useGetCarsQuery } from './redux/api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './component/Loader';
import { useReactToPrint } from 'react-to-print';

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

  // if mark addition  charge then sum with rate 

  const handleAdditionalChargeChange = (event) => {
    const { id, checked } = event.target;
    setAdditionalCharges((prevCharges) => ({
      ...prevCharges,
      [id]: checked,
    }));
  };

  // calculate total rate 
  const calculateTotal = () => {
    if (!selectedCar) return 0;
    const hourlyRate = selectedCar.rates?.hourly || 0;
    const dailyRate = selectedCar.rates?.daily || 0;
    const weeklyRate = selectedCar.rates?.weekly || 0;
    let total = hourlyRate + dailyRate + weeklyRate;

    if (additionalCharges.collisionDamageWaiver) {
      total += 9.00;
    }
    if (additionalCharges.liabilityInsurance) {
      total += 15.00;
    }
    if (additionalCharges.rentalTax) {
      total *= 1.115;
    }

    return total.toFixed(2);
  };

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




  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {
            previewInvoice ?

              (<>
                <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6" id="invoice" ref={contentToPrint}>
                  <div className='flex justify-end py-5 gap-5'>
                    <button className='w-36 h-12  text-white font-bold rounded-xl bg-gray-600' onClick={() => handlePrint(null, () => contentToPrint.current)}> Print/ Download </button>
                    <button className='w-36 h-12  text-white font-bold rounded-xl bg-cyan-400' onClick={() => setPreviewInvoice(false)}> Edit Information </button>
                  </div>
                  {/* ===================header component =========================== */}
                  <div className="grid grid-cols-2 items-center">
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                        alt="company-logo"
                        height="100"
                        width="100"
                      />
                    </div>
                    <div className="text-right">
                      <p>Tailwind Inc.</p>
                      <p className="text-gray-500 text-sm">sales@tailwindcss.com</p>
                      <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
                      <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center mt-8">
                    {/* =================bill summary =============== */}
                    <div>
                      <p className="font-bold text-gray-800">Bill to :</p>
                      <p className="text-gray-500">
                        Laravel LLC.
                        <br />
                        102, San-Francisco, CA, USA
                      </p>
                      <p className="text-gray-500">info@laravel.com</p>
                    </div>
                    {/*============ client details ============== */}
                    <div className="text-right">
                      <p>
                        Invoice number: <span className="text-gray-500">INV-2023786123</span>
                      </p>
                      <p>
                        Invoice date: <span className="text-gray-500">03/07/2023</span>
                        <br />
                        Due date: <span className="text-gray-500">31/07/2023</span>
                      </p>
                    </div>
                  </div>
                  {/* =============================amount=============================  */}
                  <div className="-mx-4 mt-8 flow-root sm:mx-0">
                    <table className="min-w-full">
                      <colgroup>
                        <col className="w-full sm:w-1/2" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                      </colgroup>
                      <thead className="border-b border-gray-300 text-gray-900">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Quantity</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
                          <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">E-commerce Platform</div>
                            <div className="mt-1 truncate text-gray-500">Laravel based e-commerce platform.</div>
                          </td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">500.0</td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                          <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$5,000.00</td>
                        </tr>

                        <tr className="border-b border-gray-200">
                          <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">Frontend Design</div>
                            <div className="mt-1 truncate text-gray-500">Frontend design using Vue.js and Tailwind CSS.</div>
                          </td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">500.0</td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                          <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$5,000.00</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="font-medium text-gray-900">Shop SEO</div>
                            <div className="mt-1 truncate text-gray-500">Website SEO and Social Media marketing.</div>
                          </td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">50.0</td>
                          <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">$100.00</td>
                          <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">$500.00</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal</th>
                          <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                          <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">$10,500.00</td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
                          <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
                          <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">$1,050.00</td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount</th>
                          <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
                          <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">- 10%</td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="3" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total</th>
                          <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                          <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">$11,550.00</td>
                        </tr>
                      </tfoot>
                    </table>
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
                              <tr className="font-semibold">
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td>{selectedCar ? `$${calculateTotal()}` : '-'}</td>
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
