//variables
const inputField = document.querySelector(".reg-num-two");
const addBtnTwo = document.querySelector(".add-btn-two");
const dropdownTwo = document.querySelector("#cities");
const clearBtnTwo = document.querySelector(".clear-btn-two");

//instance of registrationNumber factory function
let theRegistry = registrationNumber();
//instance of storage function
let theStorage = storage();
//add data from local storage
if (theStorage.getData("registry") !== null) {
  theRegistry.getListOfRegNumVar().push(...theStorage.getData("registry"));
}

//add button even listener
addBtnTwo.addEventListener("click", () => {
  theRegistry.setInput(inputField.value);
  theRegistry.setListOfRegNum(theRegistry.getValidation());

  const popupMsgTemplate = (theMessage, theClass) => {
    let popupTemplate = document.querySelector(".header-popup-msg").innerHTML;
    let popupTemplateFunction = Handlebars.compile(popupTemplate);
    let popupMsg = { message: theMessage, theMsg: theClass };
    document.querySelector(".header-content-two").innerHTML = popupTemplateFunction(popupMsg);
    setTimeout(() => {document.querySelector(".header-content-two").innerHTML = "<h2 class='app-title'>Number Plate Registry</h2>"}, 1500);
  };

  if (theRegistry.getConvert() === theRegistry.getValidation()) {
    HandlebarsTemplate(theRegistry.getListOfRegNum());
    theStorage.setData("registry", theRegistry.getListOfRegNum());

    popupMsgTemplate("Registration number added", "update-msg");
    //popupMsgTemplate("Registration number exist", "warn-msg");
  } else {
    popupMsgTemplate(theRegistry.getValidation(), "error-msg");
  }

  //set dropdown to default
  dropdownTwo.selectedIndex = 0;
  //clear input field
  inputField.value = "";
});

function HandlebarsTemplate(theNumberPlates) {
  //reference to the template
  let template = document.querySelector(".number-plates-content").innerHTML;
  //compile template
  let templateFunction = Handlebars.compile(template);

  let licensePlate = {
    numberPlate: theNumberPlates,
  };

  document.querySelector(".number-plates-template").innerHTML = templateFunction(licensePlate);
}

//display data from localStorage
if (theRegistry.getListOfRegNumVar().length >= 0) {
  HandlebarsTemplate(theRegistry.getListOfRegNumVar());
}

dropdownTwo.addEventListener("change", () => {
  let selectedOption = dropdownTwo.options[dropdownTwo.selectedIndex].value;
  theRegistry.setTown(selectedOption);
  if (selectedOption === "all") {
    HandlebarsTemplate(theRegistry.getListOfRegNumVar());
  } else {
    HandlebarsTemplate(
      theRegistry.getFilterList(theRegistry.getListOfRegNumVar())
    );
  }
});

//clear registration numbers
clearBtnTwo.addEventListener("click", () => {
  HandlebarsTemplate(theRegistry.getResetList());
  localStorage.clear();
});