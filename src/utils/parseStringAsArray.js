module.exports =  function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map( (item) => {
         let firstLetter = item[0];

            ( item.length > 2) 
                ?  item =  firstLetter.toUpperCase() + word.slice(1)
                :  item =  firstLetter + word.slice(1);
           
        item.trim() 
        console.log(item);
    });
    
} 