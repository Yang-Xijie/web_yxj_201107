import React from "react";
// import React, { useState, useEffect } from "react"; // 这里添加了useState
// import { InputNumber, message, Button, Input } from "antd"; //copied form ant.design
import { useQuery } from "@apollo/client";
import "antd/dist/antd.css";
/* without that css file, the InputNumber will be so ugly */
/* and that file is so long */

import { GetUser as GET_USER } from "./api/user.graphql";
import { GetUser } from "./api/types";

// GET_USER中的内容就是虾米那这段
// const GET_USER = gql`
//   query MyQuery {
//     user {
//       name
//       email
//     }
//   }
// `;

interface USER_INFO_Props {}

const USER_INFO: React.FC<USER_INFO_Props> = () => {
  /* interface HistoryProps {
  history: { value: number; status: string }[];
  }
  const History: React.FC<HistoryProps> = ({ history }) => {
  ...
  }
  */
  const { loading, error, data } = useQuery<GetUser>(GET_USER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const userList = data!.user.map(({ name, email }) => (
    <div>
      <p>
        {name}: {email}
      </p>
    </div>
  ));
  return <div>{userList}</div>;
};

const App: React.FC = () => {
  document.title = `web_yxj_201107`; // 设置浏览器的标签标题

  // return返回页面内容给浏览器(其实是给了index,你会看到在index.tsx中有 <App /> 这一个函数式组件,这个就是本文件)
  return (
    <div>
      <h1>Guessing Game</h1>
      <p>show user list here</p>
      <p>MyQ</p>
      <USER_INFO /> {/* 加载用户信息: 姓名+邮箱 */}
      {/* <Route exact path={`${path}/mentor-applications`}>
            <MentorApplicationPage />
          </Route> 
          在eesast-web里面的组件都是经过Route包装的.而如果不经过包装直接就<USER_INFO />
          我这边会报错:
    'USER_INFO' cannot be used as a JSX component.
    Its return type 'Element | Element[]' is not a valid JSX element.
    Type 'Element[]' is missing the following properties from type 'Element': type, props, key  TS2786

    53 |       <p>show user list here</p>
    54 |       <p>MyQ</p>
  > 55 |       <USER_INFO />
       |        ^
    56 |     </div>
    57 |   );
    58 | };
          参考:https://stackoverflow.com/questions/56002251/react-use-routecomponentprops-type-is-missing-the-following-properties-fr
          因此应该用Route包裹一下给这个组件带上这几个属性.而antd里面的组件能直接用应该是已经直接包裹好了
          在暑培react小游戏那里直接用了一个history组件应该也是已经经过包裹的(我记得用了接口)
          */}
    </div>
  );
};

export default App;
