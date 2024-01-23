var myData = [];

loadData();


$(".saveEdit").on("click", function(){
    var nameValue = $("#nameEdit").val();
    var descriptionValue = $("#descriptionEdit").val();
    var priceValue = $("#priceEdit").val();
    var categoryValue = $("#categoryEdit").val();
    var recordIndexValue = $("#recordIndex").val();

    var record = {
        name: nameValue,
        description: descriptionValue,
        price: priceValue,
        category: categoryValue
    }
    myData[recordIndexValue] = record;
    var jsonString = JSON.stringify(myData);
    //Lưu dữ liệu vào localStorage
    localStorage.setItem("data", jsonString);
    location.reload();
})

$(".recordEdit").on("click", function(){
    //Lay thong tin
    var selectedRecord = $(this).closest("tr");
    var name = selectedRecord.find("td:nth-child(2)").text()
    var description = selectedRecord.find("td:nth-child(3)").text()
    var price = selectedRecord.find("td:nth-child(4)").text()
    var category = selectedRecord.find("td:nth-child(5)").text()
    var index = selectedRecord.find("td:nth-child(6)").text()

    //Hien thi
    $("#nameEdit").val(name)
    $("#descriptionEdit").val(description)
    $("#priceEdit").val(price)
    $("#categoryEdit").val(category)
    $("#recordIndex").val(index)

})

$("button.deleteRecord").on("click", function(){
    var clickedButton = $(this);
    myData.splice(clickedButton.val(),1)
    var jsonString = JSON.stringify(myData);
    //Lưu dữ liệu vào localStorage
    localStorage.setItem("data", jsonString);
    location.reload();
    clickedButton.closest("tr").remove();
})

function loadData() {
    var jsonString = localStorage.getItem('data');
    if (jsonString) {
        myData = JSON.parse(jsonString);
        for (const records of myData) {
            var innerHTML = `
        <tr class="deletedCheckbox" value="${myData.indexOf(records)}">
            <td><input class="recordCheckbox" value="${myData.indexOf(records)}" type="checkbox"/></td>
            <td>${records.name}</td>
            <td>${records.description}</td>
            <td>$${records.price}</td> 
            <td>${records.category}</td>
            <td class="hidden">${myData.indexOf(records)}</td>
            <td>
                <button type="button" class="recordEdit btn btn-info" 
                data-toggle="modal" 
                data-target="#updateModal">
                    <span class="glyphicon glyphicon-edit"></span> Edit
                </button>
                <button type="button" class="deleteRecord btn btn-danger" 
                value="${myData.indexOf(records)}">
                    <span class="glyphicon glyphicon-trash"></span> Delete
                </button>
            </td>
        </tr>
        `;
                // data-toggle="modal" 
                // data-target="#deleteRecordModal"
            $("#myTable").append(innerHTML)
        }
    }
}

function saveData() {
    var nameValue = $("#nameInput").val();
    var descriptionValue = $("#descriptionInput").val();
    var priceValue = $("#priceInput").val();
    var categoryValue = $("#categoryInput").val();

    var userData = {
        name: nameValue,
        description: descriptionValue,
        price: priceValue,
        category: categoryValue
    };

    myData.push(userData);
    //Chuyen doi tuong thanh chuoi JSON
    var jsonString = JSON.stringify(myData);

    //Lưu dữ liệu vào localStorage
    localStorage.setItem("data", jsonString);
    location.reload();
}

function selectAllRecords() {
    var checkedSelectedAll = $("input#selectAllRecords");
    var allRecordCheckbox = $("input.recordCheckbox");
    if (checkedSelectedAll.is(":checked") == true) {
        for (var i = 0; i < allRecordCheckbox.length; i++) {
            allRecordCheckbox[i].checked = true;
        }
    } else {
        for (var i = 0; i < allRecordCheckbox.length; i++) {
            allRecordCheckbox[i].checked = false;
        }
    }
}

function deleteSelected() {
    var selectedCheckboxes = $('input.recordCheckbox:checked');
    var indexes = [];

    selectedCheckboxes.each(function (index, element) {
        indexes.push(element.value);
    })

    var newMyData = [];
    myData.forEach(function (value, index) {
        if (!indexes.includes(index.toString())) {
            newMyData.push(value);
        }
    })
    myData = newMyData;

    //Lưu dữ liệu vào localStorage
    var jsonString = JSON.stringify(myData);
    localStorage.setItem("data", jsonString);
    location.reload();
}

// $("#myInput").on("keyup", function () {
//     var value = $(this).val().toLowerCase();
//     $("#myTable").child("tr").filter(function () {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
//     });
//   });