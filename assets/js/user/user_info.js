const form = layui.form;

form.verify({
  nickname: (val) => {
    if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
  },
  email: [/@/, "邮箱格式输入错误"],
});

const initUserInfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: (res) => {
      const { status, message, data } = res;
      if (status !== 0) return layer.msg(message);
      form.val("formUserInfo", data);
    },
  });
};
initUserInfo();
$("#resetBtn").click(function (e) {
  e.preventDefault();
  initUserInfo();
});
// 更新用户数据
$(".layui-form").on("submit", (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/my/userinfo",
    // data: $(".layui-form").serialize(),
    data: form.val("formUserInfo"),
    success: (res) => {
      if (res.status !== 0) return layer.msg("更新用户信息失败！");
      layer.msg("更新用户信息成功！");
      // 调用父页面渲染函数
      window.parent.getUserInfo();
    },
  });
});
