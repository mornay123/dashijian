const baseUrl = "http://www.liulongbin.top:3007";

$.ajaxPrefilter((option) => {
  // 统一为有权限的接口，设置 headers 请求头
  if (option.url.includes("/my/")) {
    option.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
  option.url = baseUrl + option.url;
  option.complete = (res) => {
    console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //  强制清空 token
      localStorage.removeItem("token");
      // 强制跳转到登录页面
      location.href = "/login.html";
    }
  };
});
