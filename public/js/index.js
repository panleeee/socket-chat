$(document).ready(function() {
    $("#signInSubmit").on("click", function() {
        $.ajax({
            dataType: "JSON",
            url: "/signIn",
            type: "POST",
            data : $("#signInForm").serialize(),
            success: function(data) {
                if (data == "failed")
                    alert("ID 또는 비밀번호를 확인하세요");
            }
        })
    });

    $("#signUpSubmit").on("click", function() {
        $.ajax({
            dataType: "JSON",
            url: "/signUp"
            type : "POST",
            data : $("#signUpForm").serialize(),
            success: function(data) {

            };
        });
    });

    $("#signUpId").focusout(function() {
        $.ajax({
            dataType: "JSON",
            url: "/checkID",
            type: "POST",
            data: $("#signUpId").val(),
            success: function(data) {

            }
        });
    });

    $("#signUpEmail").focusout(function() {
        $.ajax({
            dataType: "JSON",
            url: "/checkEmail",
            type: "POST",
            data: $("#signUpEmail").val(),
            success: function(data) {

            }
        });
    });

    $("#signUpNick").focusout(function () {
      $.ajax({
        dataType : "JSON",
        url: "/checkNickname",
        type : "POST",
        data : $("#signUpNick").val(),
        success : function (data) {

        };
      });
    });
});
