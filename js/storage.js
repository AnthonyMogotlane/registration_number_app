const storage = () => {
    //set the localStorage
    //convert to string
    const setData = (key, value) => {
        //set the storage values, with relevant key and values
        localStorage.setItem(`${key}`, JSON.stringify(value))
    }
    //getting the stored data from localStorage depending on the key
    //convert to object
    const getData = key => {
        return JSON.parse(localStorage.getItem(`${key}`));
    }

    return {
        setData,
        getData
    }
}