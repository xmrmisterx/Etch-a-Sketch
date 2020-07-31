Below is mostly unfiltered stream of consciousness as we were working on the project; things we wanted to do in the code, what worked and didn't work, why we had to do things in a certain way, some "Aha!" moments, and other general thoughts as we worked on the project.

// using the html skeleton bookmarked, we were able to use different files for js, css, and html, which is better practice. Apparently the code "src="script.js"" links the html to a file within this etch a sketch folder, with the name 'script.js'
// we added the div 'container' into the actual html, using <div id='container'> </div> , we thought id was class like we used in RPS project, so we still not understanding these div elements well

// so it says we need 16 by 16 grid, with each square being a square div (I guess the div in html represents an actual object? is that what DOM, or document object model, means? still confused), so it seems we first need to make our div a square, then create a rows and columns of 16 of them 

// we've found some projects with our Google searches, but we aren't really understanding the code within, let's talk this out logically; how would we go about drawing a grid of 16 by 16 square boxes? we'd draw 1 square, then another vertically or horizontally next to it, up to 16 squares, then we'd move 1 square vertically or horizontally, depending on which direction we took initially, e.g. if we draw a square, then 15 more above it, we'd go back to our original square, and move one square to the right, and repeat the same process, until we have moved 15 times (grid size - 1)

// alright, think we're gonna use the first page we found as a template, it's from somebody doing this exact project a year ago, here are some important takeaways a) the divs being squares themselves can be done by the css, at least it was in this case b) they made the rows first, by using a for loop set for x number of rows, which creates a div, and appends it to the parent ('container'), and also gives it a class name 'gridrow' to acess the rows later on c) after the 16 rows are created, another for loop is run on each div of the row (gridrow class), and within that for loop, is another for loop, creating the 15 remaining columns, here you append the new columns to its parent row

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

// Why does referencing the script file not work, but putting the script within the html file work? We think it has something to do with the referencing of the container element; so can we create the container element using only javascript? It seems there has to be something already there to append it to?

// Wow, we fixed it, apparently the call document.queryselector for container was wrong, and it was document.getElementByID , but I know we had tried this before and we didn't get our grids, said our "container was null", so the only difference is, we moved the js script reference to body vs head, and we used getElementByID instead of querySelector, let's change those 2 factors and see if we can get our error message again

// Ok, after the moving the JS script reference test, we've found the problem. Putting it in the head was the problem, and obviously before when we were setting const container by queryselector was also wrong, it's getElementByID, so that's good to know, mainly JS script in the body, which we did some googling and it gives the html time to load, so script.js can reference it, which kinda makes sense

// Let's play around with the css styling parameters...

// We need to set up a hovering effect, which happens when the mouse enters a div, and and ends when the mouse leaves the div, so it's suggested we use event listeners for both events as a starting point

// Ok so we gave most of our divs in the grid a classname of cell, and those are the ones referenced in our css. In the previous DOM lesson, we learned we can querySelectAll to find all of a certain node (I guess this means any element?) so presumably we select for all 'cell', set it as a const, then we are able to use the forEach method to iterate through each node, with the aim of adding an event listener to each node

// It seems we already have a similar array called cells that we set as a variable up top, however, it doesn't seem like we can call the 'forEach' method for it, so let's try creating another const for the cells

// We used the method in the DOM lesson to queryselectall, then add eventlistener, but it's not working, maybe we can't add 2 listeners at once?

// We found a hover method on w3schools website, let's try that; yeah we can't seem to find a way to do it in javascript itself

// We went back to trying the javascript to change css methods, and none worked lol. it doesn't seem we can call '.style' from our cells array, or for each individual cell div...

// Reading through the project again, it talks about 1 way to change color of the grid is to add a class to the divs, so let's see if we can add classes to 'cell'

// Wait, we just looked at the inspector, and the div classes inside the container are all 'gridRow', not 'cell'? actually, no, the 'cell' are collapsed inside the gridrow, but most of the grids are of the 'cell' class

// Honestly, it's very simple what we want to do... We have all these grids that are 'cell' divs, and we want to select them all, and change their background color, so how do we do that? 

// We want to add event listeners and such, but we are having problems just changing the grid colors, yikes. Let's find somebody else's project, this is getting rediculous...

