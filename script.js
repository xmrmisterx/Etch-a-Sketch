const container= document.getElementById('container');  // we want to access a parent element that we'll connect the generated divs (grids) onto 
// so it is get element by id, not queryselector for the container, that's good to know, but why doesn't it work, let's run it back using this correct code and try to get it to work with js in separate file

container.style.width= '1000px';  // We want to define the size of the 'container', as we want the grid squares to be in proportion to the container. When a new grid is made, the size of squares will be proportional to these constraints.
container.style.height= '1000px';


let rows= document.getElementsByClassName('gridRow'); // not sure what the difference between let and const are, but here, the subdvision of container is accessed by document.getElementsByClassName, we want acess to this rows class, so that we can append the column divisions to it

let cells= document.getElementsByClassName('cell'); // we need access to this cell class, as its what most of our 16 by 16 grid consists of; we will use css to make these into squares, thereby getting 16 squares by 16 squares

let squaresPerSide; // need variable for grid size for custom grids

function makeGrid(squaresPerSide) { // Function to make grids, which consists of a row making function, and a column making function. We considered having 2 parameters, one for # of rows and 1 for # of columns, but for this project, both the rows and columns are the same length, therefore just 1 parameter 'squaresPerSide'

makeRows(squaresPerSide);
makeColumns(squaresPerSide);

}

function makeRows (numberOfRows){ // This makes the rows, which are attached to the 'container' div. Note that there is no css style for the gridRow class we created, which I think means they are effectively invisible.

for (r=0; r<numberOfRows; r++) {

  let row= document.createElement('div');  // We create a variable for the div squares that get generated, so that we can a) append them to the parent container div b) name them easier?

  container.appendChild(row).className = 'gridRow'; // Looks like we are doing 2 things here. First, we append these divs called row onto a parent container called container, to create a row. Second, we are giving these row divs a class name of 'gridRow'. We had to google this but, append child returns the node appended, in this case that is row, or the divs being added, so that means we can also name their class in the same line. Similarly, we coulda used 'container.appendChild(row)' in one line, and the next line 'row.className = 'gridRow''
}

}

function makeColumns (numberOfColumns){ // This column making function is a little complicated, so lets try to put it into english before we put it into code. what we want to do is loop through each row created (how do we do that? by adding a class name to each div in the row, we can now use our variable for rows and loop through each row array number, starting at 0; in other words, 'getElementByClass' leaves those elements in a form that can be indexed, and we can also use the '.length' property to get the number of elements within the index). Furthermore, as we loop through each row, we want to do another for loop, this time to add the desired number of columns to each row, thus a loop within a loop. In the first loop, our stopping point is 1 less than rows.length, and in the second loop, our stopping point is 1 less than numberOfColumns. We create a newCell variable to hold the new div columns that we will append to the parent 'rows', but remember to append it to the correct row index, which is 'row[i]'.

for (i=0; i<rows.length; i++) {  // for each  div in the rows array...

  for (j=0; j<numberOfColumns; j++){  // for the number of columns that we want...

      let newCell = document.createElement('div');    // create a div called newCell...

      rows[j].appendChild(newCell).className = 'cell';    // and attach these new cells to their appropriate divs in the rows array, and give them the 'cell' class.

      newCell.style.minWidth= 'calc(' + 100/numberOfColumns + '% - 4px)'; // This is the 3 css styles that we need to change in order to have dynamically sized squares based on our 'container' size (1000px by 1000px)
      newCell.style.minHeight= 'calc(' + 100/numberOfColumns + '% - 4px)';
      newCell.style.paddingBottom= 'calc(' + 100/numberOfColumns + '% - 4px)';


      newCell.addEventListener('mouseover', (e) => {  // We add event listeners to each cell, that on a mousever, triggers a color change to blue. Note there were other similar mouse events, like 'mouseenter' and 'mouseleave' recommended by the assigment description, but mouseover does what we want an etch a sketch to do. We are not triggering a color change, then removing that color change on mouseleave. I believe the (e) parameter is there to to check for errors, that is, we set console.log(e) and get error messages. Not really sure, we copied the code from somewhere.

      newCell.style.backgroundColor = 'blue';

      });

    }   // let's review this again, bc it's not really intuitive. If we look at the inside for loop, it makes sense compared to the for loop in the makeRows function. We are just creating divs and attaching them to the parent. The subtle difference here is that instead of adding them to the container and making a row of 16 divs, we are adding these column divs to only 1 row of those 16, but we add it 16 times, creating a column of 16. So... that's the inside for loop, but... there are still 15 more rows that need columns, and that's what the outside for loop is for. Here, once we are done with first row (rows[0]), we move on to the second row (rows[1]), and so forth. In summary, the first for loop enumerates through the rows array, from 0 to 15, and the second for loop creates 16 columns at each rows index (0 to 15). 

  }

}

const resetBtn= document.querySelector('#resetBtn'); // We reference the resetBtn called resetGrid in our HTML, and set it to a variable called resetBtn

resetBtn.addEventListener('click', () => {  // We add an eventlistener to the resetBtn, so when clicked, it clears the grid and prompts a question that we use the answer of to make a new grid

  clearGrid();

  let gridSizeAnswer = prompt('How many squares per side do you want the new grid?');

  makeGrid(gridSizeAnswer);

});

function clearGrid () { // Function will clear the grid, by removing all the childs of the gridRow class. Note that when we 'Inspect Element' of our html, we see that our 'cell' class is actually attached to the 'gridrow' class, so if we tried to remove the 'cell' child from container, it gives us an error that 'cell' class is not a child of 'container'

  let existingPixels = document.querySelectorAll('.gridRow')  // Note that we already have the 'gridRow' class referenced in the 'rows' variable, but that was using 'document.getElementByClass', which apparently does not work when we try to use the '.forEach' method on it, so we have to use 'document.queryselectorall' here and assign it a new variable name 'existingPixels'


  existingPixels.forEach((gridRow) => { // This for.Each method was shown in the DOM assignment just before this etch-a-sketch assignment

    container.removeChild(gridRow); // Removing the 'gridRow' class from the 'container' element effectively erases the grid. We saw other github projects where they set ".innerHTML= ''", basically they set innerHTML to an empty string to clear it, but we never tried that to see if it worked.

  });

}

makeGrid(16); // We need to call the function to make the initial grid of 16 by 16 squares.
