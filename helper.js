function getRandomIntegerFromArray(array) {
    // Generate a random index within the range of the array length
    var randomIndex = Math.floor(Math.random() * array.length);
  
    // Return the randomly selected integer from the array
    return array[randomIndex];
  }