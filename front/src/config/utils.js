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
