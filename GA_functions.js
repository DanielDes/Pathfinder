////////////////////////////constants for the algorithm////////////////////////
//this filter is for obtain the particular nibbles from a byte
const filter={ 0:0x0F,1:0xF0 };
const chromosome_size=8;
//this constants make mor readable the algoritm for fitness
const up_ = 0;
const dwn = 1;
const rgt = 2;
const lft = 3;
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
var map;
var crossover_mask=[true,true,true,true,false,false,false,false];
var is_mutation_init = false;

////////////////////////////functions for the algorithm ////////////////////
//this function initialize a chromosome
function new_chromosome(size)
{
    var temp_chromosome = {data:[],fitness:0};
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

    var temp_position = {x:0,y:0};
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
function init_fitness(character_init,character__end,_wall_character,_map)
{
    init_position=recognize_map(character_init,map);
    end__position=recognize_map(character__end,map);
    wall_character=_wall_character;
    map = _map;
}

//this function evalue the fitness for a particular chromosome
function f_fitness (indiv)
{
    var position = init_position;
    var movement;
    var movements_count=0;
    //means we find a path from the begining to the end
    var its_over = false;
    var fit=0;
    console.log("Hola")
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
                        var up__element=map[position.x][position.y-1];
                        if(up__element!=null && up__element!=wall_character){ position.y--; movements_count++; }
                    break;
                    case dwn:
                        var dwn_element=map[position.x][position.y+1];
                        if(dwn_element!=null && dwn_element!=wall_character){ position.y++; movements_count++; }
                    break;
                    case lft:
                        var lft_element=map[position.x-1][position.y];
                        if(lft_element!=null && lft_element!=wall_character){ position.x--; movements_count++; }
                    break;
                    case rgt:
                        var rgt_element=map[position.x+1][position.y];
                        if(rgt_element!=null && lft_element!=wall_character){ position.x++; movements_count++; }
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
                        var up__element=map[position.x][position.y-1];
                        if(up__element!=null && up__element!=wall_character){ position.y--; movements_count++; }
                    break;
                    case dwn:
                        var dwn_element=map[position.x][position.y+1];
                        if(dwn_element!=null && dwn_element!=wall_character){ position.y++; movements_count++; }
                    break;
                    case lft:
                        var lft_element=map[position.x-1][position.y];
                        if(lft_element!=null && lft_element!=wall_character){ position.x--; movements_count++; }
                    break;
                    case rgt:
                        var rgt_element=map[position.x+1][position.y];
                        if(lft_element!=null && lft_element!=wall_character){ position.x++; movements_count++; }
                    break;
                }
                if(position.x==end__position.x && position.y==end__position.y) {its_over=true;}
            }
        }
    }
    if(its_over){fit=movements_count+100;}else{fit=movements_count;}
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
    var numberOfElements = Object.keys(population).length
    //suma of fitnesses
    for(var index = 0; index<numberOfElements;index++)
    {total+=population[index].fitness;}
    //averaage
    total_prom=total/numberOfElements;
    //we make the roulette
    for(var index = 0; index<numberOfElements; index++)
    {roulete[index]=population[index].fitness/total_prom;}
    //we chose the new members of the population
    console.log(numberOfElements);
    for(var index = 0; index<numberOfElements;index++)
    {
        var temp_rand = Math.floor(Math.random*(numberOfElements+1));
        console.log(temp_rand);
        var roulete_acum=0;
        for(var pop_index = 0;pop_index<numberOfElements;pop_index++)
        {
            roulete_acum+=roulete[pop_index];
            if(roulete_acum>=temp_rand)
            {
              var newMember = population[pop_index];
              console.log(newMember)
              new_population.push(newMember);
              break;
            }
        }
    }
    //return a new population
    return new_population;
}


function f_crossover(population,crossover_rate)
{
    //crossover_rate must to be a value between 0 and 1
    //this array save the indexes of the parents selected from the population array
    var selected_parents = [];
    //we make a list of indexes for the randomly selected parents from population
    for(var index=0;index<population.length;index++)
    {
        if(Math.random()>crossover_rate)
        { selected_parents[selected_parents.length]=index; }
    }

    if(selected_parents.length%2!=0)//we ensure that we have pairs of parents
    {selected_parents[selected_parents.length]=Math.floor(Math.random*(population.length+1));}

    for(var index=0;index+1<selected_parents.length;index+=2)
    {
        var child={data:[],fitness:0};
        //temporal variables to save the parents, make the code more readable
        var frst_parent=population[selected_parents[index]];
        var scnd_parent=population[selected_parents[index+1]];
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
            { population[selected_parents[index+1]]=child; }
        }else{
            if(child.fitness>frst_parent.fitness)
            { population[selected_parents[index]]=child; }
        }
    }
    //return a new population
    return population;
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
        //partial shuffle mutation
        for(var chrome_index = 0; chrome_index<population[0].data.length;chrome_index++)
        {
            if(Math.random()<mutation_rate)
            {
                //interchange a random value from the chromosome with the current pointed value
                interchange(population[pop_index].data,chrome_index,Math.floor(Math.random()*chromosome_size+1));
            }
        }
    }
    // return a new population
    return population;
}
