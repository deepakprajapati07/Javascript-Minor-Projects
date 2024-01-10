// Function to handle the submit button click

function onSubmitButtonClick() {
    // Get the number of family members

    const familyMembers = parseFloat(document.getElementById('family-members').value);

    // Call the calculation functions for each section
    const A = calculateHousehold(familyMembers);
    const B = calculateMobility(familyMembers);
    const C = calculateNutrition();
    const D = calculatePrivate();
    const E = calculatePublic();

    const grandTotal = A + B + C + D + E;

    // Calculate CO2 emissions estimate 
    const conversionFactorCO2 = 0.22;
    const co2Emissions = grandTotal * conversionFactorCO2;

    // Display the results
    document.getElementById('grand-total-consumption').textContent = grandTotal.toFixed(2);
    document.getElementById('co2-emissions-estimate').textContent = co2Emissions.toFixed(2);

    const conclusionSection = document.getElementById('conclusion-note')
    conclusionSection.classList.add('active')

    const conclusion = document.getElementById('conclusion')


    const avgCO2emission = 1900; // Average CO2 emission in India (in kg)
    if (co2Emissions > avgCO2emission){
        conclusion.textContent = "OMG!😮 Your share of CO2 emission is above average CO2 emission in India"
    }
    else if (co2Emissions === avgCO2emission){
        conclusion.textContent = "On the Line! 🙂 Your share of CO2 emission is equal to average CO2 emission in India"
    }
    else {
        conclusion.textContent = "Wow! 😉 Your share of CO2 emission is less than average CO2 emission in India"
    }

}

// Function to calculate the total energy consumption for Household
function calculateHousehold(familyMembers) {
    // Get input values from the user
    const areaHeated = parseFloat(document.getElementById('area-heated').value);
    const areaCooled = parseFloat(document.getElementById('area-cooled').value);
    const electricityArea = parseFloat(document.getElementById('electricity-area').value);
    const areaUsed = parseFloat(document.getElementById('area-used').value);

    // Define conversion factors for each input field
    const conversionAreaHeated = 50;
    const conversionAreaCooled = 10;
    const conversionElectricityArea = 20;
    const conversionAreaUsed = 60;

    // Calculate energy consumption for each input
    const energyHeated = areaHeated * conversionAreaHeated;
    const energyCooled = areaCooled * conversionAreaCooled;
    const energyElectricity = electricityArea * conversionElectricityArea;
    const energyIndirect = areaUsed * conversionAreaUsed;

    // Calculate total household energy consumption
    const totalHousehold = (energyHeated + energyCooled + energyElectricity + energyIndirect) / familyMembers;

    // Display the total household energy consumption
    document.getElementById('total-household-consumption').textContent = totalHousehold.toFixed(2);

    return totalHousehold;
}

// Function to calculate the total energy consumption for Mobility
function calculateMobility(familyMembers) {
    // Get input values from the user
    const fuelUsed = parseFloat(document.getElementById('fuel-used').value);
    const distanceTravelled = parseFloat(document.getElementById('distance-travelled').value);
    const vehicleWeight = parseFloat(document.getElementById('vehicle-weight').value);
    const trainDistance = parseFloat(document.getElementById('train-distance-travelled').value);
    const busDistance = parseFloat(document.getElementById('bus-distance-travelled').value);
    const aircraftTime = parseFloat(document.getElementById('aircraft-time-travelled').value);

    // Define conversion factors for each input field
    const conversionFuelUsed = 12;
    const conversionDistanceTravelled = 1.3;
    const conversionVehicleWeight = 5.3;
    const conversionTrainDistance = 0.5;
    const conversionFactorBusDistance = 0.5;
    const conversionAircraftTime = 500;

    // Calculate energy consumption for each input
    const energyDirect = (fuelUsed * conversionFuelUsed) / familyMembers;
    const energyDistance = (distanceTravelled * conversionDistanceTravelled) / familyMembers;
    const energyVehicleWeight = (vehicleWeight * conversionVehicleWeight) / familyMembers;
    const energyTrain = trainDistance * conversionTrainDistance;
    const energyBus = busDistance * conversionFactorBusDistance;
    const energyAircraft = aircraftTime * conversionAircraftTime;

    // Calculate total mobility energy consumption
    const totalMobility = energyDirect + energyDistance + energyVehicleWeight + energyTrain + energyBus + energyAircraft;

    // Display the total mobility energy consumption
    document.getElementById('total-mobility-consumption').textContent = totalMobility.toFixed(2);

    return totalMobility;
}

// Function to calculate the total energy consumption for Nutrition
function calculateNutrition() {
    // Get selected nutrition type (VEGAN, VEGETARIAN, NON-VEGETARIAN)
    const nutritionType = document.querySelector('input[name="nutrition-type"]:checked').value;

    // Define conversion factors for each nutrition type
    let conversionNutrition = 0;

    if (nutritionType === 'VEGAN') {
        conversionNutrition = 7600;
    } else if (nutritionType === 'VEGETARIAN') {
        conversionNutrition = 10600;
    } else if (nutritionType === 'NON-VEGETARIAN') {
        conversionNutrition = 14850;
    }

    // Display the total nutrition energy consumption
    document.getElementById('total-nutrition-consumption').textContent = conversionNutrition.toFixed(2);

    return conversionNutrition;
}

// Function to calculate the total energy consumption for Private Consumption
function calculatePrivate() {
    // Get input values from the user
    const clothingValue = parseFloat(document.getElementById('clothing').value);
    const computerUseHours = parseFloat(document.getElementById('computer-use').value);

    // Define conversion factors for each input field
    const conversionClothing = 0.1;
    const conversionComputerUse = 0.2;

    // Calculate energy consumption for each input
    const energyClothing = clothingValue * conversionClothing;
    const energyComputerUse = computerUseHours * conversionComputerUse;

    // Calculate total private consumption energy consumption
    const totalPrivate = energyClothing + energyComputerUse;

    // Display the total private consumption energy consumption
    document.getElementById('total-private-consumption').textContent = totalPrivate.toFixed(2);

    return totalPrivate;
}

// Function to calculate the total energy consumption for Public Consumption
function calculatePublic() {
    // Get input value from the user
    const publicUseValue = parseFloat(document.getElementById('public-use').value);

    // Calculate total public consumption energy consumption
    const totalPublic = publicUseValue;

    // Display the total public consumption energy consumption
    document.getElementById('total-public-consumption').textContent = totalPublic.toFixed(2);

    return totalPublic;
}

// Add a click event listener to the submit button
document.getElementById('submit-button').addEventListener('click', onSubmitButtonClick);


