// resources/js/custom.js

// Include CSRF token in AJAX requests
$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ready(function () {
    // Initialize DataTable
    $("#studentsTable").DataTable();

    // Add Student Modal
    $("#addStudentBtn").click(function () {
        $("#addStudentModal").modal("show");
    });

    // Edit Student Modal
    $(".editStudentBtn").click(function () {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var studentClass = $(this).data("class");

        // Populate the edit modal with existing data
        $("#editStudentModal #editStudentId").val(id);
        $("#editStudentModal #editStudentName").val(name);
        $("#editStudentModal #editStudentClass").val(studentClass);

        $("#editStudentModal").modal("show");
    });

    // Submit Add Student Form using Ajax
    $("#addStudentForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/students/store",
            data: $(this).serialize(),
            success: function (response) {
                alert(response.success);
                location.reload();
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    // Submit Edit Student Form using Ajax
    $("#editStudentForm").submit(function (e) {
        e.preventDefault();

        var id = $("#editStudentId").val();

        $.ajax({
            type: "PUT",
            url: "/students/update/" + id,
            data: $(this).serialize(),
            success: function (response) {
                alert(response.success);
                location.reload();
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    // Update Student Status using Ajax
    $(".statusCheckbox").change(function () {
        var id = $(this).data("id");
        var status = $(this).prop("checked") ? 1 : 0;

        $.ajax({
            type: "PUT",
            url: "/students/update/" + id,
            data: { status: status },
            success: function (response) {
                alert(response.success);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    // Delete Student using Ajax
    $(".deleteStudentBtn").click(function () {
        var id = $(this).data("id");

        if (confirm("Are you sure you want to delete this student?")) {
            $.ajax({
                type: "DELETE",
                url: "/students/delete/" + id,
                success: function (response) {
                    alert(response.success);
                    location.reload();
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    });

    // Disable edit and delete buttons if only one student
    if ($(".editStudentBtn").length === 1) {
        $(".editStudentBtn").prop("disabled", true);
        $(".deleteStudentBtn").prop("disabled", true);
    }
});
