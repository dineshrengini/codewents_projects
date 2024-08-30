function validateInventory(inventory) {
  if (!Array.isArray(inventory)) {
    throw new Error('Invalid inventory: Inventory must be an array.');
  }

  for (let i = 0; i < inventory.length; i++) {
    const car = inventory[i];
    const isValidCar =
      typeof car === 'object' &&
      typeof car.id === 'number' &&
      Number.isInteger(car.id) &&
      typeof car.car_make === 'string' &&
      car.car_make.length > 0 &&
      typeof car.car_model === 'string' &&
      car.car_model.length > 0 &&
      typeof car.car_year === 'number' || car.car_year === '' || (typeof car.car_year === 'string' && !isNaN(car.car_year))
    if (!isValidCar) {
      throw new Error(`Invalid inventory item at index ${i}: 
        - id must be a positive integer,
        - car_make and car_model must be strings with length greater than 3,
        - car_year must be a positive integer.`);
    }
  }
  return inventory;
}
function findlastCar(inventory) {
  try {
    const validatedInventory = validateInventory(inventory);

    if (validatedInventory.length === 0) {
      throw new InventoryError('Empty inventory: No cars available.');
    }

    return validatedInventory[validatedInventory.length - 1];
  } catch (error) {
    console.error('Inventory error:', error.message);
    return null;
  }
}
module.exports = findlastCar;