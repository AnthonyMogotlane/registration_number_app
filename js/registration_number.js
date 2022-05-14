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


//add button event listener
addBtn.addEventListener("click", () => {
    //get the input
    registry.setInput(regNumInput.value);
    //get the list of registration numbers
    registry.setListOfRegNum(registry.getValidation());

    if (registry.setConvert() === registry.getValidation()) {
        plateList.innerHTML = "";
        //create registration number item
        for (let plateItem of registry.getListOfRegNum()) {
            const li = document.createElement("li");
            li.className = "plate flex column justify-center align-center";
            li.appendChild(document.createTextNode(plateItem));
            plateList.appendChild(li);
        }
        alertMsg("update-msg", "Registration Number Added");
    } else {
        alertMsg("error-msg", registry.getValidation());
    }

    //dropdown event listener
    dropdown.addEventListener("change", () => {
        registry.setTown(dropdown.options[dropdown.selectedIndex].value);
        if(dropdown.options[dropdown.selectedIndex].value === "all") {
            createNumberPlate(registry.getListOfRegNum());
        } else {
            createNumberPlate(registry.getFilterList());
        }
        console.log(registry.getFilterList());
    })
})

//clear list event listener
clearBtn.addEventListener("click", () => {
    plateList.innerHTML = "";
})
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
    }, 2000)
}







