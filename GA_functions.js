////////////////////////////constants for the algorithm////////////////////////
//this filter is for obtain the particular nibbles from a byte
const filter={ 0:0x0F,1:0xF0 };
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
function new_population(population,pop_size,chrom_size)
{
    for(var index=0;index<pop_size;index++)
    {
        population[index]=new_chromosome(chrom_size);
    }
}
//this function is needed for search a particular character in the map, the begin and the objetive
function recognize_map(character)
{
    var temp_position={x=0,y=0}
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
function fitness (indiv)
{
    var position = init_position;
    var movement;
    var movements_count=0;
    //means we find a path from the begining to the end
    var its_over = false;
    var fit=0;
    for(var chrom_index = 0;chrom_index<indiv.data.length;chrom_index++)
    {
        // obtain the movements of the first nibble (F0) from the chromosome
        // movement is a vector with length 3
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
function selection (population)
{
    var total=0;
    var total_prom=0;
    var roulete=[];
    var new_population=[];

    for(var index = 0; index<population.length;index++) 
    {total+=population[index].fitness;}

    total_prom=total/population.length;

    for(var index = 0; index<population.length;index++) 
    {roulete[index]=population[index].fitness/total_prom;}

    for(var index = 0; index<population.length;index++)
    {
        var temp_rand = Math.floor(Math.random*(population.length+1));
        var roulete_acum=0;
        for(var pop_index = 0;pop_index<population.length;pop_index++)
        {
            roulete_acum+=roulete[pop_index];
            if(roulete_acum>=temp_rand)
            {new_population[index]=population[pop_index];break;}
        }
    }

    return new_population;
}
function crossover(population,crossover_rate)
{
    
}

function mutation(population,mutation_rate)
{

}
