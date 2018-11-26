
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
  var position = Object.assign({},init_position);
  var steps = individue.data
  steps.forEach(function(doubleNible){
    var firstSetOfMovements = posible_directions[doubleNible & filter[1] >>> 4];
    var secondSetOfMovements = posible_directions[doubleNible & filter[0]];

    firstSetOfMovements.forEach(function(step){
      switch(step)
      {
        case up_:
            if(position.y-1>=0)
            {
                var temp_element=map[position.x][position.y-1];
                if(!Object.is(temp_element,wall_character)){ position.y--; path.push(step);}
            }
        break;
        case dwn:
            if(position.y+1<map.length)
            {
                var temp_element=map[position.x][position.y+1];
                if(!Object.is(temp_element,wall_character)){ position.y++; path.push(step); }
            }
        break;
        case lft:
            if(position.x-1>=0)
            {
                var temp_element=map[position.x-1][position.y];
                if(!Object.is(temp_element,wall_character)){ position.x--; path.push(step); }
            }
        break;
        case rgt:
            if(position.x+1<map[0].length)
            {
                var temp_element=map[position.x+1][position.y];
                if(!Object.is(temp_element,wall_character)){ position.x++; path.push(step); }
            }
        break;
      }
    })
    secondSetOfMovements.forEach(function(step){
      switch(step)
      {
        case up_:
            if(position.y-1>=0)
            {
                var temp_element=map[position.x][position.y-1];
                if(!Object.is(temp_element,wall_character)){ position.y--; path.push(step);}
            }
        break;
        case dwn:
            if(position.y+1<map.length)
            {
                var temp_element=map[position.x][position.y+1];
                if(!Object.is(temp_element,wall_character)){ position.y++; path.push(step); }
            }
        break;
        case lft:
            if(position.x-1>=0)
            {
                var temp_element=map[position.x-1][position.y];
                if(!Object.is(temp_element,wall_character)){ position.x--; path.push(step); }
            }
        break;
        case rgt:
            if(position.x+1<map[0].length)
            {
                var temp_element=map[position.x+1][position.y];
                if(!Object.is(temp_element,wall_character)){ position.x++; path.push(step); }
            }
        break;
      }
    })
  })
  return path;
}
