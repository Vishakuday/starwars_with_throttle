export default function(state=[],action){
switch(action.type){
case 'SETPLANETS':
return action.payload;
}
return state;
}