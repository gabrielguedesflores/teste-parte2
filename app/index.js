function requestGitHub(param) {
	let url = 'https://api.github.com/';
	let urlRequest = url + param;
	let request = new XMLHttpRequest();
	request.open("GET", urlRequest, false);
	request.send();
	return request.responseText;
}

function createRow(data) {
	var tbody = document.querySelector('tbody');
	var tr = document.createElement("tr");
	var tdId = document.createElement("td");
	var tdContri = document.createElement("td");
	var tdContNum = document.createElement("td");
	var tdTag = document.createElement("td");
	var btnTag = document.createElement("input");
	btnTag.type = "button";
	if (data.contributions >= 100 && data.contributions < 200) {
		btnTag.value = "+100"
		btnTag.className = "btn btn-warning btn-sm";
	}
	if (data.contributions >= 200 && data.contributions < 500) {
		btnTag.value = "+200";
		btnTag.className = "btn btn-success btn-sm";
	}
	if (data.contributions >= 500) {
		btnTag.value = "+500";
		btnTag.className = "btn btn-info btn-sm";
	}
	if (data.contributions < 100) {
		btnTag.value = "-100";
		btnTag.className = "btn btn-danger btn-sm";
	}
	tr.appendChild(tdId);
	tr.appendChild(tdContri);
	tr.appendChild(tdContNum);
	tr.appendChild(tdTag);
	tdTag.appendChild(btnTag);
	tbody.appendChild(tr);
	tdId.innerHTML = data.id;
	tdContri.innerHTML = data.login;
	tdContNum.innerHTML = data.contributions;
	return tbody
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

function filter() {
	var $rows = $('#table tr');
	$('#search').keyup(function () {
		var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

		$rows.show().filter(function () {
			var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
			return !~text.indexOf(val);
		}).hide();
	});
}

function main() {
	var data = requestGitHub('repos/twbs/bootstrap/contributors');
	data = JSON.parse(data).slice(0, 20);
	data.forEach(element => {
		createRow(element);
	});
}

main();
dataTables();