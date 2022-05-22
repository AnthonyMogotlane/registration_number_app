//variables
const inputField = document.querySelector(".reg-num-two");
const addBtnTwo = document.querySelector(".add-btn-two");
const clearBtnTwo = document.querySelector(".clear-btn-two");

//instance of registrationNumber factory function
let theRegistry = registrationNumber();
//instance of storage function
let theStorage = storage();
//add data from local storage
if(theStorage.getData("registry") !== null) {
    theRegistry.getListOfRegNumVar().push(...theStorage.getData("registry"))
}

//add button even listener
addBtnTwo.addEventListener("click", () => {
    theRegistry.setInput(inputField.value);
    theRegistry.setListOfRegNum(theRegistry.getValidation());
    
    HandlebarsTemplate(theRegistry.getListOfRegNum());
    theStorage.setData("registry", theRegistry.getListOfRegNum())
})

function HandlebarsTemplate(theNumberPlates) {
    //reference to the template
    let template = document.querySelector(".number-plates-content").innerHTML;
    //compile template
    let templateFunction = Handlebars.compile(template);
    
    let licensePlate = {
        numberPlate: theNumberPlates
    }
    
    document.querySelector(".number-plates-template").innerHTML = templateFunction(licensePlate);
}

//display data from localStorage
if(theRegistry.getListOfRegNumVar().length > 0) {
    HandlebarsTemplate(theRegistry.getListOfRegNumVar()) 
}

//clear registration numbers
clearBtnTwo.addEventListener("click", () => {
    HandlebarsTemplate(theRegistry.getResetList())
    localStorage.clear();
})


