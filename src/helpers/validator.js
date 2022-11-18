export const is_letters = (str) => {
    var regex = /^[a-zA-Z]+$/;
    if(regex.test(str)){
        return true; 
    }else{
        return false; 
    }
} 

export const is_numbers = (str) => {
    var regex = /^[0-9]*$/;
    if(regex.test(str)){
        return true; 
    }else{
        return false; 
    }
} 