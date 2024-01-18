$("#myInput").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function(){
        $(this).filter($(this).text().toLowerCase().indexValue(value) > -1);
    })
})

tableRow = $("#myTable tr")
console.log(tableRow)