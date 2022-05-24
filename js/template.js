//variables
const inputField = document.querySelector(".reg-num-two");
const addBtnTwo = document.querySelector(".add-btn-two");
const dropdownTwo = document.querySelector("#cities");
const clearBtnTwo = document.querySelector(".clear-btn-two");
const guideContainerTwo = document.querySelector(".guide-container-two");
const closeBtnTwo = document.querySelector(".close-btn-two");


const numberPlateTemplate = document.querySelector(".number-plates-template");
const clearBtnContainer = document.querySelector(".clear-btn-container");


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
    theClearButtonTemplate();
  };

  if (theRegistry.getConvert() === theRegistry.getValidation()) {
    HandlebarsTemplate(theRegistry.getListOfRegNum());

    if(theStorage.getData("registry") !== null && theStorage.getData("registry").includes(theRegistry.getValidation())) {
      popupMsgTemplate("Registration number exist", "warn-msg");
    } else {
      popupMsgTemplate("Registration number added", "update-msg");
    }

    //update the localStorage with the input registration number
    theStorage.setData("registry", theRegistry.getListOfRegNum());
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

  numberPlateTemplate.innerHTML = templateFunction(licensePlate);
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
    theClearButtonTemplate();
  } else {
    HandlebarsTemplate(
      theRegistry.getFilterList(theRegistry.getListOfRegNumVar())
    );
    theClearButtonTemplate();
  }
});

//clear button template
function theClearButtonTemplate() {
  let clearBtnTemplate = document.querySelector(".clear-btn-content").innerHTML;
  let clearBtnTemplateFunction = Handlebars.compile(clearBtnTemplate);
  let clearButton = {
    button: "Clear List",
    condition: numberPlateTemplate.textContent.trim() !== "No Data! exist to display"
  }
  clearBtnContainer.innerHTML = clearBtnTemplateFunction(clearButton);
}
theClearButtonTemplate();

//clear registration numbers
clearBtnContainer.addEventListener("click", () => {
    HandlebarsTemplate(theRegistry.getResetList());
    localStorage.removeItem("registry");
    theClearButtonTemplate();
});

//close btn for the guide
closeBtnTwo.addEventListener("click", () => {
  guideContainerTwo.style.display = "none";
  //store state of the guide
  data.setData("guideTwo", "closed");
})

guideContainerTwo.style.display = "none"
if (data.getData("guideTwo") === null) {
  setTimeout(() => { guideContainerTwo.style.display = "block" }, 1500)
} else {
  guideContainerTwo.style.display = "none";
}
