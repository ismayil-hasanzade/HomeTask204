function setState(initialVal){
    var val = initialVal || undefined
    
    return [
        ()=>{return val},
        (newVal)=>{
             val = newVal
            
        }
        ]
}

var [msg, setMsg] = setState('hello')

setMsg('world')
console.log(msg())