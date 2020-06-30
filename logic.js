console.log("javascript loaded");
  
//check to make sure DOM is ready
$( document ).ready(function() 
{                 
    //display current day at the top of the page
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    //creates the schedule
    for (var i = 9; i < 18; i++) 
    {
               //create columns
       var colTime = $('<div class="time-block col-sm-2"> <p class="hour">' + AMorPM(i) + '</p>');
               //defaults class/color of description to 'past'
       var colDesc = $(`<div class="past col-sm-8 "><textarea id=text${i} class="description"></textarea>`);        
       var colSave = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
       
        //create rows id's each row by hour
       var row = $(`<div data-time=${i} id='${i}' class="row">`);

        //add columns to rows
        row.append(colTime);
        row.append(colDesc);
        row.append(colSave);

        //adds rows to container in index.html
        $(".container").append(row);

        //gets description 
        getLocalStorage(i);
                        
    }

    //checks and sets hou for AM or PM
    function AMorPM(hours) 
    {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return " " + hours + " " + ampm;
    }

    AMorPM();

    //logic for save button icon
    var save = $('.saveBtn');
    save.on('click', function()
    {
        var hourId = $(this).attr('id');
        var hourDesc = $(this).parent().siblings().children('.description').val();

        localStorage.setItem(hourId, hourDesc);
    });

    //checks to update the description color every second
    setInterval(function() 
    {
         checkColor();
    }, 1000);

    //updates class/color of row based on current time for future and present rows
    function checkColor()
    {
        //gets hour of current time
        var timeNow = new Date().getHours();

        for (var i = 9; i < 18; i++) 
        {   
            //if the time id is equal to the current hour
            if ($(`#${i}`).data("time") == timeNow)
            {
                $(`#text${i}`).addClass( "present");
            } 
            //if the time id is greater than the current hour
            else if (timeNow < $(`#${i}`).data("time")) 
            {
                $(`#text${i}`).addClass( "future");
            }
        }
    }
    console.log( "DOM loaded" );
});

//gets desription text of row
function getLocalStorage(key) 
{
    var input = localStorage.getItem(key);

    if (input) 
    {
        $(`#text${key}`).text(input);
    }
}