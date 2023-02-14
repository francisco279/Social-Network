const randomNumber = () => {
    const possible   = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomNumber = 0;
    for (let i = 0; i < 6; i++) 
    {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)) //select an element inside of possible 
    }
    return randomNumber;
}

module.exports = randomNumber;