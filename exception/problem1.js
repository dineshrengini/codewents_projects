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
function getCarById(id, inventory) {
  try {
    if (typeof id !== 'number' || isNaN(id) || !Number.isInteger(id)) {
      throw new Error('Invalid input: Please provide an integer.');
    }
    const validatedInventory = validateInventory(inventory);
    if (!validatedInventory) {
      throw new InventoryError('Invalid inventory.');
    }
    for (let i = 0; i < validatedInventory.length; i++) {
      if (validatedInventory[i].id === id) {
        return validatedInventory[i];
      }
    }
    throw new CarNotFoundError('No car with the specified ID found in the inventory.');
  } catch (error) {
    if (error instanceof InventoryError) {
      console.error('Inventory error:', error.message);
    } else if (error instanceof CarNotFoundError) {
      console.error('Car not found error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return null;
  }
}
module.exports = getCarById;
