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

function new_population(pop_size,chrom_size)
{
    var temp_pop=[];
    for(var index=0;index<pop_size;index++)
    {
        temp_pop[index]=new_chromosome(chrom_size);
    }
}

function new_chromosome(size)
{
    var temp_chromosome=[];
    for(var index = 0;index<size;index++)
    {
        temp_chromosome[index]=Math.floor(256*Math.random());
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

