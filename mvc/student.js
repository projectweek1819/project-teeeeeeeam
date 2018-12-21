// Schrijf hier je code
function onMouseDown(state, args) {
    return state + 1;
}

function onMouseDown2(state,args) {
    return {count: state.count + 1};
}

function counter3(){
    function onMouseDown(state, args){
        return {count: state.count + 1}
    }

    return { controller : { onMouseDown }};
}

function counter4(){
    function onMouseDown(state, args){
        return {count: state.count + 1}
    }
    function onKeyDown(state, args) {
        return {count: 0}
    }
    return { controller: {onKeyDown, onMouseDown} };
}

function counter5(){
    function onMouseDown(state, args){
        if (!args.shift) {
            return {count: state.count + 1}
        } else {
            if (state.count  == 0){
                return {count: 0}
            } else {
                return {count: state.count - 1}
            }
        }
    }
    
    function onKeyDown(state, args) {
        if (args.key == '0'){
            return {count: 0}
        } else {
            if (args.key == 'ArrowDown'){
                if(state.count == 0){
                    return {count: 0}   
                } else {
                    return {count: state.count - 1}
                }
            } else {
                if (args.key == 'ArrowUp'){
                    return {count: state.count + 1}
                } else {
                    return { count: state.count}
                }
            }
        }
        
    }

    return { controller: {onMouseDown, onKeyDown} };
}


function counter6(){
    function increment(state){
        // state.count += 1
        return {count : state.count + 1}
    }
    function decrement(state){
        // state.count -= 1
        if (state.count == 0){
            return {count:0}
        }
        return {count : state.count - 1}
    }
    function reset(state){
        // state.count = 0
        return {count: 0}
    }

    function onMouseDown(state, args){
        if (!args.shift) {
            return model.increment(state)
        } else {
            if (state.count  == 0){
                return model.reset(state)
            } else {
                return model.decrement(state)
            }
        }
    }
    
    function onKeyDown(state, args) {
        if (args.key == '0'){
            return model.reset(state)
        } else {
            if (args.key == 'ArrowDown'){
                if(state.count == 0){
                    return model.reset(state)   
                } else {
                    return model.decrement(state)
                }
            } else {
                if (args.key == 'ArrowUp' || args.key == " "){
                    return model.increment(state)
                } else {
                    return {count: state.count}
                }
            }
        }
        
    }

    const model = { increment, decrement, reset}
    const controller = { onMouseDown, onKeyDown }
    return { controller, model}
}

function counter7(){
    function increment(state){
        // state.count += 1
        return {count : state.count + 1}
    }
    function decrement(state){
        // state.count -= 1
        if (state.count == 0){
            return {count:0}
        }
        return {count : state.count - 1}
    }
    function reset(state){
        // state.count = 0
        return {count: 0}
    }
    function add(state, amount){
        if(amount < 0){
            for(var i = 0; i > amount; i--){
                model.decrement(state)
            }
        } else {
            for(var i = 0; i < amount; i++){
                model.increment(state)  
            }
        }

        return {count: state.count}
    }

    function onMouseDown(state, args){
        if (!args.shift) {
            return model.increment(state)
        } else {
            if (state.count  == 0){
                return model.reset(state)
            } else {
                return model.decrement(state)
            }
        }
    }
    
    function onKeyDown(state, args) {
        if (args.key == '0'){
            return model.reset(state)
        } else {
            if (args.key == 'ArrowDown'){
                if(state.count == 0){
                    return model.reset(state)   
                } else {
                    return model.add(state,-1)
                }
            } else {
                if (args.key == 'ArrowUp' || args.key == " "){
                    return model.add(state,1)
                } else {
                    return {count: state.count}
                }
            }
        }
        
    }

    const model = { increment, decrement, reset, add}
    const controller = { onMouseDown, onKeyDown }
    return { controller, model}
}
