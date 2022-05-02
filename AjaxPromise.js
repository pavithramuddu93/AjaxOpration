let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

function makeAjaxCall(methodType, url, async=true, data=null){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            // console.log(methodType+ " State Changed Called, Ready State: "+xhr.readyState+"  Status: "+ xhr.status);
            if(xhr.readyState === 4){
                if(xhr.status == 200 || xhr.status === 201){
                    resolve(xhr.responseText);
                }else if (xhr.status >= 400 ){
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 clint Error or 500 Server Error at: "+showTime());
                }
            }
        }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log( methodType+" request sent to the server at: " +showTime());
    });
}

const getUrl = "http://127.0.0.1:3000/employee/3";
makeAjaxCall("GET", getUrl, true)
        .then(responseText =>{
            console.log("Get UserData: "+responseText)
        })
        .catch(error => console.log("GET error Status: "+ JSON.stringify(error)));


const deleteUrl = "http://127.0.0.1:3000/employee/5";
makeAjaxCall("DELETE", deleteUrl, false)
        .then(responseText =>{
                console.log("Delete UserData: "+responseText)
        })
        .catch(error => console.log("Delete error Status: "+ JSON.stringify(error)));
    

const postUrl = "http://127.0.0.1:3000/employee";
const emplData = {"name": "Deep", "Salary": "59999"};
makeAjaxCall("POST", postUrl, true, emplData)
        .then(responseText =>{
            console.log("Post UserData: "+responseText)
        })
        .catch(error => console.log("Post error Status: "+ JSON.stringify(error)));
