
//This function simply search for the best individue acordding to its fitness score
function checkBestResult(final_population)
{
  var bestIndividue = {};
  var highestScore = 0;

  final_population.forEach(function(individue){
    if (individue.fitness > highestScore){
        bestIndividue = individue
        highestScore = individue.fitness
    }
  });
  console.log(bestIndividue)
  return bestIndividue
}

//This funciton simply gets the hole path that a given indivue followed
function checkPathOfIndivue(individue)
{
  var path = [];
  var steps = individue.data
  steps.forEach(function(doubleNible){
    var firstSetOfMovements = posible_directions[doubleNible & filter[1] >>> 4];
    var secondSetOfMovements = posible_directions[doubleNible & filter[0]];

    firstSetOfMovements.forEach(function(step){
      path.push(step);
    })
    secondSetOfMovements.forEach(function(step){
      path.push(step);
    })
  })
  console.log(path);
  return path;
}
