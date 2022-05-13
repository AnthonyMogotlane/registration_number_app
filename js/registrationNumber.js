const registrationNumber = () => {
    let regNum;
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
        if(setConvert() === "") return "Enter a registration number";
        if(setConvert().length > 10) return "Registration number should be less that 10 charactors";
        if(!/CF|CL|CA|CK/.test(setConvert())) return "Only CF, CL, CA, CK Town indicators allowed";
        if(/[~!@#$%^&*()+_"?><:]/.test(setConvert())) return "Invalid charator input";
        return validatedInput = setConvert();
    }
    const getValidation = () => setValidation();
    //set a list of registration numbers
    const setListOfRegNum = item => {
        if(validatedInput === setConvert()) {
            if(item !== undefined) {
                listOfRegNum.push(item);
            }
        }
        return listOfRegNum
    }
    //get the list registration numbers added
    const getListOfRegNum = () => setListOfRegNum();

    return {
        setInput,
        getInput,
        setConvert,
        getConvert,
        setValidation,
        getValidation,
        setListOfRegNum,
        getListOfRegNum
    }
}

let test = registrationNumber();

test.setInput("ca 365-951");
test.setListOfRegNum(test.getValidation())

test.setInput("cK 365-548");
test.setListOfRegNum(test.getValidation())


console.log(test.getListOfRegNum());