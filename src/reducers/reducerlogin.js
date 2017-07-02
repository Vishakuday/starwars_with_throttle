export default function(state=false,action){
switch(action.type){
case 'TOGGLELOGGEDIN':
return !state;
}
return state;
}