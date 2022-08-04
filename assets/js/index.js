const getUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    data: null,
    // handers: {
    //   Authorization: localStorage.getItem("token"),
    // },
    success: (res) => {
      //   const { status, message } = data;
      if (res.status !== 0) return layui.layer.msg("数据请求失败！");
      //   console.log(res);
      // 调用 renderAvatar 渲染用户头像
      renderAvatar(res.data);
    },
  });
};
const renderAvatar = (data) => {
  let name = data.nickname || data.username;
  //   设置欢迎文本
  $("#welcome").html("欢迎" + name);
  if (data.user_pic != null) {
    $(".layui-nav-img").attr("src", data.user_pic);
    $(".txt-avatar").hide();
  } else {
    // 渲染文本头像
    $(".txt-avatar").hide();
    let forstName = name[0].toUpperCase();
    $(".txt-avatar").html(firstName);
  }
};
getUserInfo();
$("#exitBtn").click(function () {
  layui.layer.confirm(
    "确定退出登录？",
    { icon: 3, title: "提示" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
});
