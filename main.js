//value where i store the entry number
let entry="";
//value where i write the ready answer and next operator
let equation="";
//limit of how many character i can enter
const limit=14;

document.getElementById("input").value=entry;
document.getElementById("equation").innerHTML=equation;

document.addEventListener('keyup',function(x)
{
    manageInput(x.key);
})

const buttons=document.querySelectorAll(".btn");

buttons.forEach((button) =>{
    button.addEventListener("click",function(x)
    {
        let y = x.target.innerHTML;
        manageInput(y);
    })
});

function lastChar(str)
{
    return str[str.length-1];
}
function isEntryTooBig()
{
    if(entry.length>15)
    {
        return true;
    }
    return false;
}
function solve(sign)
{
    //if the last character is a number then
    //this means that the equation had the form(number+number)
    //so i clear it and it becomes again in form number+
    if(/[0-9]/.test(lastChar(equation)))
    {
        equation=entry+sign;
    }
    //if the equation is empty just add the entry and leave it 
    else if(equation.length==0)
    {
        equation+=entry+sign;
    }
    //if the equation is not empty
    else
    {
        //x takes everyting exept the last char which is the sign
        let x = equation.slice(0,equation.length-1);
        x=parseFloat(x);

        //y takes the entered value in entry
        let y = parseFloat(entry);
        let result=0;

        switch(lastChar(equation))
        {
            case "+":{result = x + y;}break;
            case "-":{result = x - y;}break;
            case "*":{result = x * y;}break;
            case "÷":{result = x / y;}break;
            case "/":{result = x / y;}break;
        }

        equation="" + result + sign;
    }
}
function isErrorMassege()
{
    //if entry contains an error massage clear it
    if(entry=="can't divide by zero")
    {
        entry="";
        document.getElementById('input').value=entry;
    }
}
function isDividingByZero()
{
    if(lastChar(equation) == "÷" && parseFloat(entry)==0)
    {
        entry="can't divide by zero";
        document.getElementById('input').value=entry;
        return true;
    }
    return false;
}
function numberPressed(x)
{
    //if the last char of the equation is number (number + number) or a  dot (number * 0.)
    //this means that (=) has been pressed
    //and i need to clear the entry and equation in order to take another number
    if(/[0-9 || .]/.test(lastChar(equation)))
    {
        clearAll();
    }

    //if there is nothing in the entry i cannot enter a 0
    if(x=="0")
    {

        if(entry.length>0)
        {
            entry+=x;
            document.getElementById('input').value=entry;
        }
        //if the lenght of entry is 0
        //this means decimal nubmer will be entered
        //and entry is gone become 0.
        else if(entry.length==0)
        {
            
            entry="0.";
            document.getElementById('input').value=entry;
            
        }
    }
    else 
    {
        //if none of the above is true
        //just add the number to entry
        entry+=x;
        document.getElementById('input').value=entry;
    }
}
function signPressed(x)
{
    if(x=="/")
        x="÷";

    //divide by zero error
    if(!isDividingByZero())
    {
        //if i (-) is pressed while the entry is empty
        //the equation becomes (0-)
        if(x=="-" && entry.length==0 && equation.length==0)
        {
            equation="0-"
            document.getElementById('equation').innerHTML=equation;
        }
        //if the entry is not empty
        else if(entry.length>0)
        {
            //do the needed operation(*,+,-,/) between the equation and entry
            solve(x);
            //entry = 0 so i can enter a new number
            entry="";
            document.getElementById('input').value=entry;
            document.getElementById('equation').innerHTML=equation;
        }
    }
}
function manageInput(x)
{
    //cheks if the entry contains error massage in it
    isErrorMassege();

    //if the pressed button is between 0-9
    if(/[0-9]/.test(x))
    {
        if(!isEntryTooBig())
            numberPressed(x);
        else 
            alert("Input field is full");
    }
    //chek if a sign is pressed
    else if(/[-+\*÷/]/.test(x))
    {   
        signPressed(x);
    }
    else if(x == "C")
    {
        clearAll();
    }
    else if(x == "CE")
    {
        clearEntry();
    }
    else if(x=="=")
    {
        
        //cheks if the user is trying to dive by 0
        if(!isDividingByZero())
        {
            //does the last operation(+,-,*,/) between equation and entry
            //entry is going to show the result
            //equation variable is goign to show the equatin which produced the result
            equalSignPressed();
        }
    }
    else if(x==".")
    {
        //chek if entry already contains a dot
        if(!entry.includes("."))
        {
            entry+="0.";
            document.getElementById('input').value=entry;
        }
    }
}
function equalSignPressed()
{
    //if there is no equation or
    //the equation is in form (1+2)
    //just dont do anything
    if(equation.length==0 || /[0-9]/.test(lastChar(equation)))
        return;
    
    //if the entry is empty dont do anything
    if(entry.length==0)
        return;
    
    let sign = lastChar(equation);//sign is at the end of the variable

    //equation is in form(number+) so i cut the number out
    let x=equation.slice(0,equation.length-1);
    x=parseFloat(x);

    let y=parseFloat(entry);

    equation += entry;
    document.getElementById("equation").innerHTML=equation;

    let result=0;

    switch(sign)
    {
        case "+":{result = x + y;}break;
        case "-":{result = x - y;}break;
        case "*":{result = x * y;}break;
        case "÷":{result = x / y;}break;
    }

    entry=""+result;
    if(entry.length>limit)
        entry = result.toExponential();
    document.getElementById("input").value=entry;
}
function clearAll()
{
    //clears everything
    entry="";
    equation="";
    document.getElementById('input').value=entry;
    document.getElementById('equation').innerHTML=equation;
}
function clearEntry()
{
    //clears only the entry
    entry="";
    document.getElementById('input').value=entry;

    //if the last char is a number this means equation is in form (number + number)
    //so i want to clear it too
    if(/[0-9]/.test(equation[equation.length-1]))
    {
        equation="";
        document.getElementById("equation").innerHTML=equation;
    }
}