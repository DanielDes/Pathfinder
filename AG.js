/*//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
*	Author: Aguilar Moreira David Uriel
* 	Email : Davluka_D@hotmail.com
* 	creation_date: 21/11/2018
* 	objetive: 
* 		the functions must to create a variable what can contains the important features of our genetic 
*			algorithms in general
* 	name: 	
*		newGA
*	parametres: 
*		- the selection rule(function) for the population, it must to work with the complete population, 
*			must return the selected population.
* 		- the cross rule(function) for the population, 	it must to work with the complete population and 
*			returns a new population with the childrens of the crossover in place of the fathers(it 
*			depends on the fitness).
*		- the mutation rule(function) for the population, it must to work with the complete population 
*			and returns a new population what contains a population mutated.
*		- the function to initialize the population, it must to work for only one element each time, 
*			must to have a paremeter what will contain the current value, and optionally the index and 
*			the array per se.
* 		- the function to evaluate the fitness of the population on each iteration, it must to work with
*			one element each time, and save the value of the fitness on each chromosome as a feature.
*		- the crossover rate for the algorithm, it must to be a number between 0 and 1
*		- the mutation rate for the algorithm, it must to be a number between 0 and 1
*		
*	return:
*		a variable that contains all the features.
*
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////*/

function newGA(_Selection,_Cross,_Mutation,_Init,_Fitness,_cross_rate,_mutation_rate,_population_size)
{
	var _temp_GA = {};
	_temp_GA.population={};
	_temp_GA.new_population={};
	_temp_GA.SelectionFunction 	= _Selection;
	_temp_GA.CrossoverFunction 	= _Cross;
	_temp_GA.Mutation_Function 	= _Mutation;
	_temp_GA.Init 				= _Init;
	_temp_GA.Fitness 			= _Fitness;
	_temp_GA.Cross_rate 		= _cross_rate;
	_temp_GA.Mutation_rate 		= _mutation_rate;
	_temp_GA.PopulationSize 	= _population_size;

	return _temp_GA;
}

/*//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
*
*	Author: Aguilar Moreira David Uriel
*	Email: 	Davluka_D@hotmail.com
*	creation date: 21/11/2018
*	objetive:
*		the function must to calculate the genetic algoritm in terms of an object maded from the function 
*		newGA
*	name:
* 		Evolve
*	parametres
* 		an object maded from the function newGA and a max number for the generations
* 	returns:
*		the last generation
*
////////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////*/

function Evolve(GenAl,max_generations)
{
	GenAl.population.forEach(GenAl.Init);
	GenAl.population.forEach(GenAl.Fitness);
	for(var index = 0; index<max_generations;index++)
	{
		GenAl.new_population	= GenAl.SelectionFunction(GenAl.population);
		GenAl.new_population	= GenAl.CrossoverFunction(GenAl.new_population,GenAl._cross_rate);
		GenAl.population	 	= GenAl.Mutation_Function(GenAl.new_population,GenAl._mutation_rate);
	}
	return GenAl.population;
}