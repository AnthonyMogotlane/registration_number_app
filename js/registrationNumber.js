const registrationNumber = () => {
    let regNum;
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
        if(!/CF|CL|CA|CK/.test(setConvert())) return "Only CF, CL, CA, CK Town indicators allowed";
    }
    const getValidation = () => setValidation();
    //set a list of registration numbers
    const setListOfRegNum = () => {
        
    }

    return {
        setInput,
        getInput,
        setConvert,
        getConvert,
        setValidation,
        getValidation,
        setListOfRegNum
    }
}

let test = registrationNumber();

test.setInput("ca 785-358   1");

console.log(test.getInput())
console.log(test.getConvert())