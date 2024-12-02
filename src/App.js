import './App.css';
import genLogo from './assets/Nexgen.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import genImgLogo from './assets/NexGenLogo.svg';
import { useEffect, useRef, useState } from 'react';
import { sendMsgToOpenAI } from './openai';

function App() {
    const msgEnd = useRef(null);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Hi, I am NexGen, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!",
            isBot: true,
        }
    ]);

    useEffect(() => {
        document.title = "NexGen"; // Set the title here
        msgEnd.current.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        msgEnd.current.scrollIntoView();
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput('');
        setMessages(prevMessages => [
            ...prevMessages,
            { text, isBot: false }
        ]);
        const res = await sendMsgToOpenAI(text);
        setMessages(prevMessages => [
            ...prevMessages,
            { text: res, isBot: true }
        ]);
    }

    const handleEnter = async (e) => {
        if (e.key === 'Enter') await handleSend();
    }

    const handleQuery = async (e) => {
        const text = e.target.value;
        setMessages(prevMessages => [
            ...prevMessages,
            { text, isBot: false }
        ]);
        const res = await sendMsgToOpenAI(text);
        setMessages(prevMessages => [
            ...prevMessages,
            { text: res, isBot: true }
        ]);
    }
    return (
        <div className="App">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop"><img src={genLogo} alt="Logo" className="logo" /><span className="brand">NexGen</span></div>
                    <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
                    <div className="upperSideBottom">
                        <button className="query" onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="Query" />What is Programming ?</button>
                        <button className="query" onClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="Query" />How to use an API ?</button>
                    </div>
                </div>
                <div className="lowerSide">
                    <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
                    <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
                    <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to Pro</div>
                </div>
            </div>
            <div className="main">
                <div className="chats">
                    {messages.map((message, i) => 
                        <div key={i} className={message.isBot?"chat bot":"chat"}>
                            <img className='chatImg' src={message.isBot?genImgLogo:userIcon} alt="NexGen" /><p className="txt">{ message.text }</p>
                        </div>
                    )}
                    <div ref={msgEnd}/>
                </div>
                <div className="chatFooter">
                    <div className="inp">
                        <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend} ><img src={sendBtn} alt="Send" /></button>
                    </div>
                    <p>NexGen may produce inaccurate information about people, places, or facts. NexGen November 24 Version.</p>
                </div>
            </div>
        </div>
    );
}

export default App;
