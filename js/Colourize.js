var id, color = 0;
error = false;
Count = 0;
strict = false;
ComputerSequence = [];
UserSequence = [];
power = false;


var boardSound = [
    "http://www.soundjay.com/button/sounds/button-4.mp3", //green
    "http://www.soundjay.com/button/sounds/button-09.mp3", //red
    "http://www.soundjay.com/button/sounds/button-10.mp3", //yellow 
    "http://www.soundjay.com/button/sounds/button-7.mp3" //blue   
];


$(document).ready(function ()
{
    $("#powerSwitch").click(function ()
    {

        if (power == false) {// makes Off switch dissapear and leaves the  On switch
            console.log(power);
            $(".Clk").removeClass("Player");
            $(".Clk").addClass("Active")
            $("#buttonOn").css("visibility", "visible");
            $("#buttonOff").css("visibility", "hidden");
            $("#startBT").css("background-color", "#39FF14");
            power = true;
        }

        else if (power == true)// hides ON switch and displays OFF switch 
        {

            console.log(power);
            $(".Clk").removeClass("Active");
            $(".Clk").addClass("Player");
            $("#buttonOn").css("visibility", "hidden");
            $("#buttonOff").css("visibility", "visible");

           
            console.log("Reset");
            $(".display").text("");

            $("#startBT").css("background-color", "red");
            strict = false;
            power = false;
            Count = 0;
            ComputerSequence = [];
            UserSequence = [];
            
            $("#strictBT").css("background", "yellow");

        }

    });

    
    $("#startBT").click(function ()
    {
        $(".display").html("--");

        strict = false;
        ComputerSequence.length = [];
        UserSequence.length = [];

        StarSequence();
        UserInput();

    })

        
    //$("#strictBT").dblclick(function() // doubleclick event handler 
    //{
    //        Count = 0;
    //        strict = false;
            
    //        $(".display").text("");
    //        $("#strictBT").css("background", "yellow");
    //        console.log(strict);
    //})

    $("#strictBT").on("click", function ()
    {
        $("#strictBT").dblclick();
        $("#strictBT").css("background", "yellow");
        Count = 0;
        ComputerSequence = [];
        UserSequence = [];
        strict = true;
        
        if (strict == true )
        {
            console.log("strict");
            if (ComputerSequence !== UserSequence)
            {
                $(".display").html("--");
                UserSequence = [];
                ComputerSequence = [];
                Count = 0;
                StarSequence();
                // When Strict BT is clicked second time the it makes Strict false
            }

            $("#strictBT").css("background", "red");
            
                if (strict == false /*&& power === false*/) {
                    $("#strictBT").css("background", "yellow");
                    UserSequence = [];
                    ComputerSequence = [];
                    Count = 0;

                }
     
        }
    })

    
    $(".button").click(function()
    {
        id = this.id;
        color = $(this).attr("class").split(" ")[1];
        $("#" + id).addClass(color + "-active");// plays the color
        playSound(id);
        setTimeout(function ()
        {
            $("#" + id).removeClass(color + "-active");

        }, 100);
        
        UserSequence=UserSequence+id;
        console.log(UserSequence)
        UserInput();
    })


    function StarSequence()
    {
        var i = 0;
        GetRand();

        var myInterval = setInterval(function ()
        {
            id = ComputerSequence[i];
            color = $("#" + id).attr("class");
            color = color.split(" ")[1];

            GameLogic(id, color);
            i++;
            //console.log(ComputerSequence);
            if (i == ComputerSequence.length)
            {
                clearInterval(myInterval);
            }
        }, 1000);
    }


    function GetRand()
    {
        random = Math.floor(Math.random() * 4);
        ComputerSequence.push(random);
    }


    function playSound(id)
    {
        var sound = new Audio(boardSound[id]);
        sound.play();
    }


    function GameLogic(id, color)
    {
        $("#" + id).addClass(color + "-active");// plays theu color
        playSound(id);
       
        setTimeout(function ()
        {
            $("#" + id).removeClass(color + "-active");

        }, 500);
        
    }


    function ResetGame()
    {
        $(".display").html("--");
        UserSequence = [];
        ComputerSequence = [];
        Count = 0;
        StarSequence();
    }


    function Error()
    {
        $(".display").html("!!");

        UserSequence = [];
        error = true;
        
        var i = 0;
           
        var myInterval = setInterval(function ()
             {
                      Id = ComputerSequence[i];
                      color = $("#" + Id).attr("class");
                      color = color.split(" ")[1];

                      $("#" + Id).addClass(color + "-active");// plays theu color
                      playSound(id);
                      setTimeout(function ()
                      {
                          $("#" + Id).removeClass(color + "-active");

                      }, 500);
                     
                      i++;
                      
                      if (i == ComputerSequence.length)
                      {
                          clearInterval(myInterval);
                          console.log(ComputerSequence);
                      }
                      UserInput();
                  }, 1000);
            }
        
    
    //*********Button Presses***************************
    function UserInput()
    {
      
        for (var i = 0; i < ComputerSequence.length; i++)
            
        {
            
            if (ComputerSequence.length == UserSequence.length)//Tests if Computer sequence is the same length as User Sequence 
            {
                if (UserSequence[UserSequence.length-1] == ComputerSequence[ComputerSequence.length-1]) // Tests if all elements in the ComputerSequence are equal to UserSequence
                {
                    console.log("Correct "+ ComputerSequence);
                    console.log("Correct " + UserSequence);
                    Count++;

                    $(".display").html(Count);
                    
                    UserSequence = [];
                    StarSequence();

                    if (Count === 20)
                    {
                        ResetGame();
                    }
                }


                else if (ComputerSequence[i] !== UserSequence[i])
                {
                
                   Error();
                    
                 }


                    if (strict == true && error == true )
                    {
                        console.log("strict");
                       
                        ResetGame();
                        

                    }
                
                }
           
        }
     
    };
})