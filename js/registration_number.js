//variables
//references to the DOM elements
const regNumInput = document.querySelector(".reg-num-one");
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");
const dropdown = document.querySelector("#towns");
const plateList = document.querySelector(".number-plates");
const headerContent = document.querySelector(".header-content");
const guideContainer = document.querySelector(".guide-container")
const closeBtn = document.querySelector(".close-btn");
const item = document.querySelector(".plate");

//instance of registrationNumber factory function
let registry = registrationNumber();
//instance of storage function
let data = storage();

//list of registration numbers
let listOfNumberPlates;

//create number plate function
const createNumberPlate = list => {
    plateList.innerHTML = "";
    for (let plateItem of list) {
        const li = document.createElement("li");
        li.className = "plate flex column justify-center align-center";
        li.appendChild(document.createTextNode(plateItem));
        plateList.insertBefore(li, plateList.children[0]);
    }
}

//create alert message function
const alertMsg = (theClass, theMsg) => {
    const p = document.createElement("p");
    p.className = `flex column justify-center align-center ${theClass}`;
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
        //update registration numbers list with the localStorage list
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

        //popup msg to update user when new item is added or it exist
        if (data.getData("registrationNumbers") !== null && data.getData("registrationNumbers").includes(registry.getValidation())) {
            alertMsg("warn-msg", "Registration Number Exist!");
        } else {
            alertMsg("update-msg", "Registration Number Added");
        }
        //store list to localStorage
        data.setData("registrationNumbers", listOfNumberPlates)
        //show clear list button
        clearBtn.style.display = "block";
    } else {
        alertMsg("error-msg", registry.getValidation());
    }

    //clear input
    regNumInput.value = "";
    //reset drop down selection
    dropdown.selectedIndex = 0;
   
})

//display registration numbers stored in local storage
listOfNumberPlates = data.getData("registrationNumbers");
if (listOfNumberPlates !== null) createNumberPlate(listOfNumberPlates);

//msg to be displayed when the is no data/registration numbers
let noData = "<p class='no-data'>No Data! exist to display</p>";

//dropdown event listener
dropdown.addEventListener("change", () => {
    registry.setTown(dropdown.options[dropdown.selectedIndex].value);
    if (dropdown.options[dropdown.selectedIndex].value === "all" && data.getData("registrationNumbers") !== null) {
        createNumberPlate(listOfNumberPlates);
        //clear btn
        clearBtn.style.display = "block";
    } else {
        if (data.getData("registrationNumbers") !== null) {
            createNumberPlate(registry.getFilterList(listOfNumberPlates));
            //clear btn
            clearBtn.style.display = "block";
        }
        if (plateList.innerHTML.length == 0) {
            plateList.innerHTML = `<p class='no-data'>No Data! for ${dropdown.options[dropdown.selectedIndex].value}</p>`;
            //clear btn
            clearBtn.style.display = "none";
        }
        dropdown.options[dropdown.selectedIndex].value;
    }
})

//hide clear list button & show msg
if (plateList.innerHTML.length == 0) {
    clearBtn.style.display = "none";
    plateList.innerHTML = noData;
}

//clear list event listener
clearBtn.addEventListener("click", () => {
    //clear if the is something in the list
    while (plateList.hasChildNodes()) {
        plateList.removeChild(plateList.firstChild)
    }
    //clear localStorage
    localStorage.clear();
    //remove clear button
    clearBtn.style.display = "none";
    //Display msg when list is empty
    plateList.innerHTML = noData;
     //clear list in the program
     listOfNumberPlates = [];
})

//close btn for the guide
closeBtn.addEventListener("click", () => {
    guideContainer.style.display = "none";
    //store state of the guide
    data.setData("guide", "closed");
})

guideContainer.style.display = "none"
if (data.getData("guide") === null) {
    setTimeout(() => { guideContainer.style.display = "block" }, 1500)
} else {
    guideContainer.style.display = "none";
}

const removeItem = (e) => {
    if (confirm("Are you sure! you want to delete the registration number?")) {
        if (e.target.classList.contains("plate")) {
            e.target.remove();
        }
    }
}
plateList.addEventListener("dblclick", removeItem);












