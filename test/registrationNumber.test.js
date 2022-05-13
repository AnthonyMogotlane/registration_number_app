
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
    })
    // set list of registration numbers
    describe("set list of registration numbers", () => {
        it("should return the list of all registration numbers added", () => {
            let registration = registrationNumber();
            registration.setInput("CF 654-953");
            registration.setInput("CA 654-953");
            registration.setInput("CL 654-953");
            registration.setInput("CJ 654-953");
            assert.equal(registration.getListOfRegNum(), "Enter a registration number");
        })

        it("should return ['CA 986-684', 'CF 658-258'] if 'CA 986-684' and CF 658-258' have been added", () => {
            let registration = registrationNumber();
            registration.setInput("CA 986-684");
            registration.setInput("CF 658-258");
            assert.equal(registration.getListOfRegNum(), ['CA 986-684', 'CF 658-258']);
        })
    })
})