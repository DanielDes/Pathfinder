function checkBestResult(final_population)
{
  var bestIndividue = {};
  var highestScore = 0;
  console.log("Searching best result");
  final_population.forEach(function(individue){
    if (individue.fitness > highestScore){
        bestIndividue = individue
        highestScore = individue.fitness
    }
  });
  console.log(bestIndividue)
  return bestIndividue
}

function checkPathOfIndivue(individue)
{
  var path = [];
  var steps = individue.data
  steps.forEach(function(doubleNible){
    var firstSetOfMovements = posible_directions[doubleNible & filter[1] >>> 4];
    var secondSetOfMovements = posible_directions[doubleNible & filter[0]];
    console.log(firstSetOfMovements);
    console.log(secondSetOfMovements);
    firstSetOfMovements.forEach(function(step){
      path.push(step);
    })
    secondSetOfMovements.forEach(function(step){
      path.push(step);
    })
  })
  console.log(path);
}
