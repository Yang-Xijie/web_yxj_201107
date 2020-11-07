import React from "react";
// import React, { useState, useEffect } from "react"; // 这里添加了useState
// import { InputNumber, message, Button, Input } from "antd"; //copied form ant.design

import "antd/dist/antd.css";
/* without that css file, the InputNumber will be so ugly */
/* and that file is so long */

const App: React.FC = () => {
  document.title = `web_yxj_201107`; // 设置浏览器的标签标题

  // return返回页面内容给浏览器
  return (
    <div>
      <h1>Guessing Game</h1>
      <p>show user list here</p>
      <p>MyQ</p>
    </div>
  );
};

export default App;
