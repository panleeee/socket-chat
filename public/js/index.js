$(document).ready(function() {
    $("#start").on("click",function () {
        $("#signInModal").modal("toggle");
    });
    $("#signUpBtn").on("click",function () {
        $("#signInModal").modal("toggle");
        $("#signUpModal").modal("toggle");
    });

    // $("#signInSubmit").on("click", function() {
    //     $.ajax({
    //         dataType: "JSON",
    //         url: "/signIn",
    //         type: "POST",
    //         data : $("#signInForm").serialize(),
    //         success: function(data) {
    //             if (data == "failed")
    //                 alert("ID 또는 비밀번호를 확인하세요");
    //         }
    //     })
    // });
    //
    // $("#signUpSubmit").on("click", function() {
    //     $.ajax({
    //         dataType: "JSON",
    //         url: "/signUp",
    //         type : "POST",
    //         data : $("#signUpForm").serialize(),
    //         success: function(data) {
    //             console.log(data);
    //         }
    //     });
    // });
    //
    // $("#signUpId").focusout(function() {
    //     $.ajax({
    //         dataType: "JSON",
    //         url: "/checkID",
    //         type: "POST",
    //         data: $("#signUpId").val(),
    //         success: function(data) {
    //             console.log(data['isExist']);
    //         }
    //     });
    // });
    //
    // $("#signUpEmail").focusout(function() {
    //     $.ajax({
    //         dataType: "JSON",
    //         url: "/checkEmail",
    //         type: "POST",
    //         data: $("#signUpEmail").val(),
    //         success: function(data) {
    //             console.log(data);
    //         }
    //     });
    // });
    //
    // $("#signUpNick").focusout(function () {
    //   $.ajax({
    //     dataType : "JSON",
    //     url: "/checkNickname",
    //     type : "POST",
    //     data : $("#signUpNick").val(),
    //     success : function (data) {
    //         console.log(data);
    //     }
    //   });
    // });
});
