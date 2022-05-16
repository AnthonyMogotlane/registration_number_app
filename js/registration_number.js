//variables
//references to the DOM elements
const regNumInput = document.querySelector(".reg-num-one");
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");
const dropdown = document.querySelector("#towns");
const plateList = document.querySelector(".number-plates");
const headerContent = document.querySelector(".header-content");
const guideContaner = document.querySelector(".guide-container")
const closeBtn = document.querySelector(".close-Btn");
const item = document.querySelector(".plate");

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
            console.log(data.getData("registrationNumbers"), registry.getInput())
            if (registry.getListOfRegNum().length === 1 && !data.getData("registrationNumbers").includes(registry.getValidation())) {
                registry.listOfRegNum.unshift(...data.getData("registrationNumbers"));
            }
            listOfNumberPlates = registry.getListOfRegNum();
        }
        //create registration number item
        createNumberPlate(listOfNumberPlates)

        alertMsg("update-msg", "Registration Number Added");
        //store list to localStorage
        data.setData("registrationNumbers", listOfNumberPlates)
        //show clear list button
        clearBtn.style.display = "block";
    } else {
        alertMsg("error-msg", registry.getValidation());
    }

    //clear input
    regNumInput.value = "";

    //remove class
    plateList.classList.remove("number-plates-two");

})
//show registration numbers stored in local storage
listOfNumberPlates = data.getData("registrationNumbers");
if (listOfNumberPlates !== null) {
    createNumberPlate(listOfNumberPlates);
}

//msg when the is no data
let noData = "<p style='color: yellow; background: #444; text-align: center; font-weight: 500;padding: 5px'>No Data! exist to display</p>";

//dropdown event listener
dropdown.addEventListener("change", () => {
    registry.setTown(dropdown.options[dropdown.selectedIndex].value);
    if (dropdown.options[dropdown.selectedIndex].value === "all") {
        createNumberPlate(listOfNumberPlates);
    } else {
        if (data.getData("registrationNumbers") !== null) {
            createNumberPlate(registry.getFilterList(listOfNumberPlates));
        }
        if(plateList.innerHTML.length == 0) plateList.innerHTML = noData;
    }
    //console.log(registry.getFilterList(listOfNumberPlates));
})

//clear list event listener
if (plateList.innerHTML.length == 0) {
    clearBtn.style.display = "none";
    plateList.classList.add("number-plates-two");
    plateList.innerHTML = noData; 
}

clearBtn.addEventListener("click", () => {
    plateList.innerHTML = noData;
    clearBtn.style.display = "none";
    localStorage.clear();

    //add class
    plateList.classList.add("number-plates-two");
})

//guide close btn
closeBtn.addEventListener("click", () => {
    guideContaner.style.display = "none";
   
    data.setData("guide", "closed");
})
if (data.getData("guide") === null) {
    guideContaner.style.display = "block";
} else {
    guideContaner.style.display = "none";
}










