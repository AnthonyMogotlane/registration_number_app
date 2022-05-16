
describe("The registrationNumber function", () => {
    // test if is gonna get the input value that has been entered.
    describe("set the input value", () => {
        it("should get the input value that has been entered", () => {
            let registration = registrationNumber();
            registration.setInput("registration number");
            assert.equal(registration.getInput(), "registration number");
        })

        it("should get 'CF 583-154' if the input is 'CF 583-154'", () => {
            let registration = registrationNumber();
            registration.setInput("CF 583-154");
            assert.equal(registration.getInput(), "CF 583-154");
        })
    })
    // convert the input to trimmed uppercase value
    describe("capitalize & trim input value", () => {
        it("should return 'CF 832-784' if the input is 'cf 832-784'", () => {
            let registration = registrationNumber();
            registration.setInput("cf 832-784")
            assert.equal(registration.getConvert(), "CF 832-784");
        })

        it("should return 'CA 321-654' if the input is '  ca 321-654  '", () => {
            let registration = registrationNumber();
            registration.setInput("  ca 321-654   ");
            assert.equal(registration.getConvert(), "CA 321-654");
        })
    })
    // validate the input value
    describe("set validations for input value", () => {
        it("should warn the user to enter a registration number if the input is blank", () => {
            let registration = registrationNumber();
            registration.setInput("");
            assert.equal(registration.getValidation(), "Enter a registration number");
        })

        it("should notify the user that only registration numbers with indicator CF, CL, CA, CK can be added to the app", () => {
            let registration = registrationNumber();
            registration.setInput("CV 584-516");
            assert.equal(registration.getValidation(), "Only CF, CL, CA, CK Town indicators allowed");
        })

        it("should return 'Registration number should be less that 10 charactors' if the input value is more than 10 charactors", () => {
            let registration = registrationNumber();
            registration.setInput("cf 58684-5877");
            assert.equal(registration.getValidation(), "Registration number is lessthan 10 charactors");
        })

        it("should return 'Invalid charator input' if input value includes non-alphanumeric charator except '-'", () => {
            let registration = registrationNumber();
            registration.setInput("ck 585:235");
            assert.equal(registration.getValidation(), "Invalid character input");
        })

        it("should return valid registration number if the input is a valid", () => {
            let registration = registrationNumber();
            registration.setInput("CL 954-623");
            assert.equal(registration.getValidation(), "CL 954-623");
        })
    })
    // set list of registration numbers
    describe("set list of registration numbers", () => {
        it("should return the list of all registration numbers added", () => {
            let registration = registrationNumber();
            registration.setInput("CF 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CA 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CL 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CK 654-953");
            registration.setListOfRegNum(registration.setValidation())
            assert.deepEqual(registration.getListOfRegNum(), ["CF 654-953", "CA 654-953", "CL 654-953", "CK 654-953"]);
        })

        it("should return ['CA 986-684', 'CF 658-258'] if 'CA 986-684' and CF 658-258' have been added", () => {
            let registration = registrationNumber();
            registration.setInput("CA 986-684");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CF 658-258");
            registration.setListOfRegNum(registration.setValidation())
            assert.deepEqual(registration.getListOfRegNum(), ['CA 986-684', 'CF 658-258']);
        })
    })
    // set selected town
    describe("set town", () => {
        it("should return the selected town", () => {
            let registration = registrationNumber();

            registration.setTown("kuilsriver");

            assert.equal(registration.getTown(), "kuilsriver")
        })

        it("should return 'malmesbury' if the selected town is 'malmesbury'", () => {
            let registration = registrationNumber();

            registration.setTown("malmesbury");

            assert.equal(registration.getTown(), "malmesbury");
        })
    })
    // filter to get only registration numbers for that city
    describe("filter town registration number list", () => {
        it("should return list of registration numbers for selected city", () => {
            let registration = registrationNumber();
            registration.setInput("CF 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CA 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CL 654-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CK 654-953");
            registration.setListOfRegNum(registration.setValidation())

            registration.setTown("kuilsriver")

            assert.deepEqual(registration.getFilterList(registration.getListOfRegNum()), ["CF 654-953"]);
        })

        it("should return ['CA 158-458', 'CA 235-953'] for input 'CA 158-458', 'CA 235-953', 'CL 954-953',and 'CK 354-953' if the selected town is 'Cape Town'", () => {
            let registration = registrationNumber();

            registration.setInput("CA 158-458");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CA 235-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CL 954-953");
            registration.setListOfRegNum(registration.setValidation())
            registration.setInput("CK 354-953");
            registration.setListOfRegNum(registration.setValidation())

            registration.setTown("cape town");

            assert.deepEqual(registration.getFilterList(registration.getListOfRegNum()), ["CA 158-458", "CA 235-953"]);
        })
    })
})