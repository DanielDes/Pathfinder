////////////////////////////constants for the algorithm////////////////////////
//this filter is for obtain the particular nibbles from a byte
const filter={ 0:0x0F,1:0xF0 };
const chromosome_size=8;
//this constants make mor readable the algoritm for fitness
const up_ = 0;
const dwn = 1;
const rgt = 2;
const lft = 3;
/* const map = [
    ['O','E','E','E','_','_','_','E'],
    ['_','_','E','_','_','E','_','_'],
    ['E','_','E','_','E','E','E','_'],
    ['_','_','E','_','_','E','_','_'],
    ['_','E','E','E','_','E','_','E'],
    ['_','_','E','_','_','E','_','_'],
    ['E','_','E','_','E','E','E','_'],
    ['E','_','_','_','E','E','E','X']
]; */
var map = [
    ['O','_','E','E','E','E','E','E'],
    ['E','_','_','_','_','_','_','E'],
    ['E','_','_','_','_','_','_','E'],
    ['E','_','_','E','E','_','_','E'],
    ['E','_','_','E','E','_','_','E'],
    ['E','_','_','_','_','_','_','E'],
    ['E','_','_','_','_','_','_','E'],
    ['E','_','_','_','_','_','_','_'],
    ['E','E','E','E','E','E','E','X']
];
//the posible ways of a horse in chess
/* rgt rgt dwn as a horse piece in chess
*   O -> O -> O
*             |
*             O
*/
const posible_directions=[
    [rgt,rgt,up_],[rgt,up_,up_],[lft,up_,up_],[lft,lft,up_],
    [lft,lft,dwn],[lft,dwn,dwn],[rgt,dwn,dwn],[rgt,rgt,dwn],
    [dwn,dwn,rgt],[dwn,dwn,lft],[dwn,lft,lft],[up_,lft,lft],
    [up_,up_,lft],[up_,up_,rgt],[up_,rgt,rgt],[dwn,rgt,rgt],
];

////////////////////////////variables for the algotithm /////////////////////
var init_position;
var end__position;
var wall_character;

var crossover_mask=[true,true,true,true,false,false,false,false];
var is_mutation_init = false;

////////////////////////////functions for the algorithm ////////////////////
//this function initialize a chromosome
function new_chromosome(size)
{
    var temp_chromosome={data:[],fitness:0};
    for(var index = 0;index<size;index++)
    {
        temp_chromosome.data[index]=Math.floor(256*Math.random());
    }
    return temp_chromosome;
}
//this function initialize a population using the function new_chromosome
function f_new_population(population,pop_size,chrom_size)
{
    for(var index=0;index<pop_size;index++)
    {
        population[index]=new_chromosome(chrom_size);
    }
}
//this function is needed for search a particular character in the map, the begin and the objetive
function recognize_map(character)
{
    var temp_position={x:0,y:0}
    for(var row=0;row<map.length;row++)
    {
        for(var col=0;col<map[0].length;col++)
        {
            if(map[row][col]==character){temp_position.x=row;temp_position.y=col;}
        }
    }
    return temp_position;
}

//this function is needed for initialize the variables for the fitness function
function init_fitness(character_init,character__end,_wall_character)
{
    init_position=recognize_map(character_init,map);
    end__position=recognize_map(character__end,map);
    wall_character=_wall_character;

}

