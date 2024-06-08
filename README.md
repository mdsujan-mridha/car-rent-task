# Car Rental Reservation System

A React-based car rental reservation system with functionalities to select cars, apply additional charges, and generate an invoice.

## Key Features

- **Car Selection**: Users can select a car from a list filtered by vehicle type.
- **Reservation Details**: Users can input and manage reservation details including pickup and return dates, and customer information.
- **Additional Charges**: Users can add extra charges such as Collision Damage Waiver, Liability Insurance, and Rental Tax.
- **Dynamic Pricing**: The system dynamically calculates the total rental rate based on the selected car, duration, and additional charges.
- **Invoice Preview and Print**: Users can preview and print/download the invoice.

## Functionality

### Components

1. **App.js**
   - Manages the state of the application including car data, selected car, additional charges, customer information, and reservation details.
   - Uses the `useGetCarsQuery` hook to fetch car data from the Redux store.
   - Uses the `useReactToPrint` hook to handle invoice printing.
   - Contains the logic to filter cars by type and calculate rates.

2. **Header.js**
   - Displays the header information of the invoice.

3. **ClientDetails.js**
   - Displays customer details in the invoice.

4. **Table.js**
   - Displays the breakdown of charges and the total amount in the invoice.

5. **Loader.js**
   - Displays a loading spinner when data is being fetched.

### Hooks and Libraries

- **useGetCarsQuery**: Custom hook to fetch car data.
- **useReactToPrint**: Hook to handle printing functionality.
- **react-hot-toast**: Library to show success and error notifications.

### State Management

- **useState**: Manages various states including selected car, customer information, additional charges, and rates.
- **useEffect**: Fetches data and calculates rates when dependencies change.

### Main Functionalities

1. **Fetching and Displaying Cars**:
   - Car data is fetched using the `useGetCarsQuery` hook.
   - Cars are displayed in a dropdown, filtered by type.
   - Users can select a car to view its details and rates.

2. **Handling Additional Charges**:
   - Users can select additional charges which will update the total amount dynamically.
   - The `handleAdditionalChargeChange` function updates the state of additional charges.

3. **Calculating Rates**:
   - `calculateBaseRate` calculates the base rate based on the selected car and duration.
   - `calculateTotalRate` calculates the total rate including additional charges and discounts.

4. **Printing the Invoice**:
   - The `handlePrint` function handles the invoice printing using the `useReactToPrint` hook.
   - Users can preview the invoice before printing or downloading.

### Example Usage

1. **Selecting a Car**:
   - Select a vehicle type from the dropdown.
   - Select a specific car from the filtered list.

2. **Entering Reservation Details**:
   - Fill in the pickup and return dates.
   - Enter customer information such as first name, last name, email, and phone number.

3. **Adding Additional Charges**:
   - Select additional charges (Collision Damage Waiver, Liability Insurance, Rental Tax).

4. **Previewing and Printing the Invoice**:
   - Click on "Preview Invoice" to view the invoice.
   - Click on "Print/Download" to print or download the invoice.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mdsujan-mridha/car-rent-task.git
   cd car-rent-task
### Install dependencies:
```bash
     npm install
```
### Start the application:
```bash
    npm start

```
### Dependencies
- `react`
- `Redux Toolkit`
- `react-hot-toast`
- `RTK Query`
- `react-to-print`
- `Tailwind CSS`

### Author
Md Sujan Mridha

### Live link
https://car-rent-task.vercel.app/



## License
 This project is licensed under the MIT License.

This `README.md` file provides an overview of the key features, describes the functionality, and includes installation instructions. Adjust the repository link and any specific details as needed.

