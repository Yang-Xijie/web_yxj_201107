import React from "react";
// 导入react原生的一个hook,用来在组件中保存变量,这些变量的值在渲染时不会改变
import { useState } from "react";
// 导入apollo中的一个hook,用来在每次渲染的时候
import { useQuery } from "@apollo/client";
// 导入 ant design 组件和组件的样式表
import { message, Button, Input } from "antd";
import "antd/dist/antd.css";

// 成对导入查询语句(/src/api/*.graphql) 和 查询的变量类型(由codegen生成,src/api/types.ts)
import { GetUserList as GET_USER_LIST } from "./api/user.graphql";
import { GetUserList } from "./api/types";

import { GetUserPassword as GET_USER_PASSWORD } from "./api/user.graphql";
import { GetUserPassword, GetUserPasswordVariables } from "./api/types";

const App: React.FC = () => {
  document.title = `web_yxj_201107`; // 设置浏览器的标签标题

  // 设置两个值,username和userpassword;这两个值在浏览器渲染的时候会保留
  // 我的理解是,当页面中有东西改变的时候React就会重新渲染,这时相当于“初始化”,但是这些state不会初始化
  const [username, setUsername] = useState<string>();
  const [userpassword, setUserpassword] = useState<string>();

  // <Input />组件更改调用的回调函数
  const onNameChange = (e: any) => {
    setUsername(e.target.value); // 获取姓名输入框中的值, 存储到变量username中
  };
  const onPasswordChange = (e: any) => {
    setUserpassword(e.target.value); // 获取密码输入框中的值, 存储到变量userpassword中
  };

  // 获取所有用户的所有信息
  // useQuery是一个hook,网页渲染就会重新加载.也就是说,每次渲染都会去后端查询一次数据
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

  // 相当于一直在请求数据.一改变浏览器(前端)的状态,这个函数就会被调用一次
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
    // /* DEBUG */ message.info("USER_INFO render!");
    // 这里在输入名字的时候会渲染两次是因为输入名字的时候useQuery也更新了
    // 输入密码就只会渲染一次啊
    return <div>{userList}</div>;
  };

  // 登陆按钮的回调函数;点击登陆发生的事情
  const handleLogin = () => {
    // /* DEBUG */ message.info("Button pushed!");
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
    // TODO 加了问号……但是不知道?的作用
    if (!userPasswordData?.user[0]) {
      message.error("No this user!");
      return;
    }
    if (username && userpassword && userPasswordData.user[0]) {
      // 查询得到的密码值 === 密码输入框中的密码
      if (userPasswordData.user[0].password === userpassword) {
        message.success("Log in successfully!");
      } else {
        message.error("Wrong password!");
      }
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
      <br />
      <p>User List</p>
      <USER_INFO /> {/* 加载用户信息: 姓名+邮箱 */}
    </div>
  );
};

export default App;