//this function evalue the fitness for a particular chromosome
function f_fitness (indiv)
{
    var position = Object.assign({},init_position);
    var movement;
    var movements_count=0;
    //means we find a path from the begining to the end
    var its_over = false;
    var fit=0;
    //console.log (typeof(wall_character));
    for(var chrom_index = 0;chrom_index<indiv.data.length;chrom_index++)
    {
        // obtain the movements of the first nibble (F0) from the chromosome
        // movement is a vector with length 3
        // we follow the steps like simon says game, only if we not have a wall in the way
        if(!its_over)
        {
            movement = posible_directions[(indiv.data[chrom_index]&filter[1])>>>4];
            for(var mov_index = 0; mov_index<movement.length;mov_index++)
            {
                switch(movement[mov_index])
                {
                    case up_:
                        if(position.y-1>0)
                        {
                            var temp_element=map[position.x][position.y-1];
                            if(!Object.is(temp_element,wall_character)){ position.y--; movements_count++; }
                        }
                    break;
                    case dwn:
                        if(position.y+1<map.length)
                        {
                            var temp_element=map[position.x][position.y+1];
                            if(!Object.is(temp_element,wall_character)){ position.y++; movements_count++; }
                        }
                    break;
                    case lft:
                        if(position.x-1>0)
                        {
                            var temp_element=map[position.x-1][position.y];
                            if(!Object.is(temp_element,wall_character)){ position.x--; movements_count++; }
                        }
                    break;
                    case rgt:
                        if(position.x+1<map[0].length)
                        {
                            var temp_element=map[position.x+1][position.y];
                            if(!Object.is(temp_element,wall_character)){ position.x++; movements_count++; }
                        }
                    break;
                }
                if(position.x==end__position.x && position.y==end__position.y) {its_over=true;}
            }
        }
        if(!its_over)
        {
             //makes the same but with the second part of the nibble (0F)
            movement = posible_directions[indiv.data[chrom_index]&filter[0]];
            for(var mov_index = 0; mov_index<movement.length;mov_index++)
            {
                switch(movement[mov_index])
                {
                    case up_:
                        if(position.y-1>0)
                        {
                            var temp_element=map[position.x][position.y-1];
                            if(!Object.is(temp_element,wall_character)){ position.y--; movements_count++; }
                        }
                    break;
                    case dwn:
                        if(position.y+1<map.length)
                        {
                            var temp_element=map[position.x][position.y+1];
                            if(!Object.is(temp_element,wall_character)){ position.y++; movements_count++; }
                        }
                    break;
                    case lft:
                        if(position.x-1>0)
                        {
                            var temp_element=map[position.x-1][position.y];
                            if(!Object.is(temp_element,wall_character)){ position.x--; movements_count++; }
                        }
                    break;
                    case rgt:
                        if(position.x+1<map[0].length)
                        {
                            var temp_element=map[position.x+1][position.y];
                            if(!Object.is(temp_element,wall_character)){ position.x++; movements_count++; }
                        }
                    break;
                }
                if(position.x==end__position.x && position.y==end__position.y) {its_over=true;}
            }
        }
    }
    var distance =Math.sqrt(Math.pow(end__position.x-position.x,2)+Math.pow(end__position.y-position.y,2));
    if(its_over){fit=1000000-movements_count;}else{fit=Math.floor(Math.pow(100/(1+distance),2));}
    indiv.fitness=fit;
}
//this function makes the tournament of the population
function f_selection (population)
{
    //we are using roulette selection
    var total=0;
    var total_prom=0;
    var roulete=[];
    var new_population=[];
    //suma of fitnesses

    for(var index = 0; index<population.length;index++) 
    { 
        if(population[index]==undefined)
        {population[index]=new_chromosome(chromosome_size);
        f_fitness(population[index]);}
        total+=population[index].fitness; 
    }
    //averaage
    total_prom=total/population.length;
    //we make the roulette
    for(var index = 0; index<population.length;index++)
    {roulete[index]=population[index].fitness/total_prom;}
    //we chose the new members of the population
    for(var index = 0; index<population.length;index++)
    {
        var temp_rand = Math.floor(Math.random()*(population.length+1));
        var roulete_acum=0;
        for(var pop_index = 0;pop_index<population.length;pop_index++)
        {
            roulete_acum+=roulete[pop_index];
            if(roulete_acum>=temp_rand)
            {new_population[index]=population[pop_index];break;}
        }
    }
    //return a new population
    return new_population;
}


function f_crossover(population,crossover_rate)
{
    var temp_population = population;
    //crossover_rate must to be a value between 0 and 1
    //this array save the indexes of the parents selected from the temp_population array
    var selected_parents = [];
    //we make a list of indexes for the randomly selected parents from temp_population
    for(var index=0;index<temp_population.length;index++)
    {
        if(Math.random()>crossover_rate)
        { selected_parents[selected_parents.length]=index; }
    }

    if(selected_parents.length%2!=0)//we ensure that we have pairs of parents
    {selected_parents[selected_parents.length]=Math.floor(Math.random*(temp_population.length+1));}

    for(var index=0;index+1<selected_parents.length;index+=2)
    {
        var child={data:[],fitness:0};
        //temporal variables to save the parents, make the code more readable
        var frst_parent=temp_population[selected_parents[index]];
        var scnd_parent=temp_population[selected_parents[index+1]];
        //apply the mask for copy the values from each parent
        for(var chrom_index=0;index<selected_parents.data[0].length;chrom_index++)
        {
            child.data[chrom_index]=(crossover_mask[chrom_index]?frst_parent.data[chrom_index]:scnd_parent.data[chrom_index]);
        }
        // we avalue the cfittnes from the child
        fitness(child);
        // we inser the child in place of the worst parent
        if(frst_parent.fitness>scnd_parent.fitness)
        {
            if(child.fitness>scnd_parent.fitness)
            { temp_population[selected_parents[index+1]]=child; }
        }else{
            if(child.fitness>frst_parent.fitness)
            { temp_population[selected_parents[index]]=child; }
        }
    }
    //return a new population
    return temp_population;
}

function interchange(array,n_position,m_position)
{
    var temp_element = array[m_position];
    array[m_position]=array[n_position];
    array[n_position]=temp_element;
}

function f_mutation(population,mutation_rate)
{
    //makes this for every chromosome
    //the mutaiton rate must to be a nomber between 0 and 1, and be a very low value
    for(var pop_index = 0; pop_index < population.length; pop_index++)
    {
        if(population[pop_index]==undefined)
        {
            population[pop_index]=new_chromosome(chromosome_size);
            f_fitness(population[pop_index]);
        }
        //partial shuffle mutation
        for(var chrome_index = 0; chrome_index<population[0].data.length;chrome_index++)
        {
            if(Math.random()<mutation_rate)
            {
                 //interchange a random value from the chromosome with the current pointed value
                var temp_random = Math.floor(Math.random()*chromosome_size+1);
                var temp_chromosome = population[pop_index].data[chrome_index];
                population[pop_index].data[chrome_index]=population[pop_index].data[temp_random];
                population[pop_index].data[temp_random]=temp_chromosome;
            }
        }
    }
    // return a new population
    return population;
}