// We found a odin project github by somebody named Rebecca, for the etch a sketch. She added a class to the cell divs, via '.classlist.add('');' then created that class list in the css file. she put the add event listeners action within the create grid function, which in hindsight makes sense, so let's try it. Lol, her code is bad, maybe she forgot to update github, but her addeventlistener was 'click', but the actual html was a mouseover, very misleading and wrong info

// We finally figured it out! we had to add the eventlisteners as we make the grid, which in hindsight makes sense. That's where they are accessed, generated, and put the event listeners in too. For some reason we thought maybe we needed to add a separate function, which would need to go on the ouside, but no, the addeventlistener code let's us put the function we want right inside

// Do we need to do the code for the gridrows too (we think so), or just the cells? Do we need to separate the mouseover event listener to mouseenter and mouseleave, since maybe we want the color change to go away when our mouse is no longer hovering on the grid block?

// In an etch-a-sketch we want the color to stay, so I think 'mouseover' event is fine. It also seems like all squares are getting filled in, which means we don't have to set up eventlisteners for 'gridrow' class

// Let's try changing the class, does this also change the background color? Cool, adding a new class to those, and setting the background color property for that class in the CSS also works.

// How do we delete a grid? Ok, so after trying alot of stuff, we realized that const cells set to the class 'cell' we cannot enumerate with foreach, so we change it to a existingpixels variable set to document.queryselectall('.cell'), then we were able to enumerate throw them with a foreach method, but when we tried to remove them from container with container.removechild(cell), we got an error saying cell wasn't a child of container. that's when we realized the direct child of container is gridrow, so when we changed the child to the gridrow class, it finally worked and we were able to reset the grid

// The assignment says to have the new grid pop up using the name number of pixels as the initial 16 by 16, how do we do that? Ok, let's just assume our page is 1000 by 1000 pixels, how do we adjust the width and height to match that? Say we wanted everything at 20 px, errr just the width and height at 20 px, so 16*20=320, that gives us 320, but we want to stretch to 1000, ok this is simple algebra, 16x=1000, so x is 62.5, which means width and height of 62.5, so the formula for the width or height, assuming we have 1000 pixels, is 1000/(number of grid squares)

// We still can't get dynamically sized squares based on how many squares we set, ugh. What if we change the container size, will that change the div siz? It won't unless the div size is dynamic? Setting the container to 1000px width and height does seem to cap the squares at about half the page. Now here's a thought, if we can edit the min width, why not max width? Maybe we need to set the max width out a bit?

// Alright, we've made a discovery. By setting the container width and height at a certain value, say 1000 px each, we've set the upper limit for how many pixels can be used, we're able to manipulate the size of the square divs that generate inside the container. Using this logic, we've found that setting the min width, min height, and padding-bottom equal to (100/numberOfSquares) gives us our % for those values, e.g. at 10 squares, 100/10 is 10, so min-width, min-height, and padding-bottom are all 10%. Note that we have a margin and border set up (to 1px each currently), which actually means the minwidth, minheight, and padding-bottom is actually set to 'calc(10% - 4px)'. Honestly we're not sure why it's 4px instead of a 2px offset, but 4px gives us the correct results.

// Ok, so we managed to adjust our css to match what we want our grids to do and look like (mostly a breakthrough of limiting the container size, and adding a padding-bottom into css, otherwise squares were just lines), now how do we set the css properties, which are strings, into our javascript that employs formulas based on numbers and variables?

// We need to figure out how to convert our equation for width, height, and padding into string form for css.style, currently it says NaN: this is now resolved, our equation was fine, however, we didn't use the correct variable for number of squares, we used 'squaresperside', which is a variable that we set up, but the value isn't defined, at least not yet in the makerow and makecolumn functions, luckily, in the make column function, 'numberofcolumns' is the same value, so when we replaced that 'squaresPerSide' with 'numberOfColumns', our equation to get the correct css style values worked; we tested it from a range of 1 squarePerSide to 100, so it seems to work well

// We decide not to do the optional part of this assignment, as we've spent alot of time already on this, and eyah we learned alot, but we've seen the other Etch-a-Sketch githubs and we feel we can do the optional stuff if we wanted to