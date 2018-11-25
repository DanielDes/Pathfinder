////////////////////////////////////////////////////////////////////////////////////////////////
//this function muust to be in the begining of the genetic algorithm, it's just to configure
// global variables like init position in the map and end position in the map

function recognize_map(character,map)
{
    var temp_position={x=0,y=0}
    for(var row=0;row<map.lenght;row++)
    {
        for(var col=0;col<map[0].lenght;col++)
        {
            if(map[row][col]==character){temp_position.x=row;temp_position.y=col;}
        }
    }
    return temp_position;
}


var init_position;
var end__position;
//la funcion sirve para inicializar a la posicion inicial y final
function init_fitness(character_init,character__end,map)
{
    init_position=recognize_map(character_init,map);
    end__position=recognize_map(character__end,map);
}

function fitness (indiv,character_wall,map)
{
    var position = init_position;
    var movement;
    var movements_count=0;
    var its_over = false;
    var fit=0;
    for(var index = 0;index<indiv.lenght;index++)
    {
        // obtain the movements of the first nibble (F0) from the chromosome
        // movement is a vector with lenght 3
        if(!its_over)
        {
            movement = posible_directions[(indiv[index]&filter[1])>>>4];
            for(var mov_index = 0; mov_index<movement.length;mov_index++)
            {
                switch(movement[mov_index])
                {
                    case up_:
                        var up__element=map[position.x][position.y-1];
                        if(up__element!=null && up__element!=character_wall){ position.y--; movements_count++; }
                    break;
                    case dwn:
                        var dwn_element=map[position.x][position.y+1];
                        if(dwn_element!=null && dwn_element!=character_wall){ position.y++; movements_count++; }
                    break;
                    case lft:
                        var lft_element=map[position.x-1][position.y];
                        if(lft_element!=null && lft_element!=character_wall){ position.x--; movements_count++; }
                    break;
                    case rgt:
                        var rgt_element=map[position.x+1][position.y];
                        if(lft_element!=null && lft_element!=character_wall){ position.x++; movements_count++; }
                    break;
                }
                if(position.x==end__position.x && position.y==end__position.y) {its_over=true;}
            }
        }
        if(!its_over)
        {
             //makes the same but with the second part of the nibble (0F)
            movement = posible_directions[numero&filter[0]];
            for(var mov_index = 0; mov_index<movement.length;mov_index++)
            {
                switch(movement[mov_index])
                {
                    case up_:
                        var up__element=map[position.x][position.y-1];
                        if(up__element!=null && up__element!=character_wall){ position.y--; movements_count++; }
                    break;
                    case dwn:
                        var dwn_element=map[position.x][position.y+1];
                        if(dwn_element!=null && dwn_element!=character_wall){ position.y++; movements_count++; }
                    break;
                    case lft:
                        var lft_element=map[position.x-1][position.y];
                        if(lft_element!=null && lft_element!=character_wall){ position.x--; movements_count++; }
                    break;
                    case rgt:
                        var rgt_element=map[position.x+1][position.y];
                        if(lft_element!=null && lft_element!=character_wall){ position.x++; movements_count++; }
                    break;
                }
                if(position.x==end__position.x && position.y==end__position.y) {its_over=true;}
            }
        }
    }
    if(its_over){fit=movements_count+100;}else{fit=movements_count;}
    return fit;
}



////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//
