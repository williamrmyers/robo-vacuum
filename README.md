# Robo Vacuum
This program is command line a Robotic Vacuum simulator written in node.js.

The program takes instructions from the config file input.txt, including room size, vacuum starting position and locations of dirt and driving Directions.


5 5 //Room Size
1 2 //Starting positions
1 0 //Dirt Piles
2 2
2 3
NNESEESWNWW //Directions


It returns two integers. The first being the final location of the vacuum, and the second the number of piles of dirt cleaned.


To run the program just execute it with node on the unix command line.

`node App.js`
