function requestGitHub(param) {
    let url = "https://api.github.com/";
    let urlRequest = url + param;
    let request = new XMLHttpRequest();
    request.open("GET", urlRequest, false);
    request.send();
    return request.responseText;
}

function createRow(data) {
    var tbody = document.querySelector("tbody");
    var tr = document.createElement("tr");
    var tdId = document.createElement("td");
    var tdTitulo = document.createElement("td");
    var tdAutor = document.createElement("td");
    var tdStatus = document.createElement("td");
    var tdActions = document.createElement("td");
    var href = document.createElement("a");
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Detalhes";
    btn.className = "btn btn-primary";
    href.setAttribute('href', 'issues-info.html?id=' + data.number);
    href.appendChild(btn);
    tr.appendChild(tdId);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdAutor);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    tdActions.appendChild(href);
    tbody.appendChild(tr);
    tdId.innerHTML = data.number;
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    title = data.title;
    function replaceTag(title) {
        return tagsToReplace[title] || title;
    }
    tdTitulo.innerHTML = replaceTag(title);
    tdAutor.innerHTML = data.user.login;
    tdStatus.innerHTML = data.state;
    return tbody;
}

function filter() {
    var $rows = $("#myTable tr");
    $("#search").keyup(function () {
        var val = $.trim($(this).val()).replace(/ +/g, " ").toLowerCase();
        $rows
            .show()
            .filter(function () {
                var text = $(this).text().replace(/\s+/g, " ").toLowerCase();
                return !~text.indexOf(val);
            })
            .hide();
    });
}

function dataTables() {
    $(document).ready(function () {
        $("#myTable").DataTable({
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "Nada encontrado",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "Nenhum registro disponível",
                infoFiltered: "(filtrado de _MAX_ registros no total)",
            },
        });
    });
}

function main() {
        var data = requestGitHub("repos/twbs/bootstrap/issues?state=all");
        data = JSON.parse(data);
        data.forEach((element) => {
            createRow(element);
            //console.log(element)
        });
}

main();
filter();
dataTables();
