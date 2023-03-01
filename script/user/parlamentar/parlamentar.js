$(document).ready(function () {
    $("#searchParlamentary").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#parlamentarFilter").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});