const registrationNumber = () => {
    let regNum;
    let townName;
    let validatedInput;
    let listOfRegNum = [];
    //set the input value
    const setInput = inputValue => regNum = inputValue;
    //get the input value
    const getInput = () => regNum;
    //set list of registration numbers variable
    const setListOfRegNumVar = arr => arr = listOfRegNum;
    //get the list of registration numbers variable
    const getListOfRegNumVar = () => listOfRegNum;
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
        if (setConvert().length > 10) return "Registration number is lessthan 10 charactors";
        if (!/CF|CL|CA|CK/.test(setConvert())) return "Only CF, CL, CA, CK Town indicators allowed";
        if (/[~!@#$%^&*()+_"?><:]/.test(setConvert())) return "Invalid character input";
        if (!(/\w{2}\s\d{3}-\d{3}|\w{2}\s\d{5,6}|\w{2}\s\d{3}\s\d{3}/).test(setConvert())) return "Invalid Registratin Number";
        return validatedInput = setConvert();
    }
    const getValidation = () => setValidation();
    //set a list of registration numbers
    const setListOfRegNum = item => {
        if (validatedInput === setConvert()) {
            if(!listOfRegNum.includes(validatedInput)) {
                if (item !== undefined) listOfRegNum.push(item);
            }
        }
        return listOfRegNum;
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
    const setFilterList = arr => {
        for(let town in towns) {
            if(town === getTown()) return (arr.filter(num => num.includes(towns[town])))
        }
    }
    //get the filter list
    const getFilterList = list => setFilterList(list);

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
        getFilterList,
        getListOfRegNumVar
    }
}