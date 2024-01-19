var myData = [];

$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable").child("tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

loadData();
function loadData() {
    var jsonString = localStorage.getItem('data');
    if (jsonString) {
        myData = JSON.parse(jsonString);
        for (const records of myData) {
            var innerHTML = `
        <tr value="${myData.indexOf(myData)}">
            <td><input value="${myData.indexOf(myData)}" type="checkbox"/></td>
            <td>${records.name}</td>
            <td>${records.description}</td>
            <td>$${records.price}</td>
            <td>${records.category}</td>
            <td>
            <button type="button" class="btn btn-info">
                <span class="glyphicon glyphicon-edit"></span> Edit
            </button>
            <button type="button" class="btn btn-danger">
                <span class="glyphicon glyphicon-trash"></span> Delete
            </button>
            </td>
        </tr>
        `;
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