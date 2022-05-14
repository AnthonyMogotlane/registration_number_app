//variables
//references to the DOM elements
const regNumInput = document.querySelector(".reg-num-one");
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");
const dropdown = document.querySelector("#towns");
const plateList = document.querySelector(".number-plates");
const headerContent = document.querySelector(".header-content");

//instance of registrationNumber factory function
let registry = registrationNumber();
//instance of storage function
let data = storage();

let listOfNumberPlates;

//create number plate function
const createNumberPlate = list => {
    plateList.innerHTML = "";
    for (let plateItem of list) {
        const li = document.createElement("li");
        li.className = "plate flex column justify-center align-center";
        li.appendChild(document.createTextNode(plateItem));
        plateList.appendChild(li);
    }
}

//create alert message function
const alertMsg = (theClass, theMsg) => {
    const p = document.createElement("p");
    p.className = theClass;
    p.appendChild(document.createTextNode(theMsg));
    headerContent.appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 1500)
}

//add button event listener
addBtn.addEventListener("click", () => {
    //get the input
    registry.setInput(regNumInput.value);
    //get the list of registration numbers
    registry.setListOfRegNum(registry.getValidation());

    if (registry.setConvert() === registry.getValidation()) {
        plateList.innerHTML = "";

        //update registration number list with localStorage list
        
        if (data.getData("registrationNumbers") === null) {
            listOfNumberPlates = registry.getListOfRegNum();
        } else {
            if(registry.getListOfRegNum().length === 1 && !data.getData("registrationNumbers").includes(registry.getInput())) {
                registry.listOfRegNum.unshift(...data.getData("registrationNumbers"));
            }
            listOfNumberPlates =registry.getListOfRegNum();           
        }
        //create registration number item
        createNumberPlate(listOfNumberPlates)

        alertMsg("update-msg", "Registration Number Added");
        //store list to localStorage
        data.setData("registrationNumbers", listOfNumberPlates)
    } else {
        alertMsg("error-msg", registry.getValidation());
    }

})

listOfNumberPlates = data.getData("registrationNumbers");
createNumberPlate(listOfNumberPlates);
//dropdown event listener
dropdown.addEventListener("change", () => {
    registry.setTown(dropdown.options[dropdown.selectedIndex].value);
    if(dropdown.options[dropdown.selectedIndex].value === "all") {
        createNumberPlate(listOfNumberPlates);
    } else {
        createNumberPlate(registry.getFilterList(listOfNumberPlates));
    }
    console.log(registry.getFilterList(listOfNumberPlates));
})
//clear list event listener
clearBtn.addEventListener("click", () => {
    plateList.innerHTML = "";
    localStorage.clear();
})









