export function postConfig(data=null) {
    let config =  {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        credentials: "same-origin"
    };

    if (data !== null) {
        config["body"] = JSON.stringify(data)
    }
    return config;
}

export function predictTag(tagCur){
    let vars = tagCur.split('.');
    if (vars[2] === '2'){
        vars[1] = String(+vars[1] + 1);
        vars[2] = '1';
    } else{
        vars[2] = '2';
    }
    return vars.join('.')
}
