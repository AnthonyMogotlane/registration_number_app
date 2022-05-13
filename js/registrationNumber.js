const registrationNumber = () => {
    let regNum;
    let townName;
    let validatedInput;
    let listOfRegNum = [];
    //set the input value
    const setInput = inputValue => regNum = inputValue;
    //get the input value
    const getInput = () => regNum;
    //convert indicators to uppercase & trim extra spaces
    const setConvert = () => {
        return getInput().split("").map(letter => {
            if (typeof letter === "string") return letter.toUpperCase()
        }).join("").trim();
    }
    // get the converted output
    const getConvert = () => setConvert();
    // validate the input value
    const setValidation = () => {
        if (setConvert() === "") return "Enter a registration number";
        if (setConvert().length > 10) return "Registration number should be less that 10 charactors";
        if (!/CF|CL|CA|CK/.test(setConvert())) return "Only CF, CL, CA, CK Town indicators allowed";
        if (/[~!@#$%^&*()+_"?><:]/.test(setConvert())) return "Invalid charator input";
        return validatedInput = setConvert();
    }
    const getValidation = () => setValidation();
    //set a list of registration numbers
    const setListOfRegNum = item => {
        if (validatedInput === setConvert()) {
            if (item !== undefined) {
                listOfRegNum.push(item);
            }
        }
        return listOfRegNum
    }
    //get the list registration numbers added
    const getListOfRegNum = () => setListOfRegNum();
    //set the name of the town to filter
    const setTown = selectTown => townName = selectTown;
    //get the town
    const getTown = () => townName  ;
    //filter list with registration number indicator
    let towns = {
        "malmesbury": "CK",
        "stellenbosch": "CL",
        "cape town": "CA",
        "kuilsriver": "CF",
    }
    const setFilterList = () => {
        for(let town in towns) {
            if(town === getTown()) {
                return (getListOfRegNum().filter(num => num.includes(towns[town])))
            }
        }
    }
    //get the filter list
    const getFilterList = () => setFilterList();

    return {
        setInput,
        getInput,
        setConvert,
        getConvert,
        setValidation,
        getValidation,
        setListOfRegNum,
        getListOfRegNum,
        setTown,
        getTown,
        setFilterList,
        getFilterList
    }
}

let registration = registrationNumber();
registration.setInput("CF 654-953");
registration.setListOfRegNum(registration.setValidation())
registration.setInput("CA 654-953");
registration.setListOfRegNum(registration.setValidation())
registration.setInput("CL 654-953");
registration.setListOfRegNum(registration.setValidation())
registration.setInput("CK 654-953");
registration.setListOfRegNum(registration.setValidation())

registration.setTown("kuilsriver");

console.log(registration.getTown());
console.log(registration.setFilterList());