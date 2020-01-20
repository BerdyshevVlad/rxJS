import { Observable } from "rxjs";

//#region simple; with complete
//1)
// var observable = Observable.create(function subscribe(observer:any){
//     try{
//     observer.next('Hey guys!')
//     observer.next('How are you?')
//     observer.complete()   //==unsubscribe()
//     observer.next('This will not send!')
//     }catch(err){
//         observer.error(err); 
//     }
// });

//the same, but with arrow function
//var observable = Observable.create((observer:any)=>{
//    observer.next('Hey guys!')
//});

//observable.subscribe((x:any)=>console.log(x));
//observable.subscribe(
//    (x:any)=>addItem(x),
//    (error:any)=>addItem(error),
//    ()=>addItem('Completed')
//    );

// var observer = observable.subscribe(
//     (x:any)=>addItem(x),
//     (error:any)=>addItem(error),
//     ()=>addItem('Completed')
//     );

//#endregion simple; with complete

//#region  realization with setInterval and setTimeout
//2)
var observable2 = Observable.create(function subscribe(observer:any){
    try{
    observer.next('Hey guys!')
    observer.next('How are you?')
    setInterval(()=>{
        observer.next('I am good',10)
    })
    }catch(err){
        observer.error(err);   
    }
});

var observer2 = observable2.subscribe(
    (x:any)=>addItem(x),
    (error:any)=>addItem(error),
    ()=>addItem('Completed')
    );
    

setTimeout(()=>{
    observer2.unsubscribe();
    addItem('Unsubscribed!')
},61)
//#endregion realization with setInterval and setTimeout

//#region observers synchronation
//3)
//while observer2 will unsubscribe, observer3 will be called infinitely
var observer3 = observable2.subscribe(
    (x:any)=>addItem(x)
    );

// to synchronize observer2 and observer3
observer2.add(observer3);
//#endregion observers synchronation


function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}