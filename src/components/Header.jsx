import React, { useState } from "react";

const Header = ({ open, setOpen }) => {
    return (
        <header>
            {/* 主 Logo 部分 */}
            {/* <a href="/">
                <div className="logo">Travel</div> 
            </a> */}

            {/* 三个并列的按钮 */}
            <div className="buttons-container">
                <a 
                    href="https://www.govt.nz/browse/history-culture-and-heritage/nz-history/maori-history/" 
                    target="_blank" // 新标签页打开
                    rel="noopener noreferrer" // 安全性设置
                >
                    <div className="logo">Māori History</div>
                </a>
                <a 
                    href="https://teara.govt.nz/en/te-tiriti-o-waitangi-the-treaty-of-waitangi/print" 
                    target="_blank" // 新标签页打开
                    rel="noopener noreferrer" // 安全性设置
                >
                    <div className="logo">Treaty of Waitangi</div>
                </a>
                
                <a 
                    href="https://teara.govt.nz/en/te-ao-marama-the-natural-world/page-1" 
                    target="_blank" // 新标签页打开
                    rel="noopener noreferrer" // 安全性设置
                >
                    <div className="logo">Māori WorldView</div>
                </a>
            </div>

            {/* 菜单按钮 */}
            <div 
                className={open ? "menu-logo active" : "menu-logo"} 
                onClick={() => setOpen(!open)}
            >
            </div>
        </header>
    );
};

export default Header;
