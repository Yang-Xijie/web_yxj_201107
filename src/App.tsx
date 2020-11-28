import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import "antd/dist/antd.css";
import { message, Button, Input } from "antd";

// 导入查询语句
import { GetUserList as GET_USER_LIST } from "./api/user.graphql";
// 导入查询的具体函数/变量(由codegen生成)
import { GetUserList } from "./api/types";

import { GetUserPassword as GET_USER_PASSWORD } from "./api/user.graphql";
import { GetUserPassword, GetUserPasswordVariables } from "./api/types";

// 1 (接口只是定义了一种参数传递和返回return的规范)
// interface USER_INFO_Props {}
// const USER_INFO: React.FC<USER_INFO_Props> = () => {

// 2
// const USER_INFO: React.FC = () => {

// 3 (可见不声明USER_INFO是一个react函数式组件也可以,默认就是了)
// const USER_INFO= () => {

const App: React.FC = () => {
  document.title = `web_yxj_201107`; // 设置浏览器的标签标题

  const [username, setUsername] = useState<string>();
  const [userpassword, setUserpassword] = useState<string>();
  // const [queryPassword, setQueryPassword] = useState<string>();

  const onNameChange = (e: any) => {
    setUsername(e.target.value); // 获取姓名输入框中的值, 存储到变量username中
  };

  const onPasswordChange = (e: any) => {
    setUserpassword(e.target.value); // 获取密码输入框中的值, 存储到变量userpassword中
  };

  // 获取所有用户的所有信息
  const {
    loading: userListLoading,
    error: userListError,
    data: userListData,
  } = useQuery<GetUserList>(GET_USER_LIST);

  // 获取指定用户(由姓名输入框更新到username)的密码
  // 结果存储在 userPasswordData!.user[0].password 中
  const { data: userPasswordData } = useQuery<
    GetUserPassword,
    GetUserPasswordVariables
  >(GET_USER_PASSWORD, {
    variables: { user_name: username },
  });

  // 这相当于你一直在请求数据.(如果这个函数不断被调用的话)
  // 难怪我的docker占CPU这么严重
  // 你一改变浏览器(前端)的状态,这个函数就会被调用一次
  const USER_INFO = () => {
    if (userListLoading) return <p>Loading...</p>;
    if (userListError) return <p>Error...</p>;
    const userList = userListData!.user.map(({ name, email, password }) => (
      <div>
        <p>
          {name}: {email}: {password}
        </p>
      </div>
    ));
    message.success("USER_INFO render!");
    return <div>{userList}</div>;
  };

  // // 函数:给进来一个用户的名字,在数据库查询这个用户的密码,返回这个用户的密码
  // const PasswordWithUsername = (name: string) => {
  //   return userPasswordData!.user[0].password;
  // };

  // 点击登陆发生的事情
  const handleLogin = () => {
    message.info("Button pushed!");
    // 没输入名字
    if (!username) {
      message.warning("Name null!");
      return;
    }
    // 没输入密码
    if (!userpassword) {
      message.warning("Password null!");
      return;
    }
    // 没查到名字为username(姓名输入框的字符串)的用户,及时return防止出现undefined
    if (!userPasswordData?.user[0]) {
      message.warning("No this user!");
      return;
    }
    if (username && userpassword && userPasswordData?.user[0]) {
      // 查询得到的密码值 === 密码输入框中的密码
      if (userPasswordData!.user[0].password === userpassword)
        message.success("Log in successfully!");
    }
  };

  // return返回页面内容给浏览器(其实是给了index,你会看到在index.tsx中有 <App /> 这一个函数式组件,这个就是本文件)
  return (
    <div>
      <h1>Log in</h1>
      <br />
      <Input onChange={onNameChange} size="middle" placeholder="user_name" />
      <br />
      <br />
      <Input
        onChange={onPasswordChange}
        size="middle"
        placeholder="user_password"
      />
      <br />
      <br />
      <Button onClick={handleLogin} type="primary">
        Log in
      </Button>
      <br />
      username={username}
      <br />
      userpassword={userpassword}
      <br />
      <br />
      <p>show user list here</p>
      <USER_INFO /> {/* 加载用户信息: 姓名+邮箱 */}
    </div>
  );
};

export default App;
