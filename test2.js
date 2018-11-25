var lo_que_sea=55;
const filter={ 0:0x0F,1:0xF0 };

// generate random nombers between 0 an 255: 
// Math.floor(256*Math.random());

// gets the number representated by the second nibble (F0)
// (numero&filter[1])>>>4

// gets the number representatedby the first nubble (0F)
// numero&filter[0]

// 00 = arriba, 01= abajo, 10= izquieda, 11= derecha

var map = [
    ['O','E','E','E','_','_','_','E'],
    ['_','_','E','_','_','E','_','_'],
    ['E','_','E','_','E','E','E','_'],
    ['_','_','E','_','_','E','_','_'],
    ['_','E','E','E','_','E','_','E'],
    ['_','_','E','_','_','E','_','_'],
    ['E','_','E','_','E','E','E','_'],
    ['E','_','_','_','E','E','E','X']
];
/*
mapa a usar para bscar, O inicio; X final

O  E  E  E  _  _  _  E
_  _  E  _  _  E  _  _
E  _  E  _  E  E  E  _
_  _  E  _  _  E  _  _
_  E  E  E  _  E  _  E 
_  _  E  _  _  E  _  _
E  _  E  _  E  E  E  _
E  _  _  _  E  E  E  X

*/

const up_ = 0;
const dwn = 1;
const rgt = 2;
const lft = 3;
/* rgt rgt dwn as a horse piece in chess
*   O -> O -> O
*             |
*             O
*/


////////////////////////////////////////////////////////////////////////////////////////////////
//this function muust to be in the begining of the genetic algorithm, it's just to configure
// global variables like init position in the map and end position in the map

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


var init_position;
var end__position;
var wall_character;
//var map;

//la funcion sirve para inicializar a la posicion inicial y final
function init_fitness(character_init,character__end,_wall_character,_map)
{
    init_position=recognize_map(character_init,map);
    end__position=recognize_map(character__end,map);
    wall_character=_wall_character;
    map = _map;
}

function fitness (indiv)
{
    var position = init_position;
    var movement;
    var movements_count=0;
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
                        if(lft_element!=null && lft_element!=wall_character){ position.x++; movements_count++; }
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

////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//



function new_population(population,pop_size,chrom_size)
{
    for(var index=0;index<pop_size;index++)
    {
        population[index]=new_chromosome(chrom_size);
    }
}

function new_chromosome(size)
{
    var temp_chromosome={data:[],fitness:0};
    for(var index = 0;index<size;index++)
    {
        temp_chromosome.data[index]=Math.floor(256*Math.random());
    }
    return temp_chromosome;
}

const posible_directions=[
    [rgt,rgt,dwn],[rgt,rgt,up_],[up_,up_,rgt],[up_,up_,lft],
    [lft,lft,up_],[lft,lft,dwn],[dwn,dwn,lft],[dwn,dwn,rgt],
    [dwn,rgt,rgt],[up_,rgt,rgt],[rgt,up_,up_],[lft,up_,up_],
    [up_,lft,lft],[dwn,lft,lft],[lft,dwn,dwn],[rgt,dwn,dwn]
];

function print_character()
{
    console.log();
}

