function getAddtionalPrice(optionFullText) {
    const regex = /\[\+?\d+\.\d+/g;
    const matches = optionFullText.match(regex);
    console.log(matches);
    if (matches) {
        return Number(matches[0].replace("[", '').trim());
    }
    return 0;
}

const abc = getAddtionalPrice('[12.123]')
console.log(abc);
