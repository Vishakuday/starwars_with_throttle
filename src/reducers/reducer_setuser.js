export default function(state="",action){
switch(action.type){
case 'SETUSER':
return action.payload;
}
return state;
}