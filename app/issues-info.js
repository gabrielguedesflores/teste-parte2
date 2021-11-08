var getParam = window. location;
getParam = getParam.search.replace('?id=', '');
console.log(getParam);

function requestGitHub(url){
    let urlRequest = url;
    let request = new XMLHttpRequest();
    request.open("GET", urlRequest, false);
    request.send();
    return request.responseText;
}

function createForm(data){
    var divJs = document.getElementById("form-js");
    var form = document.createElement("form");
    var divFormGrupOne = document.createElement("div");
    var divFormGrupTwo = document.createElement("div");
    var divFormGrupThree = document.createElement("div");
    var inputTitleLabel = document.createElement("label")
    var inputTitle = document.createElement("input");
    var inputBodyLabel = document.createElement("label")
    var inputBody = document.createElement("textarea");
    var h3 = document.createElement("h3");
    divFormGrupOne.className = "mb-3";
    divFormGrupOne.setAttribute('id', 'div-form-js');
    divFormGrupTwo.className = "mb-3";
    divFormGrupTwo.setAttribute('id', 'div-form-js');
    divFormGrupThree.className = "mb-3";
    divFormGrupThree.setAttribute('id', 'div-form-js');
    inputTitleLabel.innerHTML = "Título";
    inputTitle.type = "text";
    inputTitle.className = 'form-control';
    inputTitle.setAttribute('value', data.title);
    inputBodyLabel.innerHTML = "Descrição";
    inputBody.type = "text";
    inputBody.className = 'form-control';
    inputBody.rows = 8;
    inputBody.innerHTML = data.body;
    h3.innerHTML = '<br>Comentários <br>';   
    form.appendChild(divFormGrupOne);
    form.appendChild(divFormGrupTwo);
    form.appendChild(divFormGrupThree);
    divFormGrupOne.appendChild(inputTitleLabel);
    divFormGrupOne.appendChild(inputTitle);
    divFormGrupTwo.appendChild(inputBodyLabel);
    divFormGrupTwo.appendChild(inputBody);
    divFormGrupTwo.appendChild(h3);
    divJs.appendChild(form);
    
    // var inputCommentsLabel = document.createElement("label");    
    // var inputComments = document.createElement("textarea");
    // inputCommentsLabel.innerHTML = "Comentário de " + comments.user.login;
    // inputCommentsLabel.setAttribute('id', 'basic-addon1');
    // inputComments.type = "text";
    // inputComments.className = 'form-control';
    // inputComments.rows = 3;
    // inputComments.innerHTML = comments.body;    
    // divFormGrupThree.appendChild(inputCommentsLabel);
    // divFormGrupThree.appendChild(inputComments);

    // var commentsAlert = document.createElement("div");
    // commentsAlert.innerHTML = 'Nenhum comentário encontrado';
    // commentsAlert.className =  'alert alert-danger';
    // divFormGrupThree.appendChild(commentsAlert);

    return divJs;
}

function createComments(comments) {
    var divMain = document.getElementById('form-js');
    var divComments = document.createElement('div');
    var inputCommentsLabel = document.createElement("label");    
    var inputComments = document.createElement("textarea");    
    inputCommentsLabel.innerHTML = "Comentário de @" + comments.user.login + '';
    inputCommentsLabel.className = 'mt-2';
    inputCommentsLabel.setAttribute('id', 'basic-addon1');
    inputComments.type = "text";
    inputComments.className = 'form-control';
    inputComments.rows = 3;
    inputComments.innerHTML = comments.body; 
    divComments.appendChild(inputCommentsLabel);
    divComments.appendChild(inputComments);
    divMain.appendChild(divComments);
    return divMain;
}

function createAlert(){
    var div = document.getElementById("form-js");
    var commentsAlert = document.createElement("div");
    commentsAlert.innerHTML = 'Nenhum comentário encontrado';
    commentsAlert.className =  'alert alert-danger';
    div.appendChild(commentsAlert);
    return div;
}

function main(){
    var data = requestGitHub('https://api.github.com/repos/twbs/bootstrap/issues/' + getParam);
    var comments = requestGitHub('https://api.github.com/repos/twbs/bootstrap/issues/'+getParam+'}/comments');
    data = JSON.parse(data);
    comments = JSON.parse(comments);
    createForm(data);

    if(comments.length > 0){
        comments.forEach(element => {
            createComments(element);
        });   
    }else{
        createAlert();
    }

}

main();

  
