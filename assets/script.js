$(document).ready(function () {
  //Display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("MMMM DD, YYYY"))
  
  //setting save button to save textInput in localStorage upon click
  $(".saveBtn").on("click", function(){
    const timeStamp = $(this).parent().attr("id");
    const textInput = $(this).siblings(".description").val();
    localStorage.setItem(timeStamp, textInput); 
    console.log(timeStamp + ": " + textInput);
  })

  //automation to have Past, Preset, & Future classes added/removed appropriately dependent on the hour of the day in reference to the current time
  function timeBlock(){
    const currentHour = dayjs().hour();
    $(".time-block").each(function(){
      // console.log($(this))
      const blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour){
        $(this).addClass("past"); 
        // this refers to current row we're on for the current iteration (ex. hour 9 row etc)
      } else if (blockHour === currentHour){
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  }
  timeBlock() //calls the function on page load
  setInterval(timeBlock, 60000);

  // retrieve input from localStorage & repeat for each hour 9am-5pm
  // $("#hour-9 .description").val(localStorage.getItem("hour-9")); 
  // $("#hour-10 .description").val(localStorage.getItem("hour-10")); 
  // $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  // $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  // $("#hour-13 .description").val(localStorage.getItem("hour-13")); 
  // $("#hour-14 .description").val(localStorage.getItem("hour-14")); 
  // $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  // $("#hour-16 .description").val(localStorage.getItem("hour-16")); 
  // $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  //refactoring the previous lines here 
  for (let i=9; i < 18; i++){
    // console.log(i)
    //use back ticks to enable referencing js "string interpolation"
    $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`));
  }

  $(".clearInput").on("click", function(){
    localStorage.clear();
    location.reload();
    console.log("Schedule cleared & Page refreshed");
  })
});


