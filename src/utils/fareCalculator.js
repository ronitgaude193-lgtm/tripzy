/**
 * Calculate fare per seat
 * @param {number} distance - distance in kilometers
 * @param {number} fuelPrice - price per liter
 * @param {number} seats - number of seats available
 * @param {number} mileage - vehicle mileage (km per liter) default = 15
 */

const fareCalculator = (distance, fuelPrice, seats, mileage = 15) => {

  if (!distance || !fuelPrice || !seats) {
    return 0;
  }

  if (seats <= 0) {
    throw new Error("Seats must be greater than zero");
  }

  // fuel required
  const fuelNeeded = distance / mileage;

  // total fuel cost
  const totalCost = fuelNeeded * fuelPrice;

  // cost per seat
  const costPerSeat = totalCost / seats;

  return Math.ceil(costPerSeat);
};

export default fareCalculator;